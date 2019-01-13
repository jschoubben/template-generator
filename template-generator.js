var fs = require('fs').promises;

async function generateTemplate(template, tokenData) {
    const templateContent = await getTemplate(template);
    const templateParts = getTokens(templateContent);
    return replaceTokens(templateParts, tokenData);
}

async function getTemplate(template) {
    return await fs.readFile(template, 'utf8');
}

function replaceTokens(templateParts, tokenObject) {
    let result = '';
    templateParts.forEach(part => {
        if(typeof part === 'string'){
            result += part;
        } else if(tokenObject.hasOwnProperty(part.tag)){
            if(Array.isArray(tokenObject[part.tag])){
                for(const childTokenObject of tokenObject[part.tag]) {
                    result += part.template ? replaceTokens(part.template, childTokenObject) : childTokenObject[part.tag];
                }
            } else if(typeof tokenObject[part.tag] === 'string') {
                result += part.template ? replaceTokens(part.template, {CONTENT: tokenObject[part.tag]}) : tokenObject[part.tag];
            }
        }
    })
    return result;
}

function getTokens(template) {
    let tags = getAllMatchedRegexGroups(/\{\{(.*?)\}\}/g, template);
    if (tags.length) {
        const templateParts = [];
        let workTemplate = (' ' + template).slice(1);
        while (tags.length > 0) {
            const tag = tags[0];
            const openTag = `{{${tag}}}`;
            const closeTag = `{{/${tag}}}`;
            templateParts.push(workTemplate.substring(0, workTemplate.indexOf(openTag)));
            if (workTemplate.indexOf(closeTag) < 0) {
                templateParts.push({
                    tag
                });
                workTemplate = workTemplate.substring(workTemplate.indexOf(openTag) + openTag.length);
                tags.shift();
            } else {
                const start = workTemplate.indexOf(openTag) + openTag.length;
                const end = workTemplate.indexOf(closeTag);
                templateParts.push({
                    tag: tag,
                    template: getTokens(workTemplate.substring(start, end))
                });
                do {
                    tags.shift();
                } while (tags[0] !== `/${tag}`);
                workTemplate = workTemplate.substring(workTemplate.indexOf(closeTag) + closeTag.length);
                tags.shift();
            }
        }
        if(workTemplate !== ''){
            templateParts.push(workTemplate);
        }
        return templateParts;
    } else {
        return [template];
    }
}

function getAllMatchedRegexGroups(regex, text, index) {
    index || (index = 1);
    const matches = [];
    while (match = regex.exec(text)) {
        matches.push(match[index]);
    }
    return matches;
}

module.exports = {
    generateTemplate: generateTemplate
}
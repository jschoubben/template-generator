const templateGenerator = require('./template-generator');

async function generateSQLTemplate(template, dataModel, customValues){
    const result = {};
    for(const schemaName of Object.keys(dataModel)) {
        const schema = dataModel[schemaName];
        result[schemaName] = {};
        for(const tableName of Object.keys(schema)) {
            const tableProperties = {
                schemaName: schemaName,
                name: tableName,
                foreignKeyData: [],
                columnsData: [],
                baseColumnsData: [],
                updateColumnsData: []
            };
            const table = schema[tableName];
            for(const columnName of Object.keys(table)) {
                addColumnData(tableProperties, columnName, getColumnProperties(table[columnName], customValues), true);
            }
            for(const columnName of Object.keys(customValues.defaultColumns)) {
                addColumnData(tableProperties, columnName, getColumnProperties(customValues.defaultColumns[columnName], customValues), false);
            }
            const sqlTableProperties =  mapToTemplateGenerator(tableProperties);
            result[schemaName][tableName] = await templateGenerator.generateTemplate(template, sqlTableProperties);
        }
    }
    return result;
}

function mapToTemplateGenerator(tableProperties){
    return {
        SCHEMA_NAME: tableProperties.schemaName,
        TABLE_NAME: tableProperties.name,
        COLUMNS: tableProperties.columnsData,
        BASE_COLUMNS: tableProperties.baseColumnsData,
        UPDATE_COLUMNS: tableProperties.updateColumnsData,
        FK: tableProperties.foreignKeyData,
        PK_COL: tableProperties.primaryKey
    }
}

function getColumnProperties(columnProperties, customValues) {
    if(columnProperties.customType){
        return {
            ...customValues.customColumnTypes[columnProperties.customType],
            ...columnProperties
        }
    }
    return columnProperties;
}

function addColumnData(tableProperties, columnName, columnProperties, isBaseColumn) {
    
    const column = {
        NAME: columnName,
        TYPE: columnProperties.type + (columnProperties.length ? `(${columnProperties.length})` : ''),
        NULL: columnProperties.nullable ? 'NULL' : 'NOT NULL',
    };
    if(columnProperties.identity){
        column.IDENTITY = columnProperties.identity;
    } 
    if(columnProperties.fk){
        tableProperties.foreignKeyData.push({
            TABLE: tableProperties.name,
            COL: columnName,
            FK_TABLE: columnProperties.referenceTable,
            FK_SCHEMA: columnProperties.referenceSchema,
            FK_COL: columnProperties.referenceColumn ? columnProperties.referenceColumn : 'Id'
        });
    }
    if(columnProperties.pk){
        tableProperties.primaryKey = columnName;
        tableProperties.columnsData.unshift(column);
    } else {
       tableProperties.columnsData.push(column);
    }
    if(isBaseColumn){
        tableProperties.baseColumnsData.push(column);
    }
    if(columnProperties.canUpdate){
        tableProperties.updateColumnsData.push(column);
    }
}

module.exports = {
    generateSQLTemplate: generateSQLTemplate
};
const tg = require('./template-generator');
const sqlGenerator = require('./sql-generator');


const dbSchema = {
    Identity: {
        Address: {
            Street: {
                customType: 'varchar',
                length: 500,
                nullable: false,
                canUpdate: true
            },
            Number: {
                customType: 'varchar',
                length: 10,
                nullable: false,
                canUpdate: true
            },
            Bus: {
                customType: 'varchar',
                length: 10,
                nullable: true,
                canUpdate: true
            },
            PostalCode: {
                customType: 'varchar',
                length: 10,
                nullable: false,
                canUpdate: true
            },
            City: {
                customType: 'varchar',
                length: 500,
                nullable: false,
                canUpdate: true
            },
        },
        Person: {
            FirstName: {
                customType: 'varchar',
                length: 255,
                nullable: false
            },
            LastName: {
                customType: 'varchar',
                length: 255,
                nullable: false
            },
            AddressId: {
                customType: 'foreignKey',
                referenceTable: 'Address',
                canUpdate: true
            }
        }
    },
    Stamdata: {
        FamilyMember: {
            PersonId: {
                customType: 'foreignKey',
                referenceSchema: 'Identity',
                referenceTable: 'Person'
            }
        }
    },
    klantenBeheer: {

    }
}
const customValues = {
    customColumnTypes: {
        primaryKey: {
            type: 'BIGINT',
            pk: true,
            identity: 'IDENTITY(1,1)'
        },
        foreignKey: {
            type: 'BIGINT',
            fk: true,
            nullable: false
        },
        varchar: {
            type: 'NVARCHAR',
            length: 'MAX',
            nullable: true
        }
    },
    defaultColumns: {
        Id: {
            customType: 'primaryKey'
        },
        CreatedOn: {
            type: 'DATETIME',
            nullable: false,
            default: 'GETDATE()'
        },
        CreatedBy: {
            customType: 'varchar',
            length: '50',
            nullable: false,
        },
        ModifiedOn: {
            type: 'DATETIME',
            nullable: true
        },
        ModifiedBy: {
            customType: 'varchar',
            length: '50',
            nullable: true,
        },
    }
}

async function testTemplate() {
    const generatedTemplate = await tg.generateTemplate('./sql-templates/test.template', {
        DATE_NOW: Date.now().toString(),
        TAG1: [{

        }],
        TAG2: [{
            TAG_DATE_NOW: Date.now().toString()
        }],
        TAG3: [{
            TAG3_TITLE: 'Title 3-1',
            TAG_INLINE: [{
                TAG_INLINE_TITLE: 'Inline title 1'
            }]
        }, {
            TAG3_TITLE: 'Title 3-2',
            TAG_INLINE: [{
                TAG_INLINE_TITLE: 'Inline title 2'
            }]
        }],
        TAG_HYBRID: 'COOLE'
    });
    console.log(generatedTemplate);
}

(async () => {
    try {
        console.log(await sqlGenerator.generateSQLTemplate('./sql-templates/create.template', dbSchema, customValues));
        console.log(await sqlGenerator.generateSQLTemplate('./sql-templates/save.template', dbSchema, customValues));
        console.log(await sqlGenerator.generateSQLTemplate('./sql-templates/getAll.template', dbSchema, customValues));
        console.log(await sqlGenerator.generateSQLTemplate('./sql-templates/getById.template', dbSchema, customValues));
    } catch (err) {
        console.error(err.stack);
    }
})();
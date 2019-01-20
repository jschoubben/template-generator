const tg = require('./template-generator')
const sqlGenerator = require('./sql-generator')
const express = require('express')
const app = express()
const port = 3000


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

app.use('/', express.static('../client/public'));

app.get('/api/sql', async (req, res) => {
    await sqlGenerator.generateSQLTemplate(`./sql-templates/${req.query.template}.template`, dbSchema, customValues)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
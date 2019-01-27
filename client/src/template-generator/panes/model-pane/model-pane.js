import { Webcomponent } from '../../../decorators/index'
import css from './model-pane.scss'
import html from './model-pane.html'

@Webcomponent({
    selector: 'tg-model-pane',
    template: html,
    style: css,
})
export default class ModelPane extends HTMLElement {
    constructor() {
        super()
        this.$modelCodeMirror = null
    }

    connectedCallback() {
        this._render()
        this.$modelCodeMirror = this.native.querySelector('tg-code-mirror#model')
        this.$customValuesCodeMirror = this.native.querySelector('tg-code-mirror#customValues')
        this.$codeFormatterModel = this.native.querySelector('button#codeFormatterModel')
        this.$codeFormatterCustomValues = this.native.querySelector('button#codeFormatterCustomValues')
        this.$modelCodeMirror.value = JSON.stringify({
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
                    }
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
            }
        }, null, 2)
        this.$customValuesCodeMirror.value = JSON.stringify({
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
        }, null, 2)

        this.$codeFormatterModel.addEventListener('click', this.formatModel.bind(this))
        this.$codeFormatterCustomValues.addEventListener('click', this.formatCustomValues.bind(this))
    }



    _render() {
    }

    get model(){
        return this.$modelCodeMirror ? this.$modelCodeMirror.value : ''
    }

    get customValues(){
        return this.$customValuesCodeMirror ? this.$customValuesCodeMirror.value : ''
    }

    formatModel() {
        if(this.$modelCodeMirror){
            try {
                this.$modelCodeMirror.value = JSON.stringify(JSON.parse(this.$modelCodeMirror.value), null, 2)
            } catch(err){
                alert('Error formatting the value, please correct any mistakes')
            }
        }
    }

    formatCustomValues() {
        if(this.$customValuesCodeMirror){
            try {
                this.$customValuesCodeMirror.value = JSON.stringify(JSON.parse(this.$customValuesCodeMirror.value), null, 2)
            } catch(err){
                alert('Error formatting the value, please correct any mistakes')
            }
        }
    }
}
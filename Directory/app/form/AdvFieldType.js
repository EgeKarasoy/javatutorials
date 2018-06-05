Ext.define('Directory.form.AdvFieldType',{
    extend: 'Ext.form.ComboBox',

    requires: [
        'Directory.store.FieldTypes'
    ],

    xtype: 'adv-field-type',
    fieldLabel: 'Field Type',
    labelStyle: 'font-weight: 600',
    allowBlank:false, 
    //emptyText: 'Field Type may not be blank.',
    required: true,
    editable: false,
    border: 3,
    displayField: 'name',
    valueField: 'id',
    store: {
        type: 'fieldtypes',
        storeId: 'fieldtypes'
    },
    queryMode: 'local',
    listeners:{
        'select' : 'fieldTypeChange'
    }
});
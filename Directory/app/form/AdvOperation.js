Ext.define('Directory.form.AdvOperation',{
    extend: 'Ext.form.ComboBox',

    requires: [
        'Directory.store.Operations'
    ],

    xtype: 'adv-operation',
    fieldLabel: 'Operations',
    labelStyle: 'font-weight: 600',
    required: true,
    allowBlank:false, 
    //emptyText: 'Operations may not be blank.',
    displayField: 'name',
    editable: false,
    forceSelection: true,
    valueField: 'id',
    store: {
        type: 'operations',
        storeId: 'operations'
    },
    queryMode: 'local',
    listeners:{
        'select' : 'operationChange'
    }
});
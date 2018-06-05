Ext.define('Directory.form.AdvRemoveButton',{
    extend: 'Ext.Button',

    xtype: 'adv-remove-button',
    iconCls : 'x-fa fa-minus',
    //text: 'Remove',
    margin: 3,
    handler : 'onRemove'
});
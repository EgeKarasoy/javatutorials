Ext.define('Directory.form.AdvValue',{
    extend: 'Ext.form.Text',

    xtype: 'adv-value',
    labelWidth: 50,
    fieldLabel: 'Value',
    labelStyle: 'font-weight: 600',
    required: true,
    allowBlank:false, 
    //emptyText: 'Value may not be blank.',
    displayField: 'name',
    listeners:{
        change : 'valueChange',
        specialkey: 'specialAdvKeyHandler',
    }
});
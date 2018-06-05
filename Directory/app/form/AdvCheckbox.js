Ext.define('Directory.form.AdvCheckbox',{
    extend: 'Ext.form.field.Checkbox',

    xtype: 'adv-checkbox',
    fieldLabel: 'Select',
    labelStyle: 'font-weight: 600',

    listeners:{
        change: function() {
            if (this.value == true) {
                console.log("adv-checkbox has been selected..." + this.name);
            } else {
                console.log("adv-checkbox has been de-selected...");
            }
        }
    }
});
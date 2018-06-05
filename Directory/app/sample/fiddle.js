Ext.application({
    name : 'Fiddle',

    launch : function() {

    Ext.define('Fiddle.view.form.MainController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.form-main',

        onAdd: function() {
            var me = this.getView(),
            mainFieldset = me.down('[itemId=main_fieldset]'),
            stateColumn = mainFieldset.down('[itemId=state-column]'),
            fnameColumn = mainFieldset.down('[itemId=fname-column]');
            addBtnColumn= mainFieldset.down('[itemId=add-column]');

            stateColumn.add({
                xtype   : 'state',
                name    : 'state' + stateColumn.items.length
            });

            fnameColumn.add({
                xtype   : 'fname',
                name    : 'fname' + fnameColumn.items.length
            });

            addBtnColumn.add({
                xtype   : 'addBtn'
            })
        }
    });

    // The data store containing the list of states
    var states = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"AL", "name":"Alabama"},
            {"abbr":"AK", "name":"Alaska"},
            {"abbr":"AZ", "name":"Arizona"}
        ]
    });

    // Create the combo box, attached to the states data store
    Ext.define('Fiddle.form.State',{
        extend: 'Ext.form.ComboBox',
        fieldLabel: 'Choose State',
        xtype: 'state',
        store: states,
        queryMode: 'local',
        displayField: 'name',
        valueField: 'abbr',
        renderTo: Ext.getBody()
    });

    Ext.define('Fiddle.form.Fname', {
        extend:'Ext.form.Text',
        fieldLabel: 'First Name',
        xtype: 'fname',
        name: 'fname'
    });

    Ext.define('Fiddle.form.AddMore',{
        extend  : 'Ext.button.Button',
        xtype   : 'addBtn',
        iconCls : 'x-fa fa-plus',
        handler : 'onAdd'
    })

        Ext.create('Ext.form.Panel',{
            renderTo:document.body,
            controller: 'form-main',
            height: 900,
            items:  [{
                xtype       : 'fieldset',
                collapsed   : false,
                collapsible : false,
                labelAlign  : 'right',
                itemId      : 'main_fieldset',
                width       : 948,
                labelWidth  : 100,
                items       : [{
                    layout  : 'table',
                    items   : [{
                        width   : 270,
                        layout  : 'form',
                        itemId  : 'state-column',
                        border  : false,
                        items   : [{
                            xtype: 'state',
                            name: 'state-0'
                        }]
                    }, {
                        width   : 280,
                        layout  : 'form',
                        itemId  : 'fname-column',
                        border  : false,
                        items   : [{
                            xtype   : 'fname',
                            name    : "fname-0"
                        }]
                    }, {
                        width   : 50,
                        layout  : 'form',
                        itemId  : 'add-column',
                        border  : false,
                        items   : [{
                            xtype   : 'addBtn'
                        }]
                    }]
                }]
            }]
        })
    }
});
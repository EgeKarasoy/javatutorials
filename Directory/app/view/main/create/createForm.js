Ext.define('Directory.view.main.create.createForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.create_form',

    requires: [
    	//'Directory.store.SearchResults',
        'Directory.view.main.create.createController',
        'Ext.grid.filters.Filters',
        //'Ext.toolbar.Paging'
        //'Ext.grid.plugin.Exporter'
    ],

    xtype: 'create_form', 
    id: 'create_form',
    itemId: 'create_form',
    frame: true,
    borderStyle: 'background: #476fa7',
    padding: 10,
    waitMsgTarget: true,
    controller: 'createController',

    viewModel: {
        type: 'createviewmodel'
    },

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        msgTarget: 'side'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    
    items: [{
            // Create FieldSet
            xtype: 'fieldset',
            id: 'create_fieldset',
            title: 'Create Employee',
            anchor: '100%',
            //style: 'background-color: #EEE',
            collapsible: false,
            items: [{
                margin: '0 0 20 0',
                xtype: 'component',
                html: [
                    'Please fill in the blanks then click create button.'
                ]},
                {
                    xtype: 'container',
                    padding: '0 0 10 0',
                    width: 1000,

                    defaults: {
                        fieldStyle: 'background-color:#FEFEFE; color:#000',
                        labelStyle: 'font-weight: 600',
                        labelWidth: 90
                    },

                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        id: 'create_id',
                        fieldLabel: 'id',
                        bind: '{id}',
                        width: 150,
                        listeners: {
                            change: function() {
                                console.log('id changed detected...');
                            },
                            specialkey: 'specialStdKeyHandler',
                            afterrender: function(field) {
                                field.focus(false, 200);
                            }
                        }
                        
                    },
                    {
                        xtype: 'splitter',
                        width: 30
                    },
                    {
                        xtype: 'textfield',
                        id: 'create_short_name',
                        fieldLabel: 'short name',
                        bind: '{short_name}',
                        width: 150,
                        listeners: {
                            change: function() {
                                console.log('short_name changed detected...');
                            },
                            specialkey: 'specialStdKeyHandler',
                        }
                    },
                    {
                        xtype: 'textfield',
                        id: 'create_first_name',
                        fieldLabel: 'first name',
                        bind: '{first_name}',
                        width: 250,
                        listeners: {
                            change: function() {
                                console.log('first_name changed detected...');
                            },
                            specialkey: 'specialStdKeyHandler',
                        }
                    },
                    {
                        xtype: 'textfield',
                        id: 'create_last_name',
                        fieldLabel: 'last name',
                        bind: '{last_name}',
                        width: 250,
                        listeners: {
                            change: function() {
                                console.log('last_name changed detected...');
                            },
                            specialkey: 'specialStdKeyHandler',
                        }
                    }
        
                    ]
                },
                {
                    xtype: 'panel',
                        padding: '0 0 10 0',
                        buttonAlign: 'right',
                        defaults: {
                            fieldStyle: 'background-color:#FEFEFE; color:#000',
                            labelStyle: 'font-weight: 600',
                            labelWidth: 90
                        },

                        layout: 'hbox',

                        buttons: 
                        [
                            {
                                xtype: 'button',
                                iconCls: 'fa fa-search',
                                text: 'Create Button',
                                style: {
                                    background: '#E49501',
                                    borderColor: '#CE8600'
                                },
                                bind: {
                                    disabled: '{isActive}'
                                },
                                handler : 'createAssociate'
                            },
                            /*{
                                xtype: 'container',
                                width: '20px'
                            },*/
                            {
                                xtype: 'button',
                                iconCls: 'fa fa-times',
                                text: 'Clear',
                                /*bind: {
                                    disabled: '{!isActive}'
                                },*/
                                handler : 'createClear'
                            }
                        ]
                    }
                ]
        }
    ]
});
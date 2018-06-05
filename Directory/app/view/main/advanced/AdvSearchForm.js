Ext.define('Directory.view.main.advanced.AdvSearchForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.adv_search_form',

    requires: [
        'Directory.store.SearchResults',
        'Directory.form.AdvFieldType',
        'Directory.form.AdvOperation',
        'Directory.form.AdvValue',
        'Directory.form.AdvAddButton',
        'Ext.grid.filters.Filters',
        'Directory.view.main.advanced.AdvSearchController',
        //'Ext.toolbar.Paging'
        //'Ext.grid.plugin.Exporter' 
    ],

    xtype: 'adv_search_form', 
    itemId: 'adv_search_form',
    frame: true,
    borderStyle: 'background: #476fa7',
    padding: 10,
    controller: 'advSearchController',

    viewModel: {
        type: 'advsearchviewmodel'
    },

    fieldDefaults: {
        labelAlign: 'right',
        labelWidth: 115,
        //msgTarget: 'side',
        msgTarget: 'none',
        invalidCls: ''
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    /*store: {
        type: 'advsearch'
    },*/

    /*
     * Listen for validity change on the entire form and update the combined error icon
     */
    listeners: {
        validitychange: 'updateErrorState',
        errorchange: 'updateErrorState'
    },

    items: [{
            // Advanced Search FieldSet
            xtype       : 'fieldset',
            collapsed   : false,
            collapsible : false,
            labelAlign  : 'right',
            itemId      : 'adv_search_fieldset',
            id          : 'adv_search_fieldset',
            title       : 'Advanced Search Details',
            //anchor      : '100%',
            width       : 1000,
            items: [{
                xtype: 'component',
                margin: '0 0 20 0',
                html: [
                    '<h2>Advanced Associate Search</h2>',
                    'Please fill in search criteria on click on Search button.'
                ]},
                {
                    layout  : 'table',
                    columns: 6,
                    items: [/*{
                            itemId: 'adv-field-checkbox-column',
                            layout: 'form',
                            items: [{
                                xtype : 'adv-checkbox',
                                name:  'adv-checkbox-0'
                            }],
                        },*/
                        {
                            itemId: 'adv-field-type-column',
                            layout: 'form',
                            items: [{
                                xtype : 'adv-field-type',
                                id:  'adv-field-type-0',
                                name:  'adv-field-type-0'
                            }]
                        },
                        {
                            itemId: 'adv-operation-column',
                            layout: 'form',
                            items: [{
                                xtype: 'adv-operation',
                                id:  'adv-operation-0',
                                forceSelection: true,
                                name:  'adv-operation-0'
                            }]
                        },
                        {
                            itemId: 'adv-value-column',
                            layout: 'form',
                            items: [{
                                xtype: 'adv-value',
                                id:  'adv-value-0',
                                name:  'adv-value-0'
                            }]
                        },
                        {
                            itemId: 'adv-add-button-column',
                            layout: 'form',
                            //width:  270,
                            //border: false,
                            items: [{
                                xtype: 'adv-add-button',
                                id:  'adv-add-button-0',
                                name:  'adv-add-button-0'
                            }]
                        },
                        {
                            itemId: 'adv-remove-button-column',
                            layout: 'form',
                            //width:  270,
                            //border: false,
                            items: [{
                                xtype: 'adv-remove-button',
                                id:  'adv-remove-button-0',
                                name:  'adv-remove-button-0'
                            }]
                        }
                        ]  // Items Table Layout
                    }]   // End of Table Layout
                },  // End of Advanced Search Details FieldSet
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

                        buttons: [
                            {
                                xtype: 'component',
                                reference: 'formErrorState',
                                height: '100%',
                                invalidCls: Ext.baseCSSPrefix + 'form-invalid-icon-default',
                                validCls: Ext.baseCSSPrefix + 'dd-drop-icon',
                                baseCls: 'form-error-state',
                                flex: 1,
                                validText: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Form is valid',
                                invalidText: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Form has errors',

                                tipTpl: [
                                    '<ul class="' + Ext.baseCSSPrefix + 'list-plain">',
                                        '<tpl for=".">',
                                            '<li><span class="field-name">{name}</span>: ',
                                                '<span class="error">{error}</span>',
                                            '</li>',
                                        '</tpl>',
                                    '</ul>'
                                ],

                                setErrors: function(errors) {
                                    var me = this,
                                        tpl = me.tipTpl,
                                        tip = me.tip;

                                    if (!me.tipTpl.isTemplate) {
                                        tpl = me.tipTpl = new Ext.XTemplate(tpl);
                                    }

                                    if (!tip) {
                                        tip = me.tip = Ext.widget('tooltip', {
                                            target: me.el,
                                            title: 'Error Details:',
                                            minWidth: 200,
                                            autoHide: false,
                                            isDraggable: true,
                                            anchor: 'top',
                                            mouseOffset: [-11, -2],
                                            closable: true,
                                            constrainPosition: false,
                                            cls: 'errors-tip'
                                        });
                                   }

                                    errors = Ext.Array.from(errors);

                                    // Update CSS class and tooltip content
                                    if (errors.length) {
                                        me.addCls(me.invalidCls);
                                        me.removeCls(me.validCls);
                                        me.update(me.invalidText);
                                        tip.setDisabled(false);
                                        tip.update(tpl.apply(errors));
                                        //tip.html = "Hello World...";
                                        //tip.message = "Hello World...";
                                        tpl.apply(errors);
                                        tip.show();
                                    } else {
                                        me.addCls(me.validCls);
                                        me.removeCls(me.invalidCls);
                                        if (App.Constants.isDebug) console.log("this.clearPressed ====> " + this.clearPressed);
                                        if (this.clearPressed) {
                                            me.update('');
                                            this.clearPressed = false;
                                        } else {
                                            me.update(me.validText);
                                        }
                                        tip.setDisabled(true);
                                        tip.hide();
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'fa fa-search',
                                text: 'Search Associate',
                                style: {
                                    background: '#E49501',
                                    borderColor: '#CE8600'
                                },
                                bind: {
                                    disabled: '{!isActive}'
                                },
                                handler : 'advSearchAssociate'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'fa fa-times',
                                text: 'Clear',
                                /*bind: {
                                    disabled: '{!isActive}'
                                }*/
                                handler : 'clearAdvSearch'
                            }
                        ]
                    },
                    {
                    // Results Grid FieldSet
                    xtype: 'fieldset',
                    id: 'adv_search_resultset',
                    title: 'Search Results',
                    anchor: '100%',
                    //autoScroll: true,
                    //style: 'background-color: #EEE',
                    collapsible: false,
                    items: [{
                        xtype: 'container',
                        layout: 'fit',
                        defaults: {
                            width: '100%'
                        },
                        defaultType: 'textfield',
                        padding: 10,
                        items: [{
                            xtype: 'grid',
                            id: 'adv_search_grid',
                            reference: 'standardGrid',
                            flex: 1,
                            columnLines: true,
                            defaultListenerScope: true,
                            headerBorders: true,

                            plugins: 'gridfilters',

                            height: 500,
                            //width: '100%',
                            emptyText: 'No Matching Records',
                            loadMask: true,
                            stateful: true,
                            
                            store: {
                                type: 'searchresults',
                                storeId: 'advsearchresults'
                            },

                            style: {
                                borderBottomWidth: '1px',
                                borderBottomStyle: 'solid'
                            },
                            
                            listeners: {
                                itemdblclick: function(grid, record, item, rowIndex, e, eOpts) {
                                    console.log("Inside itemdblclick..: " 
                                            + rowIndex + ", " + record.data['bbbuid']);

                                    //var rec = grid.getStore().getAt(rowIndex);
                                    var bbbuid = record.data['bbbuid'];
                                    var firstName = record.data['first_name'];
                                    var lastName = record.data['last_name'];
                                    //var bbbuid = rec.get('bbbuid');
                                    //var firstName = rec.get('first_name');
                                    //var lastName = rec.get('last_name');
                                    console.log("You Clicked Grid Row..." + bbbuid 
                                            + ", " + firstName + ", " + lastName);

                                    var win = Ext.first('associatedetails');
                                    
                                    if (!win) {
                                        win = Ext.create('Directory.view.main.dialog.AssociateDetails', {record: record});
                                        win.show();
                                        win.center();
                                    } else {
                                        win.show();
                                        win.center();
                                    }
                                }
                            },

                            // Set a stateId so that this grid's state is persisted.
                            stateId: 'stateful-filter-grid',
                    
                            tbar: [{
                                text: 'Show All Columns',
                                //tooltip: 'Show All Columns',                
                                iconCls: 'x-fa fa-plus-circle',
                                handler: 'onShowAllColumns',
                                listeners: {
                                    afterrender: function(me) {
                                        if (App.Constants.isTooltip) {
                                            Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
                                                //maxWidth: 220,
                                                minWidth: 150,
                                                trackMouse: true,
                                                anchor: 'top',
                                                showDelay: 200 
                                            });

                                            Ext.tip.QuickTipManager.register({
                                                target: me.getId(), 
                                                title : 'Show All Columns',
                                                anchor: 'top',
                                                shadow: true,
                                                text  : 'Enable all columns available for Search Results...', 
                                                trackMouse: true
                                            });
                                        }
                                    }
                                }
                            }, '-', {
                                text: 'Show Default Columns',
                                iconCls: 'x-fa fa-anchor',
                                handler: 'onShowDefaultColumns',
                                listeners: {
                                    afterrender: function(me) {
                                        if (App.Constants.isTooltip) {
                                            Ext.tip.QuickTipManager.register({
                                                target: me.getId(),
                                                title : 'Show Default Columns',
                                                anchor: 'top',
                                                shadow: true,
                                                text  : 'Enable only the default columns for Search Results...',
                                                trackMouse: true
                                            });
                                        }
                                    }
                                }
                            }, '-', {
                                text: 'Clear All Filters',
                                iconCls: 'x-fa fa-filter',
                                handler: 'onClearFilters',
                                listeners: {
                                    afterrender: function(me) {
                                        if (App.Constants.isTooltip) {
                                            Ext.tip.QuickTipManager.register({
                                                target: me.getId(),
                                                title : 'Clear All Filters',
                                                anchor: 'top',
                                                shadow: true,
                                                text  : 'Clear all filters that have been set...',
                                                trackMouse: true
                                            });
                                        }
                                    }
                                }
                            }],

                            columns: {
                                defaults: {
                                    sortable : true,
                                    align: 'left',
                                    flex: 1,
                                    renderer : 'showRecordToolTip'
                                },  
                                
                                items: [ 
                                {
                                    header: 'ID',
                                    dataIndex: 'id',
                                    align: 'center',
                                    width: 130,
                                    filter: {
                                        type: 'string',
                                        itemDefaults: {
                                            emptyText: 'Search for...'
                                        }
                                    },
                                },
                                {
                                    header: 'Short Name',
                                    dataIndex: 'short_name',
                                    filter: 'list'
                                },
                                {
                                    header: 'First Name',
                                    dataIndex: 'first_name',
                                    filter: {
                                        type: 'string',
                                        itemDefaults: {
                                            emptyText: 'Search for...'
                                        }
                                    }
                                },
                                {
                                    header: 'Last Name',
                                    dataIndex: 'last_name',
                                    filter: {
                                        type: 'string',
                                        itemDefaults: {
                                            emptyText: 'Search for...'
                                        }
                                    }
                                },
                                {
                                    header: 'Company',
                                    dataIndex: 'company_name',
                                    filter: 'list'
                                },
                                {
                                    header: 'Cost Center',
                                    dataIndex: 'cost_center',
                                    filter: 'number',
                                    width: 100
                                },
                                {
                                    header: 'Preferred Name',
                                    dataIndex: 'preferred_name',
                                    filter: {
                                        type: 'string',
                                        itemDefaults: {
                                            emptyText: 'Search for...'
                                        }
                                    }
                                },
                                {
                                    header: 'Phone #',
                                    dataIndex: 'phone',
                                    filter: {
                                        type: 'string',
                                        itemDefaults: {
                                            emptyText: 'Search for...'
                                        }
                                    }
                                },
                                {
                                    header: 'Extension',
                                    dataIndex: 'extension',
                                    sortable : true,
                                    align: 'left',
                                    filter: 'list',
                                    width: 100        
                                },
                                {
                                    header: 'Title Description',
                                    dataIndex: 'title_desc',
                                    filter: 'list'
                                },
                                // --- Hidden Items ---
                                {
                                    header: 'Alt Title',
                                    dataIndex: 'alt_title',
                                    hidden: true,
                                    filter: 'list',
                                    width: 100         
                                },
                                {
                                    header: 'Building',
                                    dataIndex: 'building',
                                    sortable : true,
                                    align: 'left',
                                    hidden: true,
                                    filter: 'list',
                                    flex: 1         
                                },
                                {
                                    header: 'Floor',
                                    dataIndex: 'floor',
                                    sortable : true,
                                    align: 'left',
                                    hidden: true,
                                    filter: 'list',
                                    flex: 1         
                                },
                                {
                                    header: 'Section',
                                    dataIndex: 'section',
                                    sortable : true,
                                    align: 'left',
                                    hidden: true,
                                    filter: 'list',
                                    flex: 1         
                                },
                                {
                                    header: 'Section Number',
                                    dataIndex: 'section_num',
                                    sortable : true,
                                    align: 'left',
                                    hidden: true,
                                    filter: 'list',
                                    flex: 1         
                                },
                                {
                                    header: 'Manager ID',
                                    dataIndex: 'manager_id',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Manager Name',
                                    dataIndex: 'manager_name',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Date of Hire',
                                    dataIndex: 'hire_date',
                                    hidden: true,
                                    filter: 'date'
                                },
                                {
                                    header: 'Department',
                                    dataIndex: 'department',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Region',
                                    dataIndex: 'region',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'District',
                                    dataIndex: 'district',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Job Desc',
                                    dataIndex: 'job_desc',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Employee Type',
                                    dataIndex: 'employee_type',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Employee Status',
                                    dataIndex: 'employee_status',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Active Status',
                                    dataIndex: 'is_active',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Company Code',
                                    dataIndex: 'company_code',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Location Type',
                                    dataIndex: 'location_type',
                                    hidden: true,
                                    filter: 'list'
                                },
                                {
                                    header: 'Country',
                                    dataIndex: 'country',
                                    hidden: true,
                                    filter: 'list'
                                }]
                            },

                            onClearFilters: function () {
                                this.filters.clearFilters();
                            },

                            onShowAllColumns: function () {
                                for (var i=0; i<28; i++) {
                                    this.columns[i].setVisible(true);
                                }
                            },

                            onShowDefaultColumns: function () {
                                var col = 10, max = 28;
                                for (var i = 0; i < col; i++) {
                                    this.columns[i].setVisible(true);
                                }
                                for (var i = col; i < max; i++) {
                                    this.columns[i].setVisible(false);
                                }
                            }, 

                            showRecordToolTip: function (value, metaData, record) {
                                var start_date = Ext.Date.format(record.get('start_date'), 'm/d/Y g:ia');

                                var id = record.data['id'];
                                var fullName = record.data['full_name'];
                                var company = record.data['company_name'];
                                var phone = record.data['phone'];
                                var extension = record.data['extension'];
                                var alt_title = record.data['alt_title'];
                                var title_desc = record.data['title_desc'];
                                var email = record.data['email'];
                                
                                if (company != '') company += "<br>";
                                if (email != '') email += "<br>";
                                if (title_desc != '') title_desc += "<br>";
                                if (extension != '') phone += " (" + extension + ") <br>"; 
                                    else phone += "<br>";

                                var recDetail = "<strong style='color: #f7ee3b; text-transform: capitalize;'>" 
                                    + fullName + " ("
                                    + id + ")</strong><br>" 
                                    + company
                                    + phone
                                    + email
                                    + title_desc;
                                metaData.tdAttr = 'data-qmaxWidth="600" data-qanchor="top" data-qtrackMouse="true" data-qtip="' + recDetail + '"';
                                return value;
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
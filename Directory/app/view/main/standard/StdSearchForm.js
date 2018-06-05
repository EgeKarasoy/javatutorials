Ext.define('Directory.view.main.standard.StdSearchForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.std_search_form',

    requires: [
        'Directory.store.SearchResults',
        'Directory.view.main.standard.StdSearchController',
        'Ext.grid.filters.Filters',
        //'Ext.toolbar.Paging'
        //'Ext.grid.plugin.Exporter'
    ],

    xtype: 'std_search_form', 
    id: 'std_search_form',
    itemId: 'std_search_form',
    frame: true,
    borderStyle: 'background: #476fa7',
    padding: 10,
    waitMsgTarget: true,
    controller: 'stdSearchController',

    viewModel: {
        type: 'stdsearchviewmodel'
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
            // Standard Search FieldSet
            xtype: 'fieldset',
            id: 'std_search_fieldset',
            title: 'Standard Search Details',
            anchor: '100%',
            //style: 'background-color: #EEE',
            collapsible: false,
            items: [{
                margin: '0 0 20 0',
                xtype: 'component',
                html: [
                    '<h2>Standard Associate Search</h2>',
                    'Please fill in search criteria on click on Search button.'
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
                        id: 'first_name',
                        fieldLabel: 'First Name',
                        bind: '{firstName}',
                        width: 350,
                        listeners: {
                            change: function() {
                                console.log('first_name changed detected...');
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
                        id: 'last_name',
                        fieldLabel: 'Last Name',
                        bind: '{lastName}',
                        width: 450,
                        listeners: {
                            change: function() {
                                console.log('last_name changed detected...');
                            },
                            specialkey: 'specialStdKeyHandler',
                        }
                    }]
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
                                text: 'Search Associate',
                                style: {
                                    background: '#E49501',
                                    borderColor: '#CE8600'
                                },
                                bind: {
                                    disabled: '{!isActive}'
                                },
                                handler : 'stdSearchAssociate'
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
                                handler : 'stdClearSearch'
                            }
                        ]
                    }
                ]
            },
            {
            // Results Grid FieldSet
            xtype: 'fieldset',
            id: 'std_search_resultset',
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
                    id: 'std_search_grid',
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
                    stateId: 'stateGrid',

                    store: {
                        type: 'searchresults',
                        storeId: 'stdsearchresults'
                    },

                    style: {
                        borderBottomWidth: '1px',
                        borderBottomStyle: 'dotted',
                        //borderWidth: '1px',
                        //borderStyle: 'solid'
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
                        
                        /*
                        {
                            "id": "00001",
                            "short_name": "avaldes",
                            "first_name": "Amaury",
                            "last_name": "Valdes",
                            "job_desc": "IT Development",
                            "employee_type": "permanent",
                            "employee_status": "active",
                            "location_type": "domestic",
                            "title_desc": "Senior Developer",
                            "alt_title": "developer",
                            "cost_center": "1025",
                            "working_shift": 1,
                            "preferred_name": "Amaury",
                            "middle": "",
                            "full_name": "Amaury Valdes",
                            "country": "USA",
                            "company_name": "Lark Productions",
                            "company_code": 121,
                            "department": "Product Development",
                            "region": "NorthEast",
                            "district": "NJEast",
                            "building": "800B",
                            "floor": "2",
                            "section": "C",
                            "section_num": "302",
                            "phone": "800-555-1212",
                            "extension": "x4555",
                            "manager_id": "pmcneal",
                            "manager_name": "Paul McNeal",
                            "email": "amaury@lark.com",
                            "hire_date": "2012-05-18T00:00:00.0000-0400",
                            "is_active": false
                        }
                        */

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

                        /*bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            displayMsg: 'Displaying topics {0} - {1} of {2}',
                            emptyMsg: "No topics to display",

                            items: ['-', {
                                bind: '{expanded ? "Hide Preview" : "Show Preview"}',
                                pressed: '{expanded}',
                                enableToggle: true,
                                toggleHandler: 'onToggleExpanded'
                            }]
                        },*/

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
                    }]
                }
            ]
        }
    ]
});
Ext.define('Directory.view.main.Directory', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Directory.view.main.DirectoryController',
        'Ext.panel.Panel'
    ],

    controller: 'DirectoryController',
    layout: 'border',
    collapsible: false,

    items: [{
        xtype: 'panel',
        region: 'north',
        padding: 0,
        margin: 0,
        height: 60,
        title: '<img src="resources/images/lark-icon.png" style="width:357px;height:42px;"/>',
        titleAlign: 'middle',  

        tools: [
        {
    	    type: 'gear',
    	    getMenu: function() {
    	    	if (!this.menu) {
    	    		this.menu = Ext.create('Ext.menu.Menu', {
    	    			width: 230,
    	    			items: [
                        {   
                            text: 'Toggle Debugging',
                            iconCls: 'x-fa fa-wrench',
                            handler: function () {
                                App.Constants.isDebug = !App.Constants.isDebug;

                                if (App.Constants.isDebug) 
                                    position = "On"
                                else 
                                    position ="Off";
                                var msg = "Debugging has been turned " + position; 

                                Ext.toast({
                                    title: 'Toggle Debugging',
                                    html: msg,
                                    shadow: true,
                                    closable: true,
                                    iconCls: 'x-fa fa-wrench',
                                    align: 't',
                                    slideInDuration: 400,
                                    minWidth: 400
                                });
                            }
                        },
                        { xtype: 'menuseparator' },
                        {
    	    		    	text: 'About',
                            iconCls: 'x-fa fa-paw',
    	    		    	handler: function () {
                                if (!this.menu) {
                                    this.aboutBox = Ext.create('Directory.view.AboutWindow');
                                    var msg = this.aboutBox.down("#message");
                                    
                                    Ext.Ajax.request({
                                        url: 'MANIFEST.MF',
                                        success: function(response, opts) {
                                            msg.setValue(response.responseText);
                                        },
                                        failure: function(response, opts) {
                                            msg.setValue('server-side failure with status code ' + response.status);
                                        }
                                    });   
                                    
                                    this.aboutBox.show();
                                    this.aboutBox.center();
                                    
                                } else {
                                    this.aboutBox.show();
                                    this.aboutBox.center();
                                }
    	    		    	}
    	    			}]
    	    		})
    	    	}
    	    	return this.menu;
    	    },
    	    handler: function(e, el, owner, tool){			
    			this.getMenu(owner).showBy(owner,'tr-br?');			
    		}	
        }],

        header: {
            items: [{
                    reference: 'clock',
                    xtype: 'tbtext',
                    style: {
                        color: '#ffbf00;',
                        'font-size': '13px;',
                        font: 'Open Sans;',
                        'font-weight': '600;'
                    },
                    text: Ext.Date.format(new Date(), 'M d, Y g:i:s A (T)').toUpperCase()
                },
                { xtype: 'tbspacer', width: 20 },
                {
                    reference: 'salutation',
                    xtype: 'tbtext',
                    style: {
                        'color': '#f0f0f0',
                        'font-size': '13px',
                        'font': 'Open Sans',
                        'font-weight': 600
                    },
                    text: 'Good XXXXXX!'
                },
                { 
                    xtype: 'tbspacer', 
                    width: 20 
                }
            ]
        },
        listeners: {
            render: 'onHeaderRender',
            delay: 10
        }
    },

    {
        xtype: 'container',
        region: 'north',
        style: 'background:#728CB0',
        height: 1
    },    
    {
        xtype: 'tabpanel',
        region: 'center',
        style: {
        	'background': '#E8E8E8;',
        	'padding-left': '6px'
        },

        /*xtype: 'tabpanel',
        title: 'Tab Panel',
        flex: 1,
        height: 500,
        icon: null,
        glyph: 77,
        tabBarHeaderPosition: 2,
        //reference: 'tabpanel',
        plain: false,
        defaults: {
            bodyPadding: 10,
            scrollable: true,
            border: false
        },*/

        //id: 'contentPanel',
        layout: 'card',
        plain: true,
        defaults: {
            bodyPadding: 10,
            scrollable: true,
            border: false
        },
        itemId: 'MainTabPanel',
        frame: false,
        
        items: [ 
            {  title: ' Standard Search',
                //itemId: 'std_search_tab', 
                iconCls: 'x-fa fa-search',
                //html: 'Page 1'
                xtype: 'std_search_form'
            },
            {
                title: ' Advanced Search',
                //itemId: 'adv_search_tab', 
                iconCls: 'x-fa fa-search-plus',
                //html: 'Page 2'
                xtype: 'adv_search_form'
            },
            {
                title: ' Create',
                //itemId: 'adv_search_tab', 
                iconCls: 'x-fa fa-search-plus',
                //html: 'Page 2'
                xtype: 'create_form'
            }
        ]
    }]
});

Ext.define('Directory.view.AboutWindow', {
	extend : 'Ext.window.Window',	
	alias: 'widget.aboutWindow',
	width  : 400,
	height : 280,
	bodyPadding: 5,
	title: 'About Directory',
	iconCls: 'x-fa fa-paw',
	closeable: false,
	resizable: false,
	closeAction: 'hide',
	plain: true,	
	modal: true,
	layout: 'fit',
	buttonAlign: 'center',

	items: [{
        xtype: 'displayfield',
        html: 'message',
        itemId: 'message',
			style: {
					color: '#f0f0f0;',
					'font-size': '13px;',
					font: 'Open Sans;',
					'font-weight': 'bold;'
        }, 
        padding: 15,
        value: '',
    	renderer: function(value){
    		return value.replace(/\n/g, '<br>');
    	}
    },
	{
		// Ext.versions.core.version
		// Ext.getVersion().version
		
		xtype: 'displayfield',
		fieldStyle: 'font-weight:600; font-size:13px; color:#777; padding: 0px 0px 0px 15px',
		value: 'ExtJS Version: <span style="color: red">' + Ext.getVersion().version +'</span>'
	}],
	buttons: [{
		text: 'OK',
		handler: function(btn) {
			btn.up("aboutWindow").close()
		},
		scope: this
	}]
});
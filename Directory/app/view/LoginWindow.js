Ext.define('Directory.view.LoginWindow', {
	extend : 'Ext.window.Window',	
	alias: 'widget.LoginWindow',
	width  : 450,
	height : 250,	
	bodyPadding: 5,
	title: 'Login - Agreement Management System',
	iconCls: 'x-fa fa-lock',
	closeable: false,
	resizable: false,
	closeAction: 'hide',
	plain: true,	
	modal: true,
	layout: 'fit',
	buttonAlign: 'center',
	items: [{
      xtype: 'displayfield',
      name: 'message',
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
  }],
	buttons: [{
		text: 'LogIn',
		handler: function(btn) {
			
		},
		scope: this
	},
  {
		text: 'Cancel',
		handler: function(btn) {
			btn.up("LogoutWindow").close()
		},
		scope: this
	}]
});
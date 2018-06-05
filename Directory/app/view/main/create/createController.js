Ext.define('Directory.view.main.create.createController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.createController',

    init: function () {
        if (App.Constants.isDebug) console.log("Inside init() of createController...");
        this.clearPressed = false;
    },

    toTitleCase: function(str) {
	    return str.toString().replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},

    createClear: function() {
        view = this.getView();
        form = view.getForm();
        
        var myStore = Ext.data.StoreManager.lookup('createresults');

        if (App.Constants.isDebug) console.log("createClear... ");
        this.getView().getForm().reset();
        this.clearPressed = true;

        myStore.removeAll();
        myStore.sync();

        form.findField('create_first_name').focus(false, 200);
    },

    specialStdKeyHandler: function(textfield, event, opt) {
        view = this.getView();
        form = view.getForm();

        if (App.Constants.isDebug) console.log("Inside specialStdKeyHandler... ");
        if (event.getKey() == event.ENTER) {
        	var idc = form.findField('create_id').getValue();
        	var sn = form.findField('create_short_name').getValue();
            var fn = form.findField('create_first_name').getValue();
            var ln = form.findField('create_last_name').getValue();
            if (idc != null && idc.length > 0) {
                this.createAssociate();
            } else if (sn != null && sn.length > 0) {
                this.createAssociate();
            } else if (fn != null && fn.length > 0) {
                this.createAssociate();
            } else if (ln != null && ln.length > 0) {
                this.createAssociate();
            } else {
                if (App.Constants.isDebug) console.log("Ignoring ENTER keypress... ");
            }
        }
    },
    
    createAssociate: function() {
        if (App.Constants.isDebug) console.log("createAssociate... ");
        view = this.getView();
        form = view.getForm();
        
        
        var id =  encodeURIComponent(form.findField('create_id').getValue());
        var shortName =  encodeURIComponent(form.findField('create_short_name').getValue());
        var firstName =  encodeURIComponent(form.findField('create_first_name').getValue());
        var lastName =  encodeURIComponent(form.findField('create_last_name').getValue());
        
        console.log(lastName);

        var params ='?id=' + id + '?shortName=' + shortName + '?firstName=' + firstName + '&lastName=' + lastName + '&etc=' + new Date().getTime();
        var create_url =  App.Constants.STANDARD_URL + params;
        // if (App.Constants.isDebug) console.log("create_url....: " + create_url);

        Ext.getBody().mask("Please wait while I perform your create...");

        Ext.Ajax.request({
            url: 'http://localhost:8080/directoryservices/v1/employees',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            jsonData: {
            	id : id,
            	short_name : shortName,
            	first_name : firstName,
            	last_name : lastName
            },
            success: function(response, options) {
                if (App.Constants.isDebug) console.log("**** SUCCESSFUL CALL 'create' **** ");
		        if (App.Constants.isDebug) console.log(response.responseText);
                Ext.getBody().unmask();
                //box.hide();

                var resp = response.responseText;
                if (resp.length > 0) {
                    var result = Ext.JSON.decode(response.responseText);
                    //console.log(result); 
    
                    if (result.status_code == '404') {
                        if (App.Constants.isDebug) console.log("STATUS_CODE: ===> " + response.responseText);
                        Ext.Msg.alert('ERROR: UNABLE TO FIND ASSOCIATE', result.message, Ext.emptyFn);
                    } else {
                        //var grid = view.lookupReference('standardGrid');
                        //var myStore = grid.getStore();
                        var myStore = Ext.data.StoreManager.lookup('createresults');
                        if (App.Constants.isDebug) console.log("myStore...: " + myStore);
                        //myStore.loadData(response.responseText, false);
                        //myStore.getProxy().setUrl(create_url);
                        //myStore.load();
                        var data = Ext.decode(response.responseText);

                        //myStore.setData(data);
                        //myStore.totalCount = data.length;
                        myStore.loadData(data, false);
                    }
                } else {
                    if (App.Constants.isDebug) console.log("STATUS_CODE: ===> NO RECORDS MATCH");
                    var message = "No records matching <strong style='color: red'>'" + decodeURIComponent(firstName) + " " + decodeURIComponent(lastName) + "'</strong>";
                    Ext.Msg.alert('ERROR: UNABLE TO FIND ASSOCIATE(S)', message, Ext.emptyFn);
                }
            },
            
            failure: function(response, options) {
                Ext.getBody().unmask();
                Ext.Msg.alert('GENERAL FAILURE', "Unable to Connect to Service!!!", Ext.emptyFn);
            }
        });
    }
});
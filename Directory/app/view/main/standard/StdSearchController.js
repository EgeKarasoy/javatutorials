Ext.define('Directory.view.main.standard.StdSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stdSearchController',

    init: function () {
        if (App.Constants.isDebug) console.log("Inside init() of StdSearchController...");
        this.clearPressed = false;
    },

    toTitleCase: function(str) {
	    return str.toString().replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},

    stdClearSearch: function() {
        view = this.getView();
        form = view.getForm();
        
        var myStore = Ext.data.StoreManager.lookup('stdsearchresults');

        if (App.Constants.isDebug) console.log("stdClearSearch... ");
        this.getView().getForm().reset();
        this.clearPressed = true;

        myStore.removeAll();
        myStore.sync();

        form.findField('first_name').focus(false, 200);
    },

    specialStdKeyHandler: function(textfield, event, opt) {
        view = this.getView();
        form = view.getForm();

        if (App.Constants.isDebug) console.log("Inside specialStdKeyHandler... ");
        if (event.getKey() == event.ENTER) {
            var fn = form.findField('first_name').getValue();
            var ln = form.findField('last_name').getValue();
            if (fn != null && fn.length > 0) {
                this.stdSearchAssociate();
            } else if (ln != null && ln.length > 0) {
                this.stdSearchAssociate();
            } else {
                if (App.Constants.isDebug) console.log("Ignoring ENTER keypress... ");
            }
        }
    },
    
    stdSearchAssociate: function() {
        if (App.Constants.isDebug) console.log("stdSearchAssociate... ");

        view = this.getView();
        form = view.getForm();

        var firstName =  encodeURIComponent(form.findField('first_name').getValue());
        var lastName =  encodeURIComponent(form.findField('last_name').getValue());

        var params ='?firstName=' + firstName + '&lastName=' + lastName + '&etc=' + new Date().getTime();
        var std_search_url =  App.Constants.STANDARD_URL + params;
        if (App.Constants.isDebug) console.log("std_search_url....: " + std_search_url);

        Ext.getBody().mask("Please wait while I perform your search...");

        Ext.Ajax.request({
            url: std_search_url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            
            success: function(response, options) {
                if (App.Constants.isDebug) console.log("**** SUCCESSFUL CALL 'standardSearch' **** ");
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
                        var myStore = Ext.data.StoreManager.lookup('stdsearchresults');
                        if (App.Constants.isDebug) console.log("myStore...: " + myStore);
                        //myStore.loadData(response.responseText, false);
                        //myStore.getProxy().setUrl(std_search_url);
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
Ext.define('Directory.view.main.advanced.AdvSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.advSearchController',

    init: function () {
        if (App.Constants.isDebug) console.log("Inside init() of AdvSearchForm...");
        this.counter = 0;
        this.clearPressed = false;
    },

    getCounter: function() {
        if (App.Constants.isDebug) console.log("Inside getCounter()...");
        this.counter++;
        return this.counter;
    },
    
    onAdd: function(e) {
        var me = this.getView(),
        mainFieldset = me.down('[itemId=adv_search_fieldset]'),
        fieldTypeColumn = mainFieldset.down('[itemId=adv-field-type-column]'),
        operationColumn = mainFieldset.down('[itemId=adv-operation-column]'),
        valueColumn = mainFieldset.down('[itemId=adv-value-column]');
        addBtnColumn= mainFieldset.down('[itemId=adv-add-button-column]');
        removeBtnColumn= mainFieldset.down('[itemId=adv-remove-button-column]');

        if (App.Constants.isDebug) console.log("Component name: " + e.name);
        var parts = e.name.split("-");
        if (App.Constants.isDebug) console.log("Parts[3]: " + parts[3]);

        form = me.getForm();
        fields = fieldTypeColumn.items;

        var i = 0;
        var index = 0;
        fields.each(function(field) {
            //console.log("fields:  " + field.name);
            if (field.name === 'adv-field-type-' + parts[3]) {
                if (App.Constants.isDebug) console.log("FOUND IT!!! " + field.name + ", LINE #: " + i);
                index = i+1;
            }
            i++;
        })

        if (App.Constants.isDebug) 
            console.log("fieldTypeColumn.items.length==> " + fieldTypeColumn.items.length);

        /*checkboxColumn.add({
            xtype   : 'adv-checkbox',
            name    : 'adv-checkbox-' + checkboxColumn.items.length
        });*/

        var indexCount = this.getCounter();

        fieldTypeColumn.insert(index, {
            xtype   : 'adv-field-type',
            id      : 'adv-field-type-' + indexCount,
            name    : 'adv-field-type-' + indexCount
        });

        operationColumn.insert(index, {
            xtype   : 'adv-operation',
            id      : 'adv-operation-' + indexCount,
            name    : 'adv-operation-' + indexCount
        });

        valueColumn.insert(index, {
            xtype   : 'adv-value',
            id      : 'adv-value-' + indexCount,
            name    : 'adv-value-' + indexCount
        });

        addBtnColumn.insert(index, {
            xtype: 'adv-add-button',
            id:    'adv-add-button-' + indexCount,
            name:  'adv-add-button-' + indexCount
        });

        removeBtnColumn.insert(index, {
            xtype: 'adv-remove-button',
            id:    'adv-remove-button-' + indexCount,
            name:  'adv-remove-button-' + indexCount
        });
    },

    onRemove: function(e) {
        var me = this.getView();
        mainFieldset = me.down('[itemId=adv_search_fieldset]');
        fieldTypeColumn = mainFieldset.down('[itemId=adv-field-type-column]');
        operationColumn = mainFieldset.down('[itemId=adv-operation-column]');
        valueColumn = mainFieldset.down('[itemId=adv-value-column]');
        addBtnColumn= mainFieldset.down('[itemId=adv-add-button-column]');
        removeBtnColumn= mainFieldset.down('[itemId=adv-remove-button-column]');

        form = me.getForm();
        fields = fieldTypeColumn.items;

        if (App.Constants.isDebug) console.log("Component name: " + e.name);
        var parts = e.name.split("-");
        if (App.Constants.isDebug) console.log("Parts[3]: " + parts[3]);

        if (fieldTypeColumn.items.length > 1) {
            fieldTypeColumn.remove('adv-field-type-' + parts[3]);
            operationColumn.remove('adv-operation-' + parts[3]);
            valueColumn.remove('adv-value-' + parts[3]);
            addBtnColumn.remove('adv-add-button-' + parts[3]);
            removeBtnColumn.remove('adv-remove-button-' + parts[3]);
        } else {
            if (App.Constants.isDebug) console.log("Unable to remove last entry...");
        }
    },

    removeAllFields: function() {
        if (App.Constants.isDebug) console.log("removeAllFields... ");
        view = this.getView();
        form = view.getForm();
        mainFieldset = view.down('[itemId=adv_search_fieldset]');
        fieldTypeColumn = mainFieldset.down('[itemId=adv-field-type-column]');
        operationColumn = mainFieldset.down('[itemId=adv-operation-column]');
        valueColumn = mainFieldset.down('[itemId=adv-value-column]');
        addBtnColumn= mainFieldset.down('[itemId=adv-add-button-column]');
        removeBtnColumn= mainFieldset.down('[itemId=adv-remove-button-column]');

        //fieldSet.removeAll();
        var isFirst = true;
        var len = fieldTypeColumn.items.length;
        fields = fieldTypeColumn.items;

        fields.each(function(field) {
            var parts = field.name.split("-");
            if (App.Constants.isDebug) {
                console.log("fields:  " + field.name);
                console.log("Parts[3]: " + parts[3]);
            }
            if (!isFirst) {
                fieldTypeColumn.remove('adv-field-type-' + parts[3]);
                operationColumn.remove('adv-operation-' + parts[3]);
                valueColumn.remove('adv-value-' + parts[3]);
                addBtnColumn.remove('adv-add-button-' + parts[3]);
                removeBtnColumn.remove('adv-remove-button-' + parts[3]);
            } else {
                isFirst = false;
            }
        });
    },

    specialAdvKeyHandler: function(textfield, event, opt) {
        view = this.getView();
        form = view.getForm();

        if (App.Constants.isDebug) console.log("Inside specialAdvKeyHandler... ");
        if (event.getKey() == event.ENTER) {
            var isActive = view.getViewModel().get('isActive');
            if (isActive) {
                this.advSearchAssociate();
            } else {
                if (App.Constants.isDebug) console.log("Ignoring ENTER keypress... ");
            }
        }
    },

    advSearchAssociate: function() {
        var me = this.getView();
        mainFieldset = me.down('[itemId=adv_search_fieldset]');
        fieldTypeColumn = mainFieldset.down('[itemId=adv-field-type-column]');
        operationColumn = mainFieldset.down('[itemId=adv-operation-column]');
        valueColumn = mainFieldset.down('[itemId=adv-value-column]');

        form = me.getForm();
        fields = fieldTypeColumn.items;


        var allRows = [];
        var len = fieldTypeColumn.items.length;
        fields = fieldTypeColumn.items;

        fields.each(function(field) {
            var parts = field.name.split("-");
            var fieldType = Ext.getCmp('adv-field-type-' + parts[3]);
            var operation = Ext.getCmp('adv-operation-' + parts[3]);
            var value = Ext.getCmp('adv-value-' + parts[3]);

            if (App.Constants.isDebug) {
                console.log("ROW # " + parts[3]);
                console.log("   fieldType..: " + fieldType.getValue());
                console.log("   operation..: " + operation.getValue());
                console.log("   value......: " + value.getValue());
            }

            var typesStore = Ext.data.StoreManager.lookup('fieldtypes');
            var f = typesStore.findRecord('id', fieldType.getValue());
            var fId = f.get('id');
            var fType = f.get('type');
            var fName = f.get('name');

            var operationsStore = Ext.data.StoreManager.lookup('operations');
            var o = operationsStore.findRecord('id', operation.getValue());
            var oId = o.get('id');
            var oType = o.get('type');
            var oName = o.get('name');

            var fieldValue =  encodeURIComponent(value.getValue());

            var row = {"field" : {"id":fId, "type":fType, "name":fName}, "operator" : {"id":oId, "type":oType, "name":oName}, "value" : fieldValue}
            allRows.push(row);            
        })

        var jsonData = JSON.stringify(allRows);
        if (App.Constants.isDebug) 
            console.log("JSON....: " + jsonData);

        var adv_search_url = App.Constants.ADVANCED_URL;
        if (App.Constants.isDebug) console.log("adv_search_url....: " + adv_search_url);

        Ext.getBody().mask("Please wait while I perform your search...");

        Ext.Ajax.request({
            url: adv_search_url,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            params:  jsonData,

            success: function(response, options) {
                if (App.Constants.isDebug) console.log("**** SUCCESSFUL CALL 'advancedSearch' **** ");
                if (App.Constants.isDebug) console.log(response.responseText);
                Ext.getBody().unmask();

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
                        var myStore = Ext.data.StoreManager.lookup('advsearchresults');
                        if (App.Constants.isDebug) console.log("myStore...: " + myStore);
                        //var MyStore = Ext.data.StoreManager.lookup('searchresults');
                        //myStore.loadData(response.responseText, false);
                        //myStore.getProxy().setUrl(std_search_url);
                        //.data = Ext.decode(response.responseText);
                        //myStore.load();
                        var data = Ext.decode(response.responseText);

                        //myStore.setData(data);
                        myStore.loadData(data, false);
                    }
                } else {
                    if (App.Constants.isDebug) console.log("STATUS_CODE: ===> NO RECORDS MATCH");
                    var message = "No records matching your search criteria were found.";
                    Ext.Msg.alert('ERROR: UNABLE TO FIND ASSOCIATE(S)', message, Ext.emptyFn);
                }
            },
            
            failure: function(response, options) {
                Ext.getBody().unmask();
                Ext.Msg.alert('GENERAL FAILURE', "Unable to Connect to Service!!!", Ext.emptyFn);
            }
        });
    },

    clearAdvSearch: function() {
        if (App.Constants.isDebug) console.log("clearAdvSearch... ");
        var myStore = Ext.data.StoreManager.lookup('advsearchresults');
        this.removeAllFields();
        this.getView().getForm().reset();
        this.updateErrorState(this.getView(), true);
        view.getViewModel().set('isActive', false);
        this.clearPressed = true;

        myStore.removeAll();
        myStore.sync(); 
    },

    updateErrorState: function(cmp, state) {
        if (App.Constants.isDebug) console.log("Inside updateErrorState... ");
        var me = this,
            errorCmp = me.lookupReference('formErrorState'),
            view, form, fields, errors;

        view = me.getView();
        form = view.getForm();

        // If we are called from the form's validitychange event, the state will be false if invalid.
        // If we are called from a field's errorchange event, the state will be the error message.
        if (state === undefined  || state === false || (typeof state === 'string')) {
            if (App.Constants.isDebug) console.log("state ===>>>> " + state);
            fields = form.getFields();
            errors = [];

            fields.each(function(field) {
                Ext.Array.forEach(field.getErrors(), function(error) {
                    errors.push({name: field.getFieldLabel(), error: error});
                });
            });

            errorCmp.setErrors(errors);
            me.hasBeenDirty = true;
            view.getViewModel().set('isActive', false);        
        } else if (state === true) {
            if (App.Constants.isDebug) console.log("state ===>>>> " + state);
            view.getViewModel().set('isActive', true);
            errorCmp.setErrors();
        }
    },
    
    fieldTypeChange: function(e) {
        var typesStore = Ext.data.StoreManager.lookup('fieldtypes');
        var record = typesStore.findRecord('id', e.getValue());
        var recordType = record.get('type');
        if (App.Constants.isDebug) {
            console.log("fieldTypeChange selected id: " + e.getValue());
            console.log("fieldTypeChange selected type: " + recordType);
        }
        var myStore = Ext.data.StoreManager.lookup('operations');
        myStore.clearFilter(true);
        myStore.filter('type', recordType);
    },

    operationChange: function(e) {
        if (App.Constants.isDebug) console.log("operationChange selected type: " + e.getValue());
    },

    valueChange: function(e) {
        if (App.Constants.isDebug) console.log('value changed detected...' + e.value);
    }
});
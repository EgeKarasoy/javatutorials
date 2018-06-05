Ext.define('Directory.viewmodel.createViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.createviewmodel',
    
    data : {
        isActive: false,
        firstName: '',
        lastName: ''
    },

    formulas: {
        isActive: function (get) {
            if (App.Constants.isDebug) 
                console.log('Inside createViewModel .... ')
                
            var fn = get('firstName');
            var ln = get('lastName');
            if (fn != null && fn.length > 0) {
                return true;
            } else if (ln != null && ln.length > 0) {
                return true;
            }
            return false;
        }
    }
});

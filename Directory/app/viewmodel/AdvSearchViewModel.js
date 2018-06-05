Ext.define('Directory.viewmodel.AdvSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.advsearchviewmodel',

    data : {
        isActive: false,
        firstName: '',
        lastName: ''
    },

    formulas: {
        isActive: function (get) {
            return this.isActive;
        }
    }
});

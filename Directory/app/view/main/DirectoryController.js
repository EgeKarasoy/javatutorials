Ext.define('Directory.view.main.DirectoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DirectoryController',

    pressed : false,    

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },

    confirmLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to Logout?', 'onConfirmLogout', this);
    },

    onConfirmLogout: function (choice) {
        if (choice === 'yes') {
            console.log("onConfirmLogout clicked 'yes'")
        }
    },

    onHeaderRender: function() {
        console.log("Inside onHeaderRender...");
        var clock = this.lookupReference('clock'), clockTask;
        var salutation = this.lookupReference('salutation');
        var salutation_text = null, new_salutation_text = null;

        clockTask = Ext.TaskManager.start({
            run: function() {
                // If it gets destroyed, we stop the task
                if (clock.destroyed) {
                    return false;
                }
                Ext.fly(clock.getEl()).update(Ext.Date.format(new Date(), 'M d, Y g:i:s A (T)').toUpperCase());
                var now = new Date();
                var hours = now.getHours();
                if (hours > 0 && hours < 12) new_salutation_text = "Good Morning!";
                else if (hours >= 12 && hours < 18) new_salutation_text = "Good Afternoon!";
                else if (hours >= 18 && hours < 24) new_salutation_text = "Good Evening!";
                if (new_salutation_text != salutation_text) {
                    console.log('Adding Salutation ==> ' + new_salutation_text);
                    salutation_text = new String(new_salutation_text);
                    Ext.fly(salutation.getEl()).update(salutation_text);
                }
            },
            interval: 1000
        });
    }
});

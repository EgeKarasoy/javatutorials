Ext.define('Directory.model.FieldTypes', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'selected', type: 'boolean'}
    ]
});

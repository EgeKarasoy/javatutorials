Ext.define('Directory.store.Operations', {
    extend: 'Ext.data.Store',
    alias: 'store.operations',
    model: 'Directory.model.Operations', 

    data: [
        {id: "like", name:"like", type: "string"},
        {id: "equalTo", name:"equal to", type: "string"},
        {id: "notEqualTo", name:"not equal to", type: "string"},
        {id: "equals", name:"equal to", type: "date"},
        {id: "greaterThan", name:"greater than", type: "date"},
        {id: "lastThan", name:"less than", type: "date"}
    ]
});

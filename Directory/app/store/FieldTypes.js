Ext.define('Directory.store.FieldTypes', {
    extend: 'Ext.data.Store',
    alias: 'store.fieldtypes',
    model: 'Directory.model.FieldTypes', 

    data: [
        {id: "id", name:"ID", type: "string", selected: false},
        {id: "short_name", name:"Short Name", type: "string", selected: false},
        {id: "first_name", name:"First Name", type: "string", selected: false},
        {id: "last_name", name:"Last Name", type: "string", selected: false},
        {id: "job_desc", name:"Job Description", type: "string", selected: false},
        {id: "title_desc", name:"Title Description", type: "string", selected: false},
        {id: "company_name", name:"Company Name", type: "string", selected: false},
        {id: "cost_center", name:"Cost Center", type: "string", selected: false},
        {id: "department", name:"Department", type: "string", selected: false},
        {id: "region", name:"Region", type: "string", selected: false},
        {id: "manager_name", name:"Manager's Name", type: "string", selected: false},
        {id: "phone", name:"Phone Number", type: "string", selected: false},
        {id: "hire_date", name:"Date of Hire", type: "date", selected: false}
    ]
});

Ext.define('Directory.model.SearchResults', {
    extend: 'Ext.data.Model',

    /*
    "_id" : "00001",
    "jobDesc" : "IT Development",
    "employeeType" : "permanent",
    "employeeStatus" : "active",
    "locationType" : "domestic",
    "titleDesc" : "Senior Developer",
    "altTitle" : "",
    "costCenter" : "1025",
    "workingShift" : 1,
    "firstName" : "Amaury",
    "preferredName" : "Amaury",
    "middle" : "",
    "lastName" : "Valdes",
    "fullName" : "Amaury Valdes",
    "country" : "USA",
    "companyName" : "Lark Productions",
    "hireDate" : ISODate("2012-05-18T04:00:00.0001Z"),
    "isActive" : false
    */

    fields: [
        {name: 'id', type: 'string'},
        {name: 'short_name', type: 'string'},
        {name: 'job_desc', type: 'string'},
        {name: 'employee_type', type: 'string'},
        {name: 'employee_status', type: 'string'},
        {name: 'location_type', type: 'string'},
        {name: 'title_desc', type: 'string'},
        {name: 'alt_title', type: 'string'},
        {name: 'cost_center', type: 'string'},
        {name: 'working_shift', type: 'string'},
        {name: 'first_name', type: 'string'},
        {name: 'preferred_name', type: 'string'},
        {name: 'middle', type: 'string'},
        {name: 'last_name', type: 'string'},
        {name: 'full_name', type: 'string'},
        {name: 'country', type: 'string'},
        {name: 'company_name', type: 'string'},
        {name: 'hire_date', type: 'date'},
        {name: 'is_active', type: 'string'}
    ]
});


Ext.define('Directory.view.main.dialog.AssociateDetails', {
    extend: 'Ext.Window',
	alias: 'dialog.associatedetails',
    title: 'Associate Details',
    itemId:'associatedetails',
    reference: 'associatedetails',
	layout : {
		align : 'stretch',
		type : 'vbox'
	},
	autoShow : true,
	resizable: false,
	draggable: true,
	width : 900,
	height : 490,
	modal : true,	

	toTitleCase: function(str) {
	    return str.toString().replace(/\w\S*/g, function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	},

	items: [{
		xtype: 'form',	
		bodyStyle : 'background-color:#F7F7F7;',
		itemId: 'searchForm',
		name: 'searchForm',
		padding: '0 0 0 0',
		frame: false,
		defaults: {
			margins: 3
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},			   
		items:[{
			xtype: 'fieldset',
      title:'ID/Associate Name',
			margin: 10,
      layout: 'hbox',
      defaultType: 'textfield',	
			
			defaults: {
				//fieldStyle: 'background-color:#FEFEFE; color:#000',
				//labelWidth: 140,
				//labelAlign: 'right',
				width: 250
			},

			items: [{
				xtype: 'displayfield',
				name: 'id',
				fieldLabel: 'ID',
				allowBlank : false,
				labelWidth: 25,
				width: 120,
				margins: 3,
				fieldStyle: 'font-size: 150%; font-weight: 600; color: #435d80'
			},
			{
				xtype: 'displayfield',
				name: 'short_name',
				fieldLabel: 'ShortName',
				labelWidth: 80,
				width: 200,
				fieldStyle: 'font-size: 150%; font-weight: 600; color: #435d80',
				margins: 3
			},
			{
				xtype: 'displayfield',
				//id: 'fullName',
				name: 'full_name',
				fieldLabel: 'Associate Full Name',
				labelWidth: 130,
				width: 400,
				fieldStyle: 'font-size: 150%; font-weight: 600; color: #435d80',
				margins: 3
			}]
	    },
		{
			xtype: 'fieldset',
      title:'Affiliation',
			margin: 10,

			//xtype: 'container',
			flex: 3,
			layout: 'column',
			/*layout: {
				type: 'column',
				//align: 'stretch'
			},*/

			items: [{    //  Column #1
				xtype: 'container',
				columnWidth: 0.33,

				defaults: {
					labelWidth: 90,
					labelAlign: 'right',
					xtype: 'textfield',
					margins: 3,
					readOnly: true,
					width: 250
				},

				items:[
					{
						name: 'company_name',
						fieldLabel: 'Company',
						width: 320
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'location_type',
						fieldLabel: 'Location Type',
						width: 250
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'department',
						fieldLabel: 'Department',
						width: 320
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'title_desc',
						fieldLabel: 'Title',
						width: 320
					}
				]
			},
			{    //  Column #2
				xtype: 'container',
				columnWidth: 0.33,

				defaults: {
					//fieldStyle: 'background-color:#FEFEFE; color:#000',
					labelWidth: 140,
					labelAlign: 'right',
					xtype: 'textfield',
					margins: 3,
					readOnly: true,
					width: 250
				},

				items:[
					{
						name: 'company_code',
						fieldLabel: 'Company Code',
						width: 200
					},
					{
						name: 'country',
						fieldLabel: 'Country',
						width: 200
					},
					{
						name: 'cost_center',
						fieldLabel: 'Cost Center',
						//allowBlank : false,
						//labelWidth: 100,
						width: 250
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'alt_title',
						fieldLabel: 'Alt Title',
						width: 280
					},
				],
			},
			{    //  Column #3
				xtype: 'container',
				columnWidth: 0.33,

				defaults: {
					//fieldStyle: 'background-color:#FEFEFE; color:#000',
					labelWidth: 140,
					labelAlign: 'right',
					xtype: 'textfield',
					margins: 3,
					readOnly: true,
					width: 250
				},

				items:[
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'job_desc',
						fieldLabel: 'Job Description',
						width: 270
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'employee_type',
						fieldLabel: 'Employee Type',
						width: 250
					},
					{
						fieldStyle: 'text-transform: capitalize;',
						name: 'employee_status',
						fieldLabel: 'Employee Status',
						width: 250
					}
				]
			}]
		},
		{
			xtype: 'fieldset',
      		title:'Contact Details',
			margin: 10,

			//xtype: 'container',
			layout: {
				type: 'table',
				columns: 3,
				tableAttrs: {
					style: {
						width: '100%'
					}
				}
			},

			defaults: {
				labelWidth: 80,
				labelAlign: 'right',
				border: true,
				margins: 3,
				xtype: 'textfield',
				readOnly: true,
				width: 250
			},

			/*layout: 'table',
			columns: 3,
			border: true,
			tableAttrs: {
				style: {
					width: '100%'
				}
			},*/

			items: [
				{
					name: 'region',
					fieldLabel: 'Region',
					width: 250
				},
				{
					name: 'district',
					fieldLabel: 'District',
					width: 250
				},
				{
					name: 'alt_location',
					fieldLabel: 'Alt Location',
					width: 200
				},
				{
					name: 'building',
					fieldLabel: 'Building',
					width: 250
				},
				{
					name: 'floor',
					fieldLabel: 'Floor',
					width: 250
				},
				{
					name: 'section',
					fieldLabel: 'Section',
					width: 200
				},
				{
					name: 'phone',
					fieldLabel: 'Phone',
					width: 280
				},
				{
					name: 'extension',
					fieldLabel: 'Extension',
					width: 200
				},
				{
					name: 'section_num',
					fieldLabel: 'Section #',
					width: 200
				},
				/*{
					xtype: 'displayfield',
					width: 40
				},*/
				{
					name: 'manager_id',
					fieldLabel: 'Manager ID',
					width: 200
				},
				{
					name: 'manager_name',
					colspan: 2,
					labelWidth: 100,
					fieldLabel: 'Manager Name',
					width: 350
				},
				{
					name: 'email',
					colspan: 3,
					fieldLabel: 'Email',
					width: 450
				}
			]
		}
		]
	}],
	
	listeners:{
		beforerender:function(window) {
			// here, you load window.record into the form!
			if (window.record) window.down('form').loadRecord(window.record);

			/*var fullName = this.toTitleCase(window.record.data['first_name'] 
			 				+ " " + window.record.data['last_name']);

			var name = Ext.getCmp('fullName').setValue(fullName);*/
		}
    },

	buttons: [{
		text : 'Close',
		handler: function () {
			this.up('window').close();
		}
	}]		
	
});
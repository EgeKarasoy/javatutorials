package com.avaldes.model;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.avaldes.util.JsonDateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@XmlRootElement(name = "employee")
@XmlType (propOrder={"id", "short_name", "first_name", "last_name", 
		"middle", "full_name", "job_desc", "employee_type", "employee_status", 
		"email", "hire_date", "is_active",  "location_type", "alt_title", 
		"title_desc", "cost_center", "working_shift", "preferred_name",  
		"country", "company_code", "company_name", "department", 
		"region", "district", "building", "floor", "section", 
		"section_num", "phone", "extension", "manager_id", "manager_name" })
@Document
@JsonPropertyOrder({"id", "short_name", "first_name", "last_name", 
	"middle", "full_name", "job_desc", "employee_type", "employee_status", 
	"email", "hire_date", "is_active",  "location_type", "alt_title", 
	"title_desc", "cost_center", "working_shift", "preferred_name",  
	"country", "company_code", "company_name", "department", 
	"region", "district", "building", "floor", "section", 
	"section_num", "phone", "extension", "manager_id", "manager_name"})
public class Employee {
	
	@Id
	private String id;
	private String short_name;
	private String job_desc;
	private String employee_type;
	private String employee_status;
	private String location_type;
	private String title_desc;  
	private String alt_title;  
	private String cost_center;
	private Integer working_shift;
	private String first_name;
	private String preferred_name;
	private String middle;
	private String last_name;
	private String full_name;
	private String country; 
	private String company_name;
	private int company_code;
	private String department;
	private String region;
	private String district;
	private String building;
	private String floor;
	private String section;
	private String section_num;
	private String phone;
	private String extension;
	private String manager_id;
	private String manager_name;
	private String email;
	private Date hire_date;
	private boolean is_active;
	
	@JsonProperty("id")
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	@JsonProperty("short_name")
	public String getShort_name() {
		return short_name;
	}

	public void setShort_name(String short_name) {
		this.short_name = short_name;
	}
	
	public String getJob_desc() {
		return job_desc;
	}

	public void setJob_desc(String job_desc) {
		this.job_desc = job_desc;
	}

	public String getEmployee_type() {
		return employee_type;
	}

	public void setEmployee_type(String employee_type) {
		this.employee_type = employee_type;
	}

	public String getEmployee_status() {
		return employee_status;
	}

	public void setEmployee_status(String employee_status) {
		this.employee_status = employee_status;
	}

	public String getLocation_type() {
		return location_type;
	}

	public void setLocation_type(String location_type) {
		this.location_type = location_type;
	}

	public String getTitle_desc() {
		return title_desc;
	}

	public void setTitle_desc(String title_desc) {
		this.title_desc = title_desc;
	}

	public String getAlt_title() {
		return alt_title;
	}

	public void setAlt_title(String alt_title) {
		this.alt_title = alt_title;
	}

	public String getCost_center() {
		return cost_center;
	}

	public void setCost_center(String cost_center) {
		this.cost_center = cost_center;
	}

	public Integer getWorking_shift() {
		return working_shift;
	}

	public void setWorking_shift(Integer working_shift) {
		this.working_shift = working_shift;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getPreferred_name() {
		return preferred_name;
	}

	public void setPreferred_name(String preferred_name) {
		this.preferred_name = preferred_name;
	}

	public String getMiddle() {
		return middle;
	}

	public void setMiddle(String middle) {
		this.middle = middle;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getFull_name() {
		return full_name;
	}

	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCompany_name() {
		return company_name;
	}

	public void setCompany_name(String company_name) {
		this.company_name = company_name;
	}

	@JsonSerialize(using=JsonDateTimeSerializer.class)
	public Date getHire_date() {
		return hire_date;
	}

	public void setHire_date(Date hire_date) {
		this.hire_date = hire_date;
	}

	public int getCompany_code() {
		return company_code;
	}

	public void setCompany_code(int company_code) {
		this.company_code = company_code;
	}

	public String getRegion() {
		return region;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getBuilding() {
		return building;
	}

	public void setBuilding(String building) {
		this.building = building;
	}

	public String getFloor() {
		return floor;
	}

	public void setFloor(String floor) {
		this.floor = floor;
	}

	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getSection_num() {
		return section_num;
	}

	public void setSection_num(String section_num) {
		this.section_num = section_num;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getManager_id() {
		return manager_id;
	}

	public void setManager_id(String manager_id) {
		this.manager_id = manager_id;
	}

	public String getManager_name() {
		return manager_name;
	}

	public void setManager_name(String manager_name) {
		this.manager_name = manager_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean getIs_active() {
		return is_active;
	}

	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", short_name=" + short_name
				+ ", job_desc=" + job_desc + ", employee_type="
				+ employee_type + ", employee_status=" + employee_status
				+ ", location_type=" + location_type + ", title_desc="
				+ title_desc + ", alt_title=" + alt_title + ", cost_center="
				+ cost_center + ", working_shift=" + working_shift
				+ ", first_name=" + first_name + ", preferred_name="
				+ preferred_name + ", middle=" + middle + ", last_name="
				+ last_name + ", full_name=" + full_name + ", country="
				+ country + ", company_name=" + company_name
				+ ", company_code=" + company_code + ", department="
				+ department + ", region=" + region + ", district=" + district
				+ ", building=" + building + ", floor=" + floor + ", section="
				+ section + ", section_num=" + section_num + ", phone="
				+ phone + ", extension=" + extension + ", manager_id="
				+ manager_id + ", manager_name=" + manager_name + ", email="
				+ email + ", hire_date=" + hire_date + ", is_active="
				+ is_active + "]";
	}
}

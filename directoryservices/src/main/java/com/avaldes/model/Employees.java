package com.avaldes.model;

import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "employees")
public class Employees {
	
	
	private List<Employee> employees;

	public Employees() {}
	
	public Employees(List<Employee> employees) {
		super();
		this.employees = employees;
	}

	@XmlElement(name = "employee")
	public List<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(List<Employee> employees) {
		this.employees = employees;
	}

	@Override
	public String toString() {
		return "Employees []";
	}
}

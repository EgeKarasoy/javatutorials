package com.example.service;

import java.util.List;
import java.util.Optional;

import com.example.model.Employee;

public interface EmployeeService {
	Optional<Employee> getEmployeeById(long id);
	List<Employee> getAllEmployees();
	Employee addEmployee(Employee emp);
}
package com.avaldes.tutorial;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.avaldes.dao.EmployeeRepository;
import com.avaldes.model.Employee;
import com.avaldes.model.Employees;
import com.avaldes.model.SelectionCriteria;
import com.avaldes.model.StatusMessage;

/**
 * Handles requests for the application home page.
 */
@RestController
public class DirectoryServicesController {

 private static final Logger logger = (Logger) LoggerFactory
   .getLogger(DirectoryServicesController.class);
 public static final String APPLICATION_JSON 
                        = "application/json; charset=UTF-8";
 public static final String APPLICATION_XML 
                        = "application/xml; charset=UTF-8";
 public static final String APPLICATION_HTML = "text/html";

 @Autowired
 private EmployeeRepository employeeRepository;

 /**
  * Simply selects the home view to render by returning its name.
  * 
  */
 @RequestMapping(value = "/status", method = RequestMethod.GET, 
                            produces = APPLICATION_HTML)
 public @ResponseBody String status() {
  logger.info("Inside status() method...");
  return "application OK...";
 }

 @RequestMapping(value = "/error", method = RequestMethod.GET)
 public @ResponseBody String getErrorMessage() {
  return "error";
 }

 @RequestMapping(value = "/v1/employees", method = RequestMethod.GET, 
                            produces = MediaType.APPLICATION_JSON_VALUE)
 public ResponseEntity<?> getAllEmployeesJson() {
  logger.info("Inside getAllEmployees() method...");

  List<Employee> allEmployees = employeeRepository
    .getAllEmployees();

  return new ResponseEntity<>(allEmployees, HttpStatus.OK);
 }

 @RequestMapping(value = "/v1/employees", method = RequestMethod.GET, 
                            produces = MediaType.APPLICATION_XML_VALUE)
 public ResponseEntity<?> getAllEmployeesXml() {
  logger.info("Inside getAllEmployees() method...");

  Employees allEmployees = new Employees(employeeRepository
    .getAllEmployees());

  return new ResponseEntity<>(allEmployees, HttpStatus.OK);
 }
 
 @RequestMapping(value="/v1/employees/{id}", method=RequestMethod.GET)
 public ResponseEntity<?> getEmployeeById(
   @PathVariable(value = "id", required = false) String id) {

  if (id == null || id.isEmpty()) {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
   statusMessage.setMessage("'id' is a required field for this request");

   if (logger.isInfoEnabled()) {
    logger.info("'id' is a required field for this request");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
  }
  
  Employee employee = employeeRepository.getEmployeeById(id);
  
  if (employee == null) {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.NOT_FOUND.value());
   statusMessage.setMessage("'id' is a required field for this request");

   if (logger.isInfoEnabled()) {
    logger.info("Inside getEmployeeById, ID: " + id + ", NOT FOUND!");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.NOT_FOUND);   
  }
  
  if (logger.isInfoEnabled()) {
   logger.info("Inside getEmployeeById, returned: "+employee.toString());
  }

  return new ResponseEntity<>(employee, HttpStatus.OK);
 }
 
 @RequestMapping(value = "/v1/search/std", method = RequestMethod.POST, 
     												produces = MediaType.APPLICATION_JSON_VALUE)
 public ResponseEntity<?> standardSearchJson(
   @RequestParam(value = "firstName", required = false) String firstName,
   @RequestParam(value = "lastName", required = false) String lastName) {
  
  logger.info("Inside standardSearchJson() method...");
  logger.info("firstName....: " + firstName);
  logger.info("lastName.....: " + lastName);

  if (firstName == "" || lastName == "") {
	  System.out.println(firstName);
	  System.out.println(lastName);
	  List<Employee> allEmployees = employeeRepository
			    .getAllEmployees();

			  return new ResponseEntity<>(allEmployees, HttpStatus.OK);
//   StatusMessage statusMessage = new StatusMessage();
//   statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
//   statusMessage
//      .setMessage("Both firstName and lastName may not be empty.");
//
//   logger.error(
//    "Both firstName and lastName may not be empty.  Search aborted!!!");
//   return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
  } else {
   List<Employee> filteredAssociates = employeeRepository
     .getEmployeesStandardSearch(firstName, lastName);

   return new ResponseEntity<>(filteredAssociates, HttpStatus.OK);
  }
 }

 @RequestMapping(value = "/v1/search/std", method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_XML_VALUE)
public ResponseEntity<?> standardSearchXML(
	@RequestParam(value = "firstName", required = false) String firstName,
	@RequestParam(value = "lastName", required = false) String lastName) {
	
	logger.info("Inside standardSearchXML() method...");
	logger.info("firstName....: " + firstName);
	logger.info("lastName.....: " + lastName);
	
	if (firstName == null && lastName == null) {
	StatusMessage statusMessage = new StatusMessage();
	statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
	statusMessage
	.setMessage("Both firstName and lastName may not be empty.");
	
	logger.error(
	"Both firstName and lastName may not be empty.  Search aborted!!!");
	return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
	} else {
		Employees filteredAssociates = new Employees(employeeRepository
								.getEmployeesStandardSearch(firstName, lastName));
	
		return new ResponseEntity<>(filteredAssociates, HttpStatus.OK);
	}
}
 
 @RequestMapping(value = "/v1/search/adv", method = RequestMethod.POST, 
											produces = MediaType.APPLICATION_JSON_VALUE)
 public ResponseEntity<?> advancedSearchJson(
   @RequestBody List<SelectionCriteria> criteriaList) {
  logger.info("Inside advancedSearchJson() method...");

  /*
   * for (SelectionCriteria criteria: criteriaList) {
   * logger.info(criteria.toString()); }
   */

  List<Employee> filteredAssociates = employeeRepository
    .getEmployeesBySelectionCriteria(criteriaList);

  return new ResponseEntity<>(filteredAssociates, HttpStatus.OK);
 }
 
 @RequestMapping(value = "/v1/search/adv", method = RequestMethod.POST, 
			produces = MediaType.APPLICATION_XML_VALUE)
 public ResponseEntity<?> advancedSearchXml(
	@RequestBody List<SelectionCriteria> criteriaList) {
	logger.info("Inside advancedSearchXml() method...");
	
	/*
	* for (SelectionCriteria criteria: criteriaList) {
	* logger.info(criteria.toString()); }
	*/
	
	Employees filteredAssociates = new Employees(employeeRepository
											.getEmployeesBySelectionCriteria(criteriaList));
	
	return new ResponseEntity<>(filteredAssociates, HttpStatus.OK);
 }

 @RequestMapping(value="/v1/employees/{id}", method=RequestMethod.DELETE)
 public ResponseEntity<?> deleteEmployeeById(
   @PathVariable(value = "id", required = false) String id) {

  if (id == null || id.isEmpty()) {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
   statusMessage.setMessage("'id' is a required field for this request");

   if (logger.isInfoEnabled()) {
    logger.info("'id' is a required field for this request");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
  }
  
  Employee employee = employeeRepository.deleteEmployee(id);

  if (employee == null) {
   if (logger.isInfoEnabled()) {
    logger.info(
     "Inside deleteEmployeeById, ID: " + id + ", NOT FOUND!");
   }
   
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.NOT_FOUND.value());
   statusMessage.setMessage("Unable to delete employee ID: " + id);

   if (logger.isInfoEnabled()) {
    logger.info("Inside getEmployeeById, ID: " + id + ", NOT FOUND!");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.NOT_FOUND);   
  }

  if (logger.isInfoEnabled()) {
   logger.info("Inside deleteEmployeeById, deleted: "
    + employee.toString());
  }
  
  return new ResponseEntity<>(employee, HttpStatus.OK);   
 }

 @RequestMapping(value="/v1/employees/{id}", method=RequestMethod.PUT)
 public ResponseEntity<?> updateEmployeeById(
   @PathVariable(value = "id", required = false) String id,
   @RequestBody Employee employee) {

  if (id == null || id.isEmpty()) {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
   statusMessage.setMessage("'id' is a required field for this request");

   if (logger.isInfoEnabled()) {
    logger.info("'id' is a required field for this request");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
  }
  
  Employee myEmployee = employeeRepository.updateEmployee(id,
    employee);

  if (myEmployee == null) {
   if (logger.isInfoEnabled()) {
    logger.info(
     "Unable to update employee.  ID: " + id + ", NOT FOUND!");
   }
   
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.NOT_FOUND.value());
   statusMessage.setMessage("Unable to delete employee ID: " + id);

   return new ResponseEntity<>(statusMessage, HttpStatus.NOT_FOUND);   
  }

  if (logger.isInfoEnabled()) {
   logger.info("Inside updateEmployeeById, updated: "
    + myEmployee.toString());
  }
  return new ResponseEntity<>(myEmployee, HttpStatus.OK);   
 }

 @RequestMapping(value = "/v1/employees", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
 public ResponseEntity<?> addEmployee(
   @RequestBody Employee employee) {

  logger.info("Inside addEmployee, model attribute: "
    + employee.toString());

  if (employee.getId() == null || employee.getId().isEmpty()) {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.BAD_REQUEST.value());
   statusMessage.setMessage("'id' is a required field for this request");

   if (logger.isInfoEnabled()) {
    logger.info("'id' is a required field for this request");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.BAD_REQUEST);
  }

  Employee myEmployee = employeeRepository
                              .getEmployeeById(employee.getId());
  if (myEmployee != null) {
   if (myEmployee.getId() != null
     && myEmployee.getId().equalsIgnoreCase(employee.getId())) {
    StatusMessage statusMessage = new StatusMessage();
    statusMessage.setStatus(HttpStatus.CONFLICT.value());
    statusMessage.setMessage("ID already exists in the system.");
    
    if (logger.isInfoEnabled()) {
     logger.info("'id' is a required field for this request");
    }

    return new ResponseEntity<>(statusMessage, HttpStatus.CONFLICT);
   }
  }

  if (employee.getId() != null && employee.getId().length() > 0) {
   logger.info("Inside addEmployee, adding: " + employee.toString());
   employeeRepository.addEmployee(employee);
  } else {
   StatusMessage statusMessage = new StatusMessage();
   statusMessage.setStatus(HttpStatus.NOT_MODIFIED.value());
   statusMessage.setMessage("Failed to add employee");
   
   if (logger.isInfoEnabled()) {
    logger.info("Failed to insert...");
   }

   return new ResponseEntity<>(statusMessage, HttpStatus.NOT_MODIFIED);
  }

  return new ResponseEntity<>(employee, HttpStatus.OK);  
 }
}
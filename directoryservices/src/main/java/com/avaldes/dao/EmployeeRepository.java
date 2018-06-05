package com.avaldes.dao;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import com.avaldes.model.Employee;
import com.avaldes.model.SelectionCriteria;
import com.avaldes.util.DateUtility;

@Repository
public class EmployeeRepository {
	public static final String COLLECTION_NAME = "associate";
	private static final Logger logger = LoggerFactory
			.getLogger(EmployeeRepository.class);

	@Autowired
	private MongoTemplate mongoTemplate;

	public void addEmployee(Employee employee) {
		if (!mongoTemplate.collectionExists(Employee.class)) {
			mongoTemplate.createCollection(Employee.class);
		}
		mongoTemplate.insert(employee, COLLECTION_NAME);
	}

	public Employee getEmployeeById(String id) {
		return mongoTemplate.findOne(
				Query.query(Criteria.where("id").is(id)), Employee.class,
				COLLECTION_NAME);
	}

	public List<Employee> getAllEmployees() {
		return mongoTemplate.findAll(Employee.class, COLLECTION_NAME);
	}

	public List<Employee> getEmployeesStandardSearch(
			@RequestParam("firstName") String firstName,
			@RequestParam("lastName") String lastName) {

		List<Criteria> andCriteriaList = new ArrayList<Criteria>();
		boolean ok = false;

		Query query = new Query();

		if (firstName != null && firstName.length() > 0) {
			Criteria c1 = Criteria.where("first_name").regex(firstName, "i");
			andCriteriaList.add(c1);
			ok = true;
		}
		if (lastName != null && lastName.length() > 0) {
			Criteria c1 = Criteria.where("last_name").regex(lastName, "i");
			andCriteriaList.add(c1);
			ok = true;
		}

		if (ok) {
			query.addCriteria(new Criteria().andOperator(andCriteriaList
					.toArray(new Criteria[andCriteriaList.size()])));

			return mongoTemplate.find(query, Employee.class,
					COLLECTION_NAME);
		} else {
			return null;
		}
	}

	public List<Employee> getEmployeesBySelectionCriteria(
			List<SelectionCriteria> criteriaList) {

		List<Criteria> andCriteriaList = new ArrayList<Criteria>();

		Query query = new Query();

		for (SelectionCriteria criteriaElem : criteriaList) {
			if (criteriaElem.getOperator().getId().equals("equalTo")) {
				Criteria c1 = Criteria.where(criteriaElem.getField().getId())
						.is(criteriaElem.getValue());
				andCriteriaList.add(c1);
			} else if (criteriaElem.getOperator().getId().equals("like")) {
				Criteria c1 = Criteria.where(criteriaElem.getField().getId())
						.regex(criteriaElem.getValue(), "i");
				andCriteriaList.add(c1);
			} else if (criteriaElem.getOperator().getId()
					.equals("notEqualTo")) {
				Criteria c1 = Criteria.where(criteriaElem.getField().getId())
						.ne(criteriaElem.getValue());
				andCriteriaList.add(c1);
			} else if (criteriaElem.getOperator().getId()
					.equals("greaterThan")) {
				Criteria c1 = Criteria.where(criteriaElem.getField().getId())
						.gt(DateUtility.getDate(criteriaElem.getValue()));
				andCriteriaList.add(c1);
			} else if (criteriaElem.getOperator().getId()
					.equals("lessThan")) {
				Criteria c1 = Criteria.where(criteriaElem.getField().getId())
						.lt(DateUtility.getDate(criteriaElem.getValue()));
				andCriteriaList.add(c1);
			}
			logger.info(criteriaElem.toString());
		}
		query.addCriteria(new Criteria().andOperator(andCriteriaList
				.toArray(new Criteria[andCriteriaList.size()])));

		return mongoTemplate.find(query, Employee.class, COLLECTION_NAME);
	}

	public Employee deleteEmployee(String id) {
		Employee Employee = mongoTemplate.findOne(
				Query.query(Criteria.where("id").is(id)), Employee.class,
				COLLECTION_NAME);
		mongoTemplate.remove(Employee, COLLECTION_NAME);

		return Employee;
	}

	public Employee updateEmployee(String id,
			com.avaldes.model.Employee Employee) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));

		Update update = new Update();
		update.set("id", Employee.getId());
		update.set("short_name", Employee.getShort_name());
		update.set("first_name", Employee.getFirst_name());
		update.set("last_name", Employee.getLast_name());
		update.set("job_desc", Employee.getJob_desc());
		update.set("employee_type", Employee.getEmployee_type());
		update.set("employee_status", Employee.getEmployee_status());
		update.set("location_type", Employee.getLocation_type());
		update.set("title_desc", Employee.getTitle_desc());
		update.set("alt_title", Employee.getAlt_title());
		update.set("cost_center", Employee.getCost_center());
		update.set("working_shift", Employee.getWorking_shift());
		update.set("preferred_name", Employee.getPreferred_name());
		update.set("middle", Employee.getMiddle());
		update.set("full_name", Employee.getFull_name());
		update.set("country", Employee.getCountry());
		update.set("company_name", Employee.getCompany_name());
		update.set("company_code", Employee.getCompany_code());
		update.set("department", Employee.getDepartment());
		update.set("region", Employee.getRegion());
		update.set("district", Employee.getDistrict());
		update.set("building", Employee.getBuilding());
		update.set("floor", Employee.getFloor());
		update.set("section", Employee.getSection());
		update.set("section_num", Employee.getSection_num());
		update.set("phone", Employee.getPhone());
		update.set("extension", Employee.getExtension());
		update.set("manager_id", Employee.getManager_id());
		update.set("manager_name", Employee.getManager_name());
		update.set("email", Employee.getEmail());
		update.set("hire_date", Employee.getHire_date());
		update.set("is_active", Employee.getIs_active());

		mongoTemplate.updateFirst(query, update, Employee.class, COLLECTION_NAME);

		return Employee;
	}
}
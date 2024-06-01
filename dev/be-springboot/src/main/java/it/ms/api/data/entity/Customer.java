package it.ms.api.data.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;

@Entity
@Table(name = "Customers")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "first_name")
	@NonNull
	private String first_name;

	@Column(name = "last_name")
	@NonNull
	private String last_name;

	@Column(name = "phone")
	private String phone;

	@Column(name = "codice_fiscale", unique = true)
	@NonNull
	private String codiceFiscale;

	@Column(name = "address")
	private String address;

	@Column(name = "medical_certificate_date")
	@NonNull
	private String medical_certificate_date;

	@Column(name = "date_of_birth")
	@NonNull
	private String date_of_birth;

	@Column(name = "email")
	private String email;

	@Column(name = "subscription")
	private String subscription;

	@Column(name = "sex")
	@NonNull
	private String sex;

	public Customer() {
	}

	public Customer(String first_name, String last_name, String phone, String codiceFiscale, String address,
			String medical_certificate_date, String date_of_birth, String email, String subscription, String sex) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.codiceFiscale = codiceFiscale;
		this.address = address;
		this.medical_certificate_date = medical_certificate_date;
		this.date_of_birth = date_of_birth;
		this.email = email;
		this.subscription = subscription;
		this.sex = sex;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCodiceFiscale() {
		return codiceFiscale;
	}

	public void setCodiceFiscale(String codiceFiscale) {
		this.codiceFiscale = codiceFiscale;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMedical_certificate_date() {
		return medical_certificate_date;
	}

	public void setMedical_certificate_date(String medical_certificate_date) {
		this.medical_certificate_date = medical_certificate_date;
	}

	public String getDate_of_birth() {
		return date_of_birth;
	}

	public void setDate_of_birth(String date_of_birth) {
		this.date_of_birth = date_of_birth;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSubscription() {
		return subscription;
	}

	public void setSubscription(String subscription) {
		this.subscription = subscription;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	

}

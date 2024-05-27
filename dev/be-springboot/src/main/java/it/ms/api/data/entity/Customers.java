package it.ms.api.data.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
@Table(name = "Customers")
public class Customers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "first_name")
	private String first_name;

	@Column(name = "last_name")
	private String last_name;

	@Column(name = "phone")
	private String phone;

	@Column(name = "codice_fiscale" , unique = true)
	private String codice_fiscale;

	@Column(name = "address")
	private String address;

	@Column(name = "medical_certificate_date")
	private String medical_certificate_date;

	@Column(name = "date_of_birth")
	private String date_of_birth;

	public Customers() {
	}

	public Customers(String first_name, String last_name, String phone, String codice_fiscale, String address,
			String string, String string2) {
		this.first_name = first_name;
		this.last_name = last_name;
		this.phone = phone;
		this.codice_fiscale = codice_fiscale;
		this.address = address;
		this.medical_certificate_date = string;
		this.date_of_birth = string2;
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

	public String getCodice_fiscale() {
		return codice_fiscale;
	}

	public void setCodice_fiscale(String codice_fiscale) {
		this.codice_fiscale = codice_fiscale;
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

	@Override
	public String toString() {
		return "Customers [id=" + id + ", first_name=" + first_name + ", last_name=" + last_name + ", phone=" + phone
				+ ", codice_fiscale=" + codice_fiscale + ", address=" + address + ", medical_certificate_date="
				+ medical_certificate_date + ", date_of_birth=" + date_of_birth + "]";
	}

}

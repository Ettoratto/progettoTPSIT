package it.ms.api.data.entity;

import io.micrometer.common.lang.NonNull;
import jakarta.persistence.*;

@Entity
@Table(name = "Administator")
public class Administator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "usern", unique = true)
	@NonNull
	private String usern;

	@Column(name = "passw")
	@NonNull
	private String passw;

	
	public Administator() {
	}

	public Administator(String usern, String passw) {
		this.usern = usern;
		this.passw = passw;
	}

	public Long getId(Long id) {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsern() {
		return usern;
	}

	public void setUsern(String usern) {
		this.usern = usern;
	}

	public String getPassw() {
		return passw;
	}

	public void setPassw(String passw) {
		this.passw = passw;
	}

	@Override
	public String toString() {
		return "Administator [id=" + id + ", usern=" + usern + ", passw=" + passw + "]";
	}

}

package it.ms.api.data.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Administator")
public class Administator {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "usern", unique = true)
	private String usern;

	@Column(name = "passw")
	private String passw;

	
	public Administator() {
	}

	public Administator(String usern, String passw) {
		this.usern = usern;
		this.passw = passw;
	}

	public void setId(long id) {
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

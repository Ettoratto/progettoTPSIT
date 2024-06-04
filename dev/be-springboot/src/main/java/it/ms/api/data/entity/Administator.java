package it.ms.api.data.entity;

import java.sql.Blob;
import jakarta.persistence.*;

@Entity
@Table(name = "Administator")
public class Administator {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "usern", unique = true)
	private String usern;

	@Column(name = "passw")
	private String passw;

	@Column(name = "img")
	private Blob img;

	public Administator() {
	}

	public Administator(String usern, String passw, Blob img) {
		this.usern = usern;
		this.passw = passw;
		this.img = img;
	}

	public Long getId() {
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

	public Blob getImg() {
		System.out.println(img); // Noncompliant; this code will print the Blob object, not the image content
		return img;
	}

	public void setImg(Blob img) {
		this.img = img;
	}

}

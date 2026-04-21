package com.team2pairing.api.entity;


import jakarta.persistence.*;


@Entity
@Table(name = "leader")
public class Leader {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 50)
    private String fname;

    @Column(nullable = false, length = 50)
    private String lname;

    @Column (nullable = false)
    private String job_title;

    public Leader() {

    }

    public Leader(String fname, String lname, String job_title) {
        this.fname = fname;
        this.lname = lname;
        this.job_title = job_title;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getJob_title() {
        return job_title;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }
}

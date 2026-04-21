package com.team2pairing.api.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Leader {

    @Getter
    @Setter
    @Id
    @GeneratedValue
    private Long id;

    private String fname;

    public Leader() {

    }

    public Leader(String fname) {
        this.fname = fname;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }
}

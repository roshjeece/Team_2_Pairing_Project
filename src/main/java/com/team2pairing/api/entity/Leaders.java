package com.team2pairing.api.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Leaders {

    @Id
    @GeneratedValue
    private Long id;

    private String fname;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


}

package com.team2pairing.api.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
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
}

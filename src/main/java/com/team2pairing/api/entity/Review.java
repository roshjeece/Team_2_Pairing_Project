package com.team2pairing.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Leader needs to be matched after merge
    @ManyToOne
    @JoinColumn(name = "leader_id", nullable = false)
    private Leader leader;

    @Column(name = "leader_rating", nullable = false)
    private Integer rating;

    @Column(name = "review_description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "date_of_review", nullable = false)
    private LocalDate reviewDate;

    private Long leader_id;

    public Review(Long leader_id, Integer rating, String description, LocalDate reviewDate) {
        this.leader_id = leader_id;
        this.rating = rating;
        this.description = description;
        this.reviewDate = reviewDate;
    }

    public Review() {

    }


}

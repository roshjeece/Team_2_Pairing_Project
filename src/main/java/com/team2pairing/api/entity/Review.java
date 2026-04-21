package com.team2pairing.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
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

    public Review(Long id, Leader leader, Integer rating, String description, LocalDate reviewDate) {
        this.id = id;
        this.leader = leader;
        this.rating = rating;
        this.description = description;
        this.reviewDate = reviewDate;
    }

    public Review() {

    }


}

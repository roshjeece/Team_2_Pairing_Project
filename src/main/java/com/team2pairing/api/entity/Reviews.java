package com.team2pairing.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "leader_reviews")
public class Reviews {

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
}

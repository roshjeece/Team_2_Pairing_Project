package com.team2pairing.api.repository;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    ReviewRepository reviewRepository;

    @Test
    void shouldSaveAReview() {
        // Arrange
        LocalDate date = LocalDate.of(2026, 1, 1);
        Leader newLeader = new Leader();
        Review newReview = new Review(newLeader.getId(), 4, "description", date);

        // Act
        reviewRepository.save(newReview);
        Optional<Review> result = reviewRepository.findById(newReview.getId());

        // Assert
        assertEquals("description", result.get().getDescription());

    }
}

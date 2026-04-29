package com.team2pairing.api.repository;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class ReviewRepositoryTest {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    LeaderRepository leaderRepository;

    @Test
    void shouldSaveAReview() {
        // Arrange
        LocalDate date = LocalDate.of(2026, 1, 1);

        Leader newLeader = new Leader("Chuma", "Humphrey", "big dog");
        leaderRepository.save(newLeader);

        Review newReview = new Review(newLeader, 4, "description", date);
        reviewRepository.save(newReview);

        // Act
        Optional<Review> result = reviewRepository.findById(newReview.getId());

        // Assert
        assertEquals("description", result.get().getDescription());
        assertThat(result.get().getLeader()).isEqualTo(newReview.getLeader());

    }

    @Test
    void shouldRemoveAReview() {
        // Arrange
        LocalDate date = LocalDate.of(2026, 1, 1);

        Leader newLeader = new Leader("Chuma", "Humphrey", "big dog");
        leaderRepository.save(newLeader);

        Review newReview = new Review(newLeader, 4, "description", date);
        reviewRepository.save(newReview);

        Long tempId = newReview.getId();

        // Act
        reviewRepository.deleteById(newReview.getId());

        // Assert
        assertThat(reviewRepository.findById(tempId)).isEmpty();
    }
}

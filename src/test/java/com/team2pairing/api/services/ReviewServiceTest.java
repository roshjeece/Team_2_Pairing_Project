package com.team2pairing.api.services;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import com.team2pairing.api.repository.LeaderRepository;
import com.team2pairing.api.repository.ReviewRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private LeaderRepository leaderRepository;

    @InjectMocks
    ReviewService reviewService;

    Leader newLeader;
    Review newReview;

    @Test
    void shouldSaveNewReview(){
        // Arrange
        LocalDate date = LocalDate.of(2023, 5, 27);
        newLeader = new Leader("Joshua", "Reece", "janitor");

        newReview = new Review(newLeader, 5, "perfect", date);
        Review savedReview = new Review(newLeader, 5, "perfect", date);
        savedReview.setId(1L);

        // Act
        when(reviewRepository.save(newReview)).thenReturn(savedReview);
        Review result = reviewService.saveReview(newReview);

        // Assert

        assertThat(result.getId()).isEqualTo(1L);

        verify(reviewRepository).save(newReview);
    }

}
package com.team2pairing.api.controller;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import com.team2pairing.api.services.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.matchesPattern;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReviewController.class)
class ReviewControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    ReviewService reviewService;

    @Test
    void shouldSaveAnewReview() throws Exception {
        // Arrange
        LocalDate date = LocalDate.of(2026, 1, 1);
        Leader newLeader = new Leader("Chuma", "Humphrey", "janitor");

        Review newReview = new Review(newLeader, 3, "good", date);
        newReview.setId(2L);

        // Act
        when(reviewService.saveReview(any(Review.class))).thenReturn(newReview);
        mockMvc.perform(post("/api/entity/review")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newReview)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.description").value(matchesPattern("good")))
                .andDo(print());

        // Assert
        verify(reviewService, times(1)).saveReview(any(Review.class));
    }
        @Test
    void shouldGetReviewsByLeaderId() throws Exception {
            //Arrange
            LocalDate date = LocalDate.of(2026, 1, 1);
            Leader newLeader = new Leader("Chuma", "Humphrey", "janitor");

            List<Review> fakeReviews = List.of(
                    new Review(newLeader, 3, "good", date),
                    new Review(newLeader, 5, "excellent", date)

            );

            when(reviewService.getReviewsByLeaderId(1L)).thenReturn(fakeReviews);
            mockMvc.perform(get("/api/entity/review/leader/1"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.length()").value(2))
                    .andExpect(jsonPath("$[0].description").value("good"))
                    .andExpect(jsonPath("$[1].description").value("excellent"));

        }




}
package com.team2pairing.api.controllers;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import com.team2pairing.api.services.ReviewService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

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
         mockMvc.perform(post("/"))
    }


}
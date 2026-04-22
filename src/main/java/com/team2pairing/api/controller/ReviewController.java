package com.team2pairing.api.controller;

import com.team2pairing.api.entity.Review;
import com.team2pairing.api.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entity/review")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Review saveReview(@RequestBody Review review){
        return reviewService.saveReview(review);
    }
}

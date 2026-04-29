package com.team2pairing.api.controller;

import com.team2pairing.api.entity.Review;
import com.team2pairing.api.services.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/leader/{leader_id}")
    public ResponseEntity<List<Review>> getReviewsByLeaderId(@PathVariable Long leader_id){
        return ResponseEntity.ok(reviewService.getReviewsByLeaderId(leader_id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id){
        reviewService.deleteReviewById(id);
        return ResponseEntity.noContent().build();
    }
}

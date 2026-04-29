package com.team2pairing.api.services;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.entity.Review;
import com.team2pairing.api.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;



    public ReviewService (ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;

    }

    public Review saveReview(Review review) {
        review.setReviewDate(LocalDate.now());
        return reviewRepository.save(review);
    }

    public List<Review> getReviewsByLeaderId(Long leader_id){
        return reviewRepository.findByUserId(leader_id);
    }

}

package com.team2pairing.api.repository;

import com.team2pairing.api.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository <Review, Long> {
    Optional<Review> findById(Long id);

    @Query("SElECT m FROM Review m WHERE m.leader.id = :leader_id")
    List<Review> findByUserId(@Param("leader_id") Long leader_id);

}

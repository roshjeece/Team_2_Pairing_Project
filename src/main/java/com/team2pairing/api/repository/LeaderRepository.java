package com.team2pairing.api.repository;


import com.team2pairing.api.entity.Leader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LeaderRepository extends JpaRepository<Leader, Long> {
//    Optional<Leader> findByfname(String fname);
//    Optional<Leader> findByLabel(String label);


}

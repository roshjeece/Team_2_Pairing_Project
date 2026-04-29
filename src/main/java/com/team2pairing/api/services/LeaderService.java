package com.team2pairing.api.services;
import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.repository.LeaderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeaderService {
    private final LeaderRepository leaderRepository;

    public LeaderService(LeaderRepository leaderRepository) {
        this.leaderRepository = leaderRepository;
    }

    public Leader saveLeader(Leader leader) {
        return leaderRepository.save(leader);
    }

    public List<Leader> getAllLeaders() {
        return leaderRepository.findAll();
    }

//    public Optional<Leader> findByfname(String label) {return leaderRepository.findByfname(label);

}

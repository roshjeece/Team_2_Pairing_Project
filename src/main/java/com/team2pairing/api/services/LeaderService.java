package com.team2pairing.api.services;
import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.repository.LeaderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
}

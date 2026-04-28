package com.team2pairing.api.controller;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.services.LeaderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entity/leader")
public class LeaderController {
    private final LeaderService leaderService;

    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Leader saveLeader(@RequestBody Leader leader) {
        return leaderService.saveLeader(leader);
    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<Leader> getAllLeaders() {
        return leaderService.getAllLeaders();
    }
}
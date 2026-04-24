package com.team2pairing.api.controller;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.services.LeaderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/entity/leader")
public class LeaderController {
    private final LeaderService leaderService;


    public LeaderController(LeaderService leaderService) {
        this.leaderService = leaderService;
    }


    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public Leader saveLeader(@RequestBody Leader leader){
        return leaderService.saveLeader(leader);
    }
}

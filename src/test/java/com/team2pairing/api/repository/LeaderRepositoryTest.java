package com.team2pairing.api.repository;

import com.team2pairing.api.entity.Leader;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class LeaderRepositoryTest {
    @Autowired
    private LeaderRepository leaderRepository;

    @Test
    void shouldSaveALeader() {
        //Arrange
        Leader leader = new Leader("Cameron");;

        //Act
        Leader savedLeader = leaderRepository.save(leader);

        Optional<Leader> found = leaderRepository.findById(savedLeader.getId());

        //Assert
        assertThat(found).isPresent();
        assertThat(found.get()).isEqualTo(savedLeader);
    }

}
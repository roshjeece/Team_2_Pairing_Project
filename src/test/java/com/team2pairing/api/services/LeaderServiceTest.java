package com.team2pairing.api.services;

import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.repository.LeaderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LeaderServiceTest {

    @Mock
    LeaderRepository leaderRepository;

    @InjectMocks
    LeaderService leaderService;

    @Test
    void shouldSaveNewLeader() {
        // Arrange
        Leader leader = new Leader("Cameron", "Spencer", "CEO");
        Leader savedLeader = new Leader("Cameron", "Spencer", "CEO");
        savedLeader.setId(1L);

        // Act
        when(leaderRepository.save(leader)).thenReturn(savedLeader);
        Leader result = leaderService.saveLeader(leader);

        // Assert
        assertThat(result.getId()).isEqualTo(1L);

        verify(leaderRepository).save(leader);

    }

}
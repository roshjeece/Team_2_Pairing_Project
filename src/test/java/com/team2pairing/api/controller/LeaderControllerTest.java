package com.team2pairing.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.team2pairing.api.entity.Leader;
import com.team2pairing.api.services.LeaderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LeaderController.class)
class LeaderControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @MockitoBean
    LeaderService leaderService;

    @Test
    void shouldSaveNewLeader() throws Exception {
        Leader leader = new Leader("Joshua", "Reece", "janitor");
        leader.setId(1L);

        when(leaderService.saveLeader(any(Leader.class))).thenReturn(leader);

        mockMvc.perform(post("/api/entity/leader")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(leader)))
                .andExpect(status().isCreated())
                .andDo(print())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void shouldGetAllLeaders() throws Exception {
        List<Leader> fakeLeaders = List.of(
                new Leader("Cam", "Spencer", "CEO"),
                new Leader("Tairrque", "Baker", "Engineer")
        );

        when(leaderService.getAllLeaders()).thenReturn(fakeLeaders);

        mockMvc.perform(get("/api/entity/leader"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].fname").value("Cam"))
                .andExpect(jsonPath("$[1].fname").value("Tairrque"));
    }
}
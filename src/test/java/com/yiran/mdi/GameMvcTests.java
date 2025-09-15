package com.yiran.mdi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class GameMvcTests {

    @Autowired
    private MockMvc mvc;

    @Test
    void testGetGame() throws Exception {
        int id = 1;
        String url = String.format("/game/%d", id);
        mvc.perform(get(url))
                .andExpect(status().isOk());
    }

    @Test
    void testGetGames() throws Exception {
        mvc.perform(get("/games"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetGamesPage() throws Exception {
        int page = 1;
        String url = String.format("/games/%d", page);
        mvc.perform(get(url))
                .andExpect(status().isOk());
    }
}

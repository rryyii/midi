package com.yiran.mdi;

import com.yiran.mdi.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@AutoConfigureMockMvc
public class UserMvcTests {

    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private UserService userService;

    @Test
    void testGetUser() throws Exception {
        String param = String.format("/user/%d", 1);
        mvc.perform(get(param))
                .andExpect(status().isOk());
    }

    @Test
    void testCreateUser() throws Exception {

    }

    @Test
    void testUpdateUser() throws Exception {

    }

    @Test
    void testValidateUser() throws Exception {

    }

    @Test
    void testRemoveUser() throws Exception {

    }

}

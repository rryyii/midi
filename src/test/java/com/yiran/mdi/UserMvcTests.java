package com.yiran.mdi;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class UserMvcTests {

    @Autowired
    private MockMvc mvc;

    @Test
    void testGetUser() throws Exception {

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

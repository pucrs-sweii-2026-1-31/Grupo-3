package com.example.Trabalho_Eng_Soft_II.controller;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO userDTO;

    @BeforeEach
    public void setup() {
        userDTO = new UserDTO();
        userDTO.setUserName("testuser");
        userDTO.setEmail("test@email.com");
        userDTO.setPassword("123456");
    }

    @Test
    public void create_ShouldReturnCreatedUser_WhenDataIsValid() throws Exception {
        UserResumoDTO expectedResumo = new UserResumoDTO(1L, "testuser", "test@email.com");
        when(userService.criarUsuario(any(UserDTO.class))).thenReturn(expectedResumo);

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Usuário criado com sucesso"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.userName").value("testuser"))
                .andExpect(jsonPath("$.data.email").value("test@email.com"));
    }

    @Test
    public void create_ShouldReturnBadRequest_WhenEmailIsInvalid() throws Exception {
        userDTO.setEmail("invalid-email");

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.validationErrors[0].field").value("email"));
    }
}

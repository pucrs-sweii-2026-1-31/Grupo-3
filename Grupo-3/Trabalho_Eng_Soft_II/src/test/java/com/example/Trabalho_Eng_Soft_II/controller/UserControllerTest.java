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
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDTO userDTO;

    private UserResumoDTO userResumoDTO;

    @BeforeEach
    public void setup() {
        userDTO = new UserDTO();
        userDTO.setUserName("joaosilva");
        userDTO.setEmail("joao@email.com");
        userDTO.setPassword("senha123");

        userResumoDTO = new UserResumoDTO(1L, "joaosilva", "joao@email.com");
    }

    //post

    @Test
    public void create_ShouldReturnCreatedUser_WhenDataIsValid() throws Exception {
        when(userService.criarUsuario(any(UserDTO.class))).thenReturn(userResumoDTO);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Usuário criado com sucesso"))
                .andExpect(jsonPath("$.data.id").value(1))
                .andExpect(jsonPath("$.data.userName").value("joaosilva"))
                .andExpect(jsonPath("$.data.email").value("joao@email.com"));
    }

    @Test
    public void create_ShouldReturnBadRequest_WhenEmailIsInvalid() throws Exception {
        userDTO.setEmail("email-invalido");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Bad Request"))
                .andExpect(jsonPath("$.validationErrors[0].field").value("email"));
    }

     @Test
    public void create_ShouldReturnBadRequest_WhenPasswordIsTooShort() throws Exception {
        userDTO.setPassword("123");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors[0].field").value("password"));
    }

    @Test
    public void create_ShouldReturnBadRequest_WhenEmailAlreadyExists() throws Exception {
        when(userService.criarUsuario(any(UserDTO.class)))
                .thenThrow(new IllegalArgumentException("Email já cadastrado"));

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email já cadastrado"));
    }

    @Test
    public void create_ShouldReturnBadRequest_WhenUserNameAlreadyExists() throws Exception {
        when(userService.criarUsuario(any(UserDTO.class)))
                .thenThrow(new IllegalArgumentException("Nome de usuário já existe"));

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Nome de usuário já existe"));
    }

    //delete

    @Test
    public void delete_ShouldReturnOk_WhenUserExists() throws Exception {
        doNothing().when(userService).deletarUsuario(1L);

        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Usuário deletado com sucesso"));
    }

    @Test
    public void delete_ShouldReturnBadRequest_WhenUserNotFound() throws Exception {
        doThrow(new IllegalArgumentException("Usuário com o id não cadastrado"))
                .when(userService).deletarUsuario(99L);

        mockMvc.perform(delete("/api/users/99"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Usuário com o id não cadastrado"));
    }



    //gets

    @Test
    public void listAll_ShouldReturnOk_WhenUsersExist() throws Exception {
        org.springframework.data.domain.Page<UserResumoDTO> page =
                new org.springframework.data.domain.PageImpl<>(java.util.List.of(userResumoDTO));

        when(userService.listarUsuarios(any())).thenReturn(page);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].email").value("joao@email.com"));
    }

    @Test
    public void listAll_ShouldReturnEmptyPage_WhenNoUsersExist() throws Exception {
        org.springframework.data.domain.Page<UserResumoDTO> emptyPage =
                new org.springframework.data.domain.PageImpl<>(java.util.List.of());

        when(userService.listarUsuarios(any())).thenReturn(emptyPage);

        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content").isEmpty());
    }

}
package com.example.Trabalho_Eng_Soft_II.controller;

import com.example.Trabalho_Eng_Soft_II.dto.AuthDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.service.TokenService;
import com.example.Trabalho_Eng_Soft_II.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void login_ShouldReturnToken_WhenCredentialsAreValid() throws Exception {
        AuthDTO authDTO = new AuthDTO();
        authDTO.setEmail("test@email.com");
        authDTO.setPassword("123456");

        Authentication authentication = mock(Authentication.class);

        User mockUser = new User();
        mockUser.setEmail("test@email.com");

        when(authentication.getPrincipal()).thenReturn(mockUser);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(tokenService.generateToken(mockUser)).thenReturn("mock-jwt-token");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message", containsString("Login")))
                .andExpect(jsonPath("$.data.token").value("mock-jwt-token"));
    }

    @Test
    public void login_ShouldReturnUnauthorized_WhenCredentialsAreInvalid() throws Exception {
        AuthDTO authDTO = new AuthDTO();
        authDTO.setEmail("test@email.com");
        authDTO.setPassword("wrong-password");

        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Bad credentials"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authDTO)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.message", containsString("Credenciais")));
    }

    @Test
    public void login_ShouldReturnBadRequest_WhenEmailIsBlank() throws Exception {
        AuthDTO authDTO = new AuthDTO();
        authDTO.setEmail("");
        authDTO.setPassword("123456");

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(authDTO)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void register_ShouldReturnCreatedUser_WhenDataIsValid() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("joaosilva");
        userDTO.setEmail("joao@email.com");
        userDTO.setPassword("senha123");

        UserResumoDTO response = new UserResumoDTO(1L, "joaosilva", "joao@email.com");
        when(userService.criarUsuario(any(UserDTO.class))).thenReturn(response);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message", containsString("registrado")))
                .andExpect(jsonPath("$.data.email").value("joao@email.com"));
    }

    @Test
    public void register_ShouldReturnBadRequest_WhenPasswordIsTooShort() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName("joaosilva");
        userDTO.setEmail("joao@email.com");
        userDTO.setPassword("123");

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDTO)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.validationErrors[0].field").value("password"));
    }
}

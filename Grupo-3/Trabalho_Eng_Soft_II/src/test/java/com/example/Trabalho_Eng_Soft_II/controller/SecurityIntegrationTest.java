package com.example.Trabalho_Eng_Soft_II.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Testa as regras de autorização configuradas no SecurityConfig:
 * - Rotas públicas acessíveis sem autenticação.
 * - Rotas protegidas bloqueadas sem token JWT.
 * - Swagger UI acessível publicamente.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void loginEndpoint_ShouldBePublic_ReturningClientErrorNotUnauthorized() throws Exception {
        // Sem auth, mas enviando body inválido — deve retornar 400 (Bad Request) e NÃO 401
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"\",\"password\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerEndpoint_ShouldBePublic() throws Exception {
        // Sem auth, body com validação inválida — deve retornar 400 e NÃO 401
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"userName\":\"\",\"email\":\"\",\"password\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void usersEndpoint_ShouldDenyAccess_WhenNoAuthProvided() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().is4xxClientError());
    }

    @Test
    void securityRegression_FullFlow_ShouldAuthorizeWithValidToken() throws Exception {
        // 1. Registro de usuário (Público)
        String userJson = "{\"userName\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}";
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isCreated());

        // 2. Login para obter token (Público)
        String loginJson = "{\"email\":\"test@example.com\",\"password\":\"password123\"}";
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        // Extração simples do token (considerando que ApiResponse tem um campo 'data' com o DTO)
        String token = response.split("\"token\":\"")[1].split("\"")[0];

        // 3. Acesso a rota protegida com Token (Privado)
        mockMvc.perform(get("/api/users")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void swaggerApiDocs_ShouldBePubliclyAccessible() throws Exception {
        mockMvc.perform(get("/v3/api-docs"))
                .andExpect(status().isOk());
    }
}

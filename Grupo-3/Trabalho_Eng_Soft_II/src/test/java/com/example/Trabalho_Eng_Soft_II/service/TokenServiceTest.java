package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class TokenServiceTest {

    private TokenService tokenService;
    private User user;

    @BeforeEach
    void setUp() {
        tokenService = new TokenService("test-secret-key-for-jwt");

        user = new User();
        user.setEmail("test@email.com");
    }

    @Test
    void generateToken_ShouldReturnToken_WhenUserIsValid() {
        String token = tokenService.generateToken(user);

        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(token.startsWith("eyJ"));
    }

    @Test
    void validateToken_ShouldReturnSubject_WhenTokenIsValid() {
        String token = tokenService.generateToken(user);
        String subject = tokenService.validateToken(token);

        assertEquals("test@email.com", subject);
    }

    @Test
    void validateToken_ShouldReturnEmptyString_WhenTokenIsInvalid() {
        String invalidToken = "invalid.token.here";
        String subject = tokenService.validateToken(invalidToken);

        assertEquals("", subject);
    }

    @Test
    void constructor_ShouldThrowException_WhenSecretIsBlank() {
        IllegalStateException exception = assertThrows(IllegalStateException.class, () -> {
            new TokenService(" ");
        });

        assertEquals("JWT_SECRET nao configurado", exception.getMessage());
    }
}

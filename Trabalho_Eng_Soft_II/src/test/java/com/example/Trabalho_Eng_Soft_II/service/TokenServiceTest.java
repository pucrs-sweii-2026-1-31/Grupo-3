package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class TokenServiceTest {

    @InjectMocks
    private TokenService tokenService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("test@email.com");

        // Set the secret using reflection for testing
        ReflectionTestUtils.setField(tokenService, "secret", "test-secret-key-for-jwt");
    }

    @Test
    void generateToken_ShouldReturnToken_WhenUserIsValid() {
        String token = tokenService.generateToken(user);

        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(token.startsWith("eyJ")); // JWT tokens start with "eyJ"
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
}
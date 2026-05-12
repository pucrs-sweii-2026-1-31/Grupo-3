package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class AuthorizationServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AuthorizationService authorizationService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("test@email.com");
        user.setPassword("password");
    }

    @Test
    void loadUserByUsername_ShouldReturnUserDetails_WhenUserExists() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(user));

        UserDetails userDetails = authorizationService.loadUserByUsername("test@email.com");

        assertNotNull(userDetails);
        assertEquals("test@email.com", userDetails.getUsername());
        verify(userRepository).findByEmail("test@email.com");
    }

    @Test
    void loadUserByUsername_ShouldThrowUsernameNotFoundException_WhenUserDoesNotExist() {
        when(userRepository.findByEmail("nonexistent@email.com")).thenReturn(Optional.empty());

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> {
            authorizationService.loadUserByUsername("nonexistent@email.com");
        });

        assertEquals("Usuario nao encontrado: nonexistent@email.com", exception.getMessage());
        verify(userRepository).findByEmail("nonexistent@email.com");
    }
}

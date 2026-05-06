package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UserDTO userDTO;
    private User user;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
        userDTO.setUserName("testuser");
        userDTO.setEmail("test@email.com");
        userDTO.setPassword("123456");

        user = new User();
        user.setId(1L);
        user.setUserName("testuser");
        user.setEmail("test@email.com");
        user.setPassword("encodedPassword");
    }

    @Test
    void criarUsuario_ShouldReturnUserResumoDTO_WhenValidUserDTO() {
        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResumoDTO result = userService.criarUsuario(userDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("testuser", result.getUserName());
        assertEquals("test@email.com", result.getEmail());
        verify(passwordEncoder).encode("123456");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void listarUsuarios_ShouldReturnPageOfUserResumoDTO() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> userPage = new PageImpl<>(List.of(user), pageable, 1);
        when(userRepository.findAll(pageable)).thenReturn(userPage);

        Page<UserResumoDTO> result = userService.listarUsuarios(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("testuser", result.getContent().get(0).getUserName());
        verify(userRepository).findAll(pageable);
    }

    @Test
    void deletarUsuario_ShouldReturnTrue_WhenUserExists() {
        when(userRepository.existsById(1L)).thenReturn(true);

        boolean result = userService.deletarUsuario(1L);

        assertTrue(result);
        verify(userRepository).existsById(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void deletarUsuario_ShouldThrowException_WhenUserDoesNotExist() {
        when(userRepository.existsById(1L)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.deletarUsuario(1L);
        });

        assertEquals("Usuário com o id não cadastrado", exception.getMessage());
        verify(userRepository).existsById(1L);
        verify(userRepository, never()).deleteById(1L);
    }
}
package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.exception.DuplicateResourceException;
import com.example.Trabalho_Eng_Soft_II.exception.ResourceNotFoundException;
import com.example.Trabalho_Eng_Soft_II.model.Role;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.RoleRepository;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
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
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private UserDTO userDTO;
    private User user;
    private Role role;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
        userDTO.setUserName("testuser");
        userDTO.setEmail("test@email.com");
        userDTO.setPassword("123456");

        role = new Role();
        role.setId(1L);
        role.setName("ROLE_USER");

        user = new User();
        user.setId(1L);
        user.setUserName("testuser");
        user.setEmail("test@email.com");
        user.setPassword("encodedPassword");
        user.setRoles(Set.of(role));
    }

    @Test
    void criarUsuario_ShouldReturnUserResumoDTO_WhenValidUserDTOAndDefaultRoleExists() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.empty());
        when(userRepository.findByUserName("testuser")).thenReturn(Optional.empty());
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(role));
        when(passwordEncoder.encode("123456")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResumoDTO result = userService.criarUsuario(userDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("testuser", result.getUserName());
        assertEquals("test@email.com", result.getEmail());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();
        assertEquals("testuser", savedUser.getUserName());
        assertEquals("test@email.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertEquals(Set.of(role), savedUser.getRoles());
        verify(roleRepository).findByName("ROLE_USER");
    }

    @Test
    void criarUsuario_ShouldCreateDefaultRole_WhenRoleDoesNotExist() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.empty());
        when(userRepository.findByUserName("testuser")).thenReturn(Optional.empty());
        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.empty());
        when(roleRepository.save(any(Role.class))).thenReturn(role);
        when(passwordEncoder.encode("123456")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        UserResumoDTO result = userService.criarUsuario(userDTO);

        assertNotNull(result);
        verify(roleRepository).save(any(Role.class));
        verify(userRepository).save(any(User.class));
    }

    @Test
    void criarUsuario_ShouldThrowException_WhenEmailAlreadyExists() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(user));

        DuplicateResourceException exception = assertThrows(DuplicateResourceException.class, () -> {
            userService.criarUsuario(userDTO);
        });

        assertTrue(exception.getMessage().contains("Email"));
        verify(userRepository).findByEmail("test@email.com");
        verify(userRepository, never()).findByUserName(any(String.class));
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void criarUsuario_ShouldThrowException_WhenUserNameAlreadyExists() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.empty());
        when(userRepository.findByUserName("testuser")).thenReturn(Optional.of(user));

        DuplicateResourceException exception = assertThrows(DuplicateResourceException.class, () -> {
            userService.criarUsuario(userDTO);
        });

        assertTrue(exception.getMessage().contains("Nome"));
        verify(userRepository).findByEmail("test@email.com");
        verify(userRepository).findByUserName("testuser");
        verify(userRepository, never()).save(any(User.class));
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

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            userService.deletarUsuario(1L);
        });

        assertTrue(exception.getMessage().contains("id"));
        verify(userRepository).existsById(1L);
        verify(userRepository, never()).deleteById(1L);
    }
}

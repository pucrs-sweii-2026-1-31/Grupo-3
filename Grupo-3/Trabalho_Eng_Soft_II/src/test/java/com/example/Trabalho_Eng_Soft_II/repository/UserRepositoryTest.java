package com.example.Trabalho_Eng_Soft_II.repository;

import com.example.Trabalho_Eng_Soft_II.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findByEmail_ShouldReturnUser_WhenEmailExists() {
        User user = new User();
        user.setUserName("testuser");
        user.setEmail("test@email.com");
        user.setPassword("password");
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByEmail("test@email.com");

        assertTrue(foundUser.isPresent());
        assertEquals("test@email.com", foundUser.get().getEmail());
    }

    @Test
    void findByEmail_ShouldReturnEmpty_WhenEmailDoesNotExist() {
        Optional<User> foundUser = userRepository.findByEmail("nonexistent@email.com");

        assertFalse(foundUser.isPresent());
    }

    @Test
    void findByUserName_ShouldReturnUser_WhenUserNameExists() {
        User user = new User();
        user.setUserName("testuser");
        user.setEmail("test@email.com");
        user.setPassword("password");
        userRepository.save(user);

        Optional<User> foundUser = userRepository.findByUserName("testuser");

        assertTrue(foundUser.isPresent());
        assertEquals("testuser", foundUser.get().getUserName());
    }

    @Test
    void findByUserName_ShouldReturnEmpty_WhenUserNameDoesNotExist() {
        Optional<User> foundUser = userRepository.findByUserName("nonexistentuser");

        assertFalse(foundUser.isPresent());
    }
}
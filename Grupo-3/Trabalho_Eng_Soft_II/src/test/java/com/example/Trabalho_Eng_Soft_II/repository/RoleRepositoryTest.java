package com.example.Trabalho_Eng_Soft_II.repository;

import com.example.Trabalho_Eng_Soft_II.model.Role;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
@ActiveProfiles("test")
public class RoleRepositoryTest {

    @Autowired
    private RoleRepository roleRepository;

    @Test
    void findByName_ShouldReturnRole_WhenRoleExists() {
        Role role = new Role();
        role.setName("ROLE_USER");
        roleRepository.save(role);

        Optional<Role> foundRole = roleRepository.findByName("ROLE_USER");

        assertTrue(foundRole.isPresent());
        assertEquals("ROLE_USER", foundRole.get().getName());
    }

    @Test
    void findByName_ShouldReturnEmpty_WhenRoleDoesNotExist() {
        Optional<Role> foundRole = roleRepository.findByName("ROLE_ADMIN");

        assertFalse(foundRole.isPresent());
    }
}

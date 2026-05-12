package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.exception.DuplicateResourceException;
import com.example.Trabalho_Eng_Soft_II.exception.ResourceNotFoundException;
import com.example.Trabalho_Eng_Soft_II.model.Role;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.RoleRepository;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    private static final String DEFAULT_ROLE = "ROLE_USER";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResumoDTO criarUsuario(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new DuplicateResourceException("Email ja cadastrado");
        }

        if (userRepository.findByUserName(userDTO.getUserName()).isPresent()) {
            throw new DuplicateResourceException("Nome de usuario ja existe");
        }

        User user = toModel(userDTO);
        user.setRoles(Set.of(getOrCreateDefaultRole()));

        user = userRepository.save(user);
        return UserResumoDTO.fromModel(user);
    }

    public Page<UserResumoDTO> listarUsuarios(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(UserResumoDTO::fromModel);
    }

    public boolean deletarUsuario(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario com o id nao cadastrado");
        }

        userRepository.deleteById(id);
        return true;
    }

    private Role getOrCreateDefaultRole() {
        return roleRepository.findByName(DEFAULT_ROLE)
                .orElseGet(() -> {
                    Role newRole = new Role();
                    newRole.setName(DEFAULT_ROLE);
                    return roleRepository.save(newRole);
                });
    }

    private User toModel(UserDTO dto) {
        User user = new User();
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        return user;
    }
}

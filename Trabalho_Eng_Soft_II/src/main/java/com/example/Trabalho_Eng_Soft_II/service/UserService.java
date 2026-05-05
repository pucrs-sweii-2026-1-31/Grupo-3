package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.Role;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.RoleRepository;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResumoDTO criarUsuario(UserDTO userDTO) {
        // Validar se o email já existe
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email já cadastrado");
        }

        // Validar se o userName já existe
        if (userRepository.findByUserName(userDTO.getUserName()).isPresent()) {
            throw new IllegalArgumentException("Nome de usuário já existe");
        }

        // Validar perfil
        if (!isValidPerfil(userDTO.getPerfil())) {
            throw new IllegalArgumentException("Perfil inválido. Use 'IDOSO' ou 'ADMINISTRADOR'");
        }

        User user = toModel(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        // Buscar e atribuir o role apropriado
        Role role = roleRepository.findByName(userDTO.getPerfil())
                .orElseThrow(() -> new IllegalArgumentException("Role não encontrado: " + userDTO.getPerfil()));
        
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        
        user = userRepository.save(user);
        return UserResumoDTO.fromModel(user);
    }

    public Page<UserResumoDTO> listarUsuarios(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(UserResumoDTO::fromModel);
    }

    public boolean deletarUsuario(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Usuário com o id não cadastrado");
        }
        userRepository.deleteById(id);
        return true;
    }

    private User toModel(UserDTO dto){
        User user = new User();
        user.setUserName(dto.getUserName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setDataNascimento(dto.getDataNascimento());
        return user;
    }

    private boolean isValidPerfil(String perfil) {
        return "IDOSO".equals(perfil) || "ADMINISTRADOR".equals(perfil);
    }
}


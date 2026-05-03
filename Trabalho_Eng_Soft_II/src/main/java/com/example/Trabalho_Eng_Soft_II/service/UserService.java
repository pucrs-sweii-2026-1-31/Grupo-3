package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.DTO.UserDTO;
import com.example.Trabalho_Eng_Soft_II.DTO.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean criarUsuario(UserDTO userDTO) {
        User user = toModel(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(user);
        return true;
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
        return new User(
            dto.getId(),
            dto.getUserName(),
            dto.getEmail(),
            dto.getPassword()
        )
    }
}

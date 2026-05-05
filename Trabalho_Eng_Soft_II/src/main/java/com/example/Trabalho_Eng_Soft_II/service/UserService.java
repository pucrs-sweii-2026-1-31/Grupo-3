package com.example.Trabalho_Eng_Soft_II.service;

import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResumoDTO criarUsuario(UserDTO userDTO) {
        User user = toModel(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
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
        return user;
    }
}


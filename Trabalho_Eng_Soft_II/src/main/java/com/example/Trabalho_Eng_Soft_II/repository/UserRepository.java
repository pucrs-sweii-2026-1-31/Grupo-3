package com.example.Trabalho_Eng_Soft_II.repository;

import com.example.Trabalho_Eng_Soft_II.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByUserName(String userName);
}
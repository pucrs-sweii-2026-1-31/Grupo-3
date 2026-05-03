package com.example.Trabalho_Eng_Soft_II.repository;

import com.example.Trabalho_Eng_Soft_II.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

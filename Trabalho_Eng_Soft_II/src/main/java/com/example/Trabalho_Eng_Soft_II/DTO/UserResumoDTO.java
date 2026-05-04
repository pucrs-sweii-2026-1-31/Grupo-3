package com.example.Trabalho_Eng_Soft_II.dto;

import com.example.Trabalho_Eng_Soft_II.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResumoDTO {

    private Long id;
    private String userName;
    private String email;


   public static UserResumoDTO fromModel(User user) {
    return new UserResumoDTO(
        user.getId(),
        user.getUsername(),
        user.getEmail()
    );
}
}

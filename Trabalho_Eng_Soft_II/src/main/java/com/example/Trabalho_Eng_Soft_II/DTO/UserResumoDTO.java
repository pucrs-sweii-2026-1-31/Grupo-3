package com.example.Trabalho_Eng_Soft_II.dto;

import com.example.Trabalho_Eng_Soft_II.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO resumido com informações do usuário criado")
public class UserResumoDTO {

    @Schema(description = "ID do usuário", example = "1")
    private Long id;

    @Schema(description = "Nome do usuário", example = "João Silva")
    private String userName;

    @Schema(description = "Email do usuário", example = "joao@example.com")
    private String email;

    @Schema(description = "Data de nascimento do usuário", example = "1960-05-15", format = "date")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;


   public static UserResumoDTO fromModel(User user) {
        return new UserResumoDTO(
            user.getId(),
            user.getUserName(),
            user.getEmail()
            user.getUsername(),
            user.getEmail(),
            user.getDataNascimento()
        );
    }
}


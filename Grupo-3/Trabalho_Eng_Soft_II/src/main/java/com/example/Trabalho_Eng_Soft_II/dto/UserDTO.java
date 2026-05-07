package com.example.Trabalho_Eng_Soft_II.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
@Schema(description = "DTO para registro de novo usuário")
public class UserDTO {

    @NotBlank(message = "O nome é obrigatório")
    @Schema(description = "Nome do usuário", example = "João Silva", maxLength = 100)
    private String userName;

    @Email(message = "Email inválido")
    @NotBlank(message = "O email é obrigatório")
    @Schema(description = "Email único do usuário", example = "joao@example.com")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    @Schema(description = "Senha do usuário", example = "senha123", minLength = 6)
    private String password;
}

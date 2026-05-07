package com.example.Trabalho_Eng_Soft_II.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Schema(description = "DTO para autenticação de usuário (login)")
public class AuthDTO {
    
    @Email(message = "Email inválido")
    @NotBlank(message = "O email é obrigatório")
    @Schema(description = "Email do usuário", example = "joao@example.com")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    @Schema(description = "Senha do usuário", example = "senha123")
    private String password;
}

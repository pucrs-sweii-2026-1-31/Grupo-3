package com.example.Trabalho_Eng_Soft_II.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Solicitação para renovação de token")
public class RefreshTokenDTO {
    @NotBlank(message = "O token de atualização é obrigatório")
    @Schema(description = "Token de atualização (Refresh Token)", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;
}

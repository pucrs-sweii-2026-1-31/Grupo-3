package com.example.Trabalho_Eng_Soft_II.controller;

import com.example.Trabalho_Eng_Soft_II.dto.ApiResponse;
import com.example.Trabalho_Eng_Soft_II.dto.AuthDTO;
import com.example.Trabalho_Eng_Soft_II.dto.LoginResponseDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.model.User;
import com.example.Trabalho_Eng_Soft_II.service.TokenService;
import com.example.Trabalho_Eng_Soft_II.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "API de autenticacao e registro de usuarios")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, TokenService tokenService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userService = userService;
    }

    @PostMapping("/login")
    @Operation(
        summary = "Autenticar usuario (Login)",
        description = "Realiza a autenticacao do usuario e retorna um token JWT para requisicoes autenticadas",
        tags = {"Authentication"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Login realizado com sucesso, token JWT retornado"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Email ou senha invalidos"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Dados invalidos"
        )
    })
    public ResponseEntity<ApiResponse<LoginResponseDTO>> login(@RequestBody @Valid AuthDTO authDTO) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(authDTO.getEmail(), authDTO.getPassword());
        var auth = authenticationManager.authenticate(usernamePassword);
        
        User user = (User) auth.getPrincipal();
        var token = tokenService.generateToken(user);
        var refreshToken = tokenService.generateRefreshToken(user);

        return ResponseEntity.ok(ApiResponse.success("Login realizado com sucesso", new LoginResponseDTO(token, refreshToken)));
    }

    @PostMapping("/refresh")
    @Operation(
        summary = "Renovar token de acesso",
        description = "Recebe um Refresh Token válido e retorna um novo Token de Acesso e um novo Refresh Token",
        tags = {"Authentication"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Token renovado com sucesso"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Refresh Token inválido ou expirado"
        )
    })
    public ResponseEntity<ApiResponse<LoginResponseDTO>> refresh(@RequestBody @Valid com.example.Trabalho_Eng_Soft_II.dto.RefreshTokenDTO refreshTokenDTO) {
        String email = tokenService.validateToken(refreshTokenDTO.getRefreshToken());
        
        if (email.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Token de atualização inválido ou expirado"));
        }

        User user = (User) userService.findByEmail(email); // Assumes userService has this method
        var newToken = tokenService.generateToken(user);
        var newRefreshToken = tokenService.generateRefreshToken(user);

        return ResponseEntity.ok(ApiResponse.success("Token renovado com sucesso", new LoginResponseDTO(newToken, newRefreshToken)));
    }

    @PostMapping("/register")
    @Operation(
        summary = "Registrar novo usuario",
        description = "Cria um novo usuario no sistema com dados de registro",
        tags = {"Authentication"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Usuario registrado com sucesso"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Dados invalidos ou usuario ja existe"
        )
    })
    public ResponseEntity<ApiResponse<UserResumoDTO>> register(@RequestBody @Valid UserDTO userDTO) {
        UserResumoDTO createdUser = userService.criarUsuario(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Usuario registrado com sucesso", createdUser));
    }
}

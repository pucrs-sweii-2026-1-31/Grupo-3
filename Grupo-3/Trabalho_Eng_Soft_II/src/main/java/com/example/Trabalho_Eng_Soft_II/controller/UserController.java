package com.example.Trabalho_Eng_Soft_II.controller;

import com.example.Trabalho_Eng_Soft_II.dto.ApiResponse;
import com.example.Trabalho_Eng_Soft_II.dto.UserDTO;
import com.example.Trabalho_Eng_Soft_II.dto.UserResumoDTO;
import com.example.Trabalho_Eng_Soft_II.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "API de gerenciamento de usuários")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    @Operation(
        summary = "Criar novo usuário",
        description = "Cria um novo usuário no sistema com dados de registro",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "201",
            description = "Usuário criado com sucesso",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Dados inválidos ou usuário já existe"
        )
    })
    public ResponseEntity<ApiResponse<UserResumoDTO>> create(
            @RequestBody @Valid UserDTO userDTO) {
        UserResumoDTO createdUser = userService.criarUsuario(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Usuário criado com sucesso", createdUser));
    }

    @GetMapping
    @Operation(
        summary = "Listar todos os usuários",
        description = "Retorna uma página paginada de todos os usuários registrados",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Lista de usuários retornada com sucesso"
        )
    })
    public ResponseEntity<ApiResponse<Page<UserResumoDTO>>> listAll(
            @Parameter(description = "Parâmetros de paginação (page, size, sort)")
            Pageable pageable) {
        Page<UserResumoDTO> users = userService.listarUsuarios(pageable);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar usuário",
        description = "Remove um usuário do sistema pelo seu ID",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Usuário deletado com sucesso"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Usuário não encontrado"
        )
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @Parameter(description = "ID do usuário a ser deletado")
            @PathVariable Long id) {
        userService.deletarUsuario(id);
        return ResponseEntity.ok(ApiResponse.success("Usuário deletado com sucesso", null));
    }
}

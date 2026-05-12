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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@Tag(name = "Users", description = "API de gerenciamento de usuarios")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    @Operation(
        summary = "Criar novo usuario",
        description = "Cria um novo usuario no sistema com dados de registro",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "201",
            description = "Usuario criado com sucesso",
            content = @Content(schema = @Schema(implementation = ApiResponse.class))
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Dados invalidos ou usuario ja existe"
        )
    })
    public ResponseEntity<ApiResponse<UserResumoDTO>> create(@RequestBody @Valid UserDTO userDTO) {
        UserResumoDTO createdUser = userService.criarUsuario(userDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Usuario criado com sucesso", createdUser));
    }

    @GetMapping
    @Operation(
        summary = "Listar todos os usuarios",
        description = "Retorna uma pagina paginada de todos os usuarios registrados",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Lista de usuarios retornada com sucesso"
        )
    })
    public ResponseEntity<ApiResponse<Page<UserResumoDTO>>> listAll(
            @Parameter(description = "Parametros de paginacao (page, size, sort)")
            Pageable pageable) {
        Page<UserResumoDTO> users = userService.listarUsuarios(pageable);
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    @DeleteMapping("/{id}")
    @Operation(
        summary = "Deletar usuario",
        description = "Remove um usuario do sistema pelo seu ID",
        tags = {"Users"}
    )
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Usuario deletado com sucesso"
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "404",
            description = "Usuario nao encontrado"
        )
    })
    public ResponseEntity<ApiResponse<Void>> delete(
            @Parameter(description = "ID do usuario a ser deletado")
            @PathVariable Long id) {
        userService.deletarUsuario(id);
        return ResponseEntity.ok(ApiResponse.success("Usuario deletado com sucesso", null));
    }
}

package com.example.Trabalho_Eng_Soft_II.exception;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler = new GlobalExceptionHandler();

    @Test
    void handleIllegalArgumentException_ShouldReturnBadRequestApiError() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/users");

        ResponseEntity<ApiError> response = handler.handleIllegalArgumentException(
                new DuplicateResourceException("Email ja cadastrado"),
                request
        );

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(400, response.getBody().getStatus());
        assertEquals("Bad Request", response.getBody().getError());
        assertEquals("Email ja cadastrado", response.getBody().getMessage());
        assertEquals("/api/users", response.getBody().getPath());
    }

    @Test
    void handleResourceNotFoundException_ShouldReturnNotFoundApiError() {
        MockHttpServletRequest request = new MockHttpServletRequest("DELETE", "/api/users/99");

        ResponseEntity<ApiError> response = handler.handleResourceNotFoundException(
                new ResourceNotFoundException("Usuario com o id nao cadastrado"),
                request
        );

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(404, response.getBody().getStatus());
        assertEquals("Not Found", response.getBody().getError());
        assertEquals("Usuario com o id nao cadastrado", response.getBody().getMessage());
        assertEquals("/api/users/99", response.getBody().getPath());
    }

    @Test
    void handleAuthenticationException_ShouldReturnUnauthorizedApiError() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/auth/login");

        ResponseEntity<ApiError> response = handler.handleAuthenticationException(
                new BadCredentialsException("Bad credentials"),
                request
        );

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(401, response.getBody().getStatus());
        assertEquals("Unauthorized", response.getBody().getError());
        assertEquals("Credenciais invalidas", response.getBody().getMessage());
        assertEquals("/api/auth/login", response.getBody().getPath());
    }

    @Test
    void handleValidationExceptions_ShouldReturnBadRequestWithValidationErrors() {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/api/users");

        MethodArgumentNotValidException ex = mock(MethodArgumentNotValidException.class);
        BindingResult bindingResult = mock(BindingResult.class);
        FieldError fieldError = new FieldError("userDTO", "email", "must be a well-formed email address");

        when(ex.getBindingResult()).thenReturn(bindingResult);
        when(bindingResult.getAllErrors()).thenReturn(List.of(fieldError));

        ResponseEntity<ApiError> response = handler.handleValidationExceptions(ex, request);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(400, response.getBody().getStatus());
        assertEquals("Bad Request", response.getBody().getError());
        assertNotNull(response.getBody().getValidationErrors());
        assertEquals(1, response.getBody().getValidationErrors().size());
        assertEquals("email", response.getBody().getValidationErrors().get(0).getField());
        assertEquals("/api/users", response.getBody().getPath());
    }

    @Test
    void handleGenericException_ShouldReturn500InternalServerError() {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/api/users");

        ResponseEntity<ApiError> response = handler.handleGenericException(
                new RuntimeException("Unexpected error"),
                request
        );

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(500, response.getBody().getStatus());
        assertEquals("Internal Server Error", response.getBody().getError());
        assertEquals("Ocorreu um erro interno no servidor", response.getBody().getMessage());
        assertNull(response.getBody().getValidationErrors());
        assertEquals("/api/users", response.getBody().getPath());
    }
}

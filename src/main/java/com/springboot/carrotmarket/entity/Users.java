package com.springboot.carrotmarket.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotNull(message = "이메일을 입력하세요.") // Null을 허용하지 않음
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$", message = "유효한 이메일 주소를 입력하세요.")
    private String email;

    private String password;
}

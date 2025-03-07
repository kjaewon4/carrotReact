package com.springboot.carrotmarket.controller;

import com.springboot.carrotmarket.entity.Users;
import com.springboot.carrotmarket.repository.UsersRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

//@CrossOrigin
@RestController
public class UsersController {

    @Autowired
    private final UsersRepository userRepository;

    public UsersController(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody Users user, HttpSession session) {

        Optional<Users> inputUser =  userRepository.findByEmail(user.getEmail());

        if(inputUser.isPresent()) {
            if(inputUser.get().getPassword().equals(user.getPassword())) {
                // 로그인 성공 시 세션에 사용자 정보 저장
                session.setAttribute("user", inputUser.get());
                System.out.println("Login successful");
                return "Login successful";
            } else {
                return "Incorrect password";

            }
        } else {
            return "User not found";
        }

    }

//    @CrossOrigin
    @PostMapping("/sign")
    public String sign(@RequestBody Users user) {
        Users saveduser = new Users();
        saveduser.setEmail(user.getEmail());
        saveduser.setPassword(user.getPassword());
        userRepository.save(saveduser);

        return "회원가입 성공"; // 회원가입 성공 메시지 반환
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();  // 세션 무효화
        return "Logged out successfully";
    }

    @GetMapping("/checkSession")
    public String checkSession(HttpSession session) {
        // 세션에서 'user' 속성 가져오기
        Users loggedInUser = (Users) session.getAttribute("user");

        if (loggedInUser != null) {
            // 세션에 'user' 정보가 있으면 로그인된 사용자 정보를 반환
            System.out.println("Logged in as: " + loggedInUser.getEmail());

            return "Logged in as: " + loggedInUser.getEmail();
        } else {
            // 세션에 'user' 정보가 없으면 로그인되지 않은 상태
            System.out.println("No user is logged in.");
            return "No user is logged in.";
        }
    }

    @GetMapping("/mypage")
    public String mypage(HttpSession session) {
        // 세션에서 사용자 정보 가져오기
        Users loggedInUser = (Users) session.getAttribute("user");

        if (loggedInUser != null) {
            // 로그인된 사용자만 접근 가능
            return "Welcome to the protected page, " + loggedInUser.getEmail();
        } else {
            return "You must be logged in to access this page. Please login first.";
        }
    }


}

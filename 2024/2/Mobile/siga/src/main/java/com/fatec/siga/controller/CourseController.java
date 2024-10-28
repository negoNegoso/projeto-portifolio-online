package com.fatec.siga.controller;

import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CourseController {

    @GetMapping("/hello")
    public String index() {
        return "Hello World!";
    }

//    @GetMapping("/digitacao")
//    public ResponseEntity<Student>
}

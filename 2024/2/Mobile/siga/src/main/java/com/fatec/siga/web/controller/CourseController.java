package com.fatec.siga.web.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subjects")
public class CourseController {

    @GetMapping("/hello")
    public String index() {
        return "Hello World!";
    }

    // @GetMapping("/")


    // @PostMapping("/")

    // @PutMapping("/")

    // @DeleteMapping("/")

}

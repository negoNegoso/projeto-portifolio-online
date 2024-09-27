package com.fatec.siga.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Incorrect classroom id.")
public class ClassroomNotFountException extends RuntimeException{

}
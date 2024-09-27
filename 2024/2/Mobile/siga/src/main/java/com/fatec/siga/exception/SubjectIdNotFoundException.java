package com.fatec.siga.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "Subject with this id not found!")
public class SubjectIdNotFoundException extends RuntimeException {
}

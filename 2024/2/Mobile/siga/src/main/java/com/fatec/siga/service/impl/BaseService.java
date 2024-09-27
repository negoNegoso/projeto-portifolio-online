package com.fatec.siga.service.impl;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public abstract class BaseService {

    protected ModelMapper modelMapper;

    protected BaseService(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}

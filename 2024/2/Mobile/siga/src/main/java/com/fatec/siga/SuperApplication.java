package com.fatec.siga;

import com.fatec.siga.model.service.SubjectServiceModel;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class SuperApplication {

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
	@Bean
	public SubjectServiceModel SubjectServiceModel(){
		return new SubjectServiceModel();
	}
	public static void main(String[] args) {
		SpringApplication.run(SuperApplication.class, args);
	}


}

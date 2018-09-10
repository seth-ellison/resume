package com.theinory.resume.controllers;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("home")
@Scope("request")
public class HomeController {
	
	@RequestMapping(value="/")
	public String home() {
		return "home";
	}
}

package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.HibernateUtil;
import org.hibernate.HibernateError;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
public class MainController {

    @GetMapping("/")
    public String index() {
        return "Main Page";
    }



}

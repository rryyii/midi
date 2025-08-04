package com.yiran.mdi.controller;

import com.yiran.mdi.model.HibernateUtil;
import com.yiran.mdi.model.User;
import jakarta.persistence.TypedQuery;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * REST controller for User POST, DELETE, UPDATE, and GET.
 * @author rryyii
 */
@RestController
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    public List<User> getUsers() {
        logger.debug("Beginning fetching of all users.");
        try (Session session = HibernateUtil.buildSessionFactory().openSession()){
            TypedQuery<User> query = session.createQuery("from User", User.class);
            return query.getResultList();
        } catch (HibernateException hbe) {
            logger.error(hbe.getMessage());
            return null;
        }
    }

    @PostMapping("/user")
    public boolean createUser(@RequestBody User user) {
        logger.debug("Beginning creating a new user.");
        try (Session session = HibernateUtil.buildSessionFactory().openSession()) {
            session.beginTransaction();
            session.persist(user);
            session.getTransaction().commit();
            return true;
        } catch (HibernateException hbe) {
            logger.error(hbe.getMessage());
            return false;
        }
    }
}

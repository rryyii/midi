package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.HibernateUtil;
import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
public class GameController {

    public static final Logger logger = Logger.getLogger("com.yiran.mdi");

    @GetMapping("/games")
    public List<Game> getGames() {
         try (Session session = HibernateUtil.buildSessionFactory().openSession()) {
             Transaction transaction = session.beginTransaction();
             Query query = null;
             List<Game> list = session.createQuery("from Game", com.yiran.mdi.model.Game.class).getResultList();
             transaction.commit();
             for (Game game : list) {
                 System.out.println(game);
             }
             return list;
         } catch (HibernateException hbe) {
             logger.log(Level.SEVERE, hbe.getMessage());
             return null;
         }
    }

    @PostMapping("/dmi/add_game")
    public String addGame() {
        return "Add";
    }

    @DeleteMapping("/dmi/rm_game")
    public String removeGame() {
        return "Delete";
    }
}

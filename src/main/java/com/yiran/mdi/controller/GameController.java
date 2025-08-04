package com.yiran.mdi.controller;

import com.yiran.mdi.model.Game;
import com.yiran.mdi.model.HibernateUtil;
import jakarta.persistence.TypedQuery;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Game table including POST, DELETE, and GET.
 * @author rryyii
 */
@RestController
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);

    @GetMapping("/games")
    public List<Game> getGames() {
        logger.debug("Beginning get request for all games.");
         try (Session session = HibernateUtil.buildSessionFactory().openSession()) {
             String hql = "SELECT g from Game g";
             TypedQuery<Game> query = session.createQuery(hql, Game.class);
             return query.getResultList();
         } catch (HibernateException hbe) {
             logger.error(hbe.getMessage());
             return null;
         }
    }

    @PostMapping("/add_game")
    public boolean addGame(@RequestBody Game newGame) {
        logger.debug("Beginning add game request.");
        try (Session session = HibernateUtil.buildSessionFactory().openSession()) {
            session.beginTransaction();
            session.persist(newGame);
            session.getTransaction().commit();
            return true;
        } catch (HibernateException hbe) {
            logger.error(hbe.getMessage());
            return false;
        }
    }

    @DeleteMapping("/rm_game")
    public boolean removeGame(@RequestBody Game game) {
        logger.debug("Beginning removing a game from database.");
        try (Session session = HibernateUtil.buildSessionFactory().openSession()){
            session.beginTransaction();
            session.remove(game);
            session.getTransaction().commit();
            return true;
        } catch (HibernateException hbe) {
            logger.error(hbe.getMessage());
            return false;
        }
    }
}

package com.yiran.mdi.model;

import org.hibernate.HibernateError;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

/**
 * Provides session creation and retrieval.
 * @author rryyii
 */
public class HibernateUtil {
    public static SessionFactory factory = buildSessionFactory();

    public static SessionFactory buildSessionFactory() {
        try {
            return new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
        } catch (HibernateError hbe) {
            System.err.println("Hibernate Error: " + hbe.getMessage());
            return null;
        }
    }

    public static SessionFactory getSessionFactory() {
        return factory;
    }

    public static void shutdown() {
        factory.close();
    }
}

package com.yiran.mdi.service;

import org.hibernate.HibernateError;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Provides session creation and retrieval.
 *
 * @author rryyii
 */
public class HibernateHelper {

    private static final Logger logger = LoggerFactory.getLogger(HibernateHelper.class);
    public static SessionFactory factory = buildSessionFactory();

    public static SessionFactory buildSessionFactory() {
        try {
            logger.info("Successfully built session factory.");
            return new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
        } catch (HibernateError hbe) {
            logger.error("Hibernate Error: {}", hbe.getMessage());
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

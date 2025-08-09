package com.yiran.mdi.repository;

import com.yiran.mdi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for users table.
 *
 * @author rryyii
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}

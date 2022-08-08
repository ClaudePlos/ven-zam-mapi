package pl.kskowronski.data.service;

import org.springframework.data.jpa.repository.Query;
import pl.kskowronski.data.entity.User;

import java.math.BigDecimal;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findByUsername(String username);

    @Query("select max(u.id) from User u")
    BigDecimal getLastId();

}
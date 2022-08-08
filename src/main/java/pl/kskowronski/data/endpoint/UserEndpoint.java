package pl.kskowronski.data.endpoint;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import pl.kskowronski.data.Role;
import pl.kskowronski.data.entity.User;
import pl.kskowronski.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Optional<User> getAuthenticatedUser() {
        Optional<User> user = authenticatedUser.get();
        if ( user.get().getUsername().equals("AdminMAPI")){
            user.get().setRoles(Stream.of(Role.USER, Role.ADMIN).collect(Collectors.toSet()));
        } else {
            user.get().setRoles(Collections.singleton(Role.USER));
        }
        return user;
    }

    public @Nonnull List<@Nonnull User> findAll() {
      var users = authenticatedUser.findAll();
      return users;
    }

    public User addNewUser(User user) {

        if (user.getId() == null){
            user.setId(authenticatedUser.getLastId().add(BigDecimal.ONE));
        }

        user.setHashedPassword(passwordEncoder.encode(user.getHashedPassword()));

        User userRet = authenticatedUser.save(user);
        return userRet;
    }
}

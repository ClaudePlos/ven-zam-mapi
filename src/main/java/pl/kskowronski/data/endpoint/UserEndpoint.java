package pl.kskowronski.data.endpoint;

import pl.kskowronski.data.Role;
import pl.kskowronski.data.entity.User;
import pl.kskowronski.security.AuthenticatedUser;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;

import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@AnonymousAllowed
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        Optional<User> user = authenticatedUser.get();
        if ( user.get().getUsername().equals("AdminMAPI")){
            user.get().setRoles(Stream.of(Role.USER, Role.ADMIN).collect(Collectors.toSet()));
        } else {
            user.get().setRoles(Collections.singleton(Role.USER));
        }
        return user;
    }
}

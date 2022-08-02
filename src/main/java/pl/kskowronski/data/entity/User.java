package pl.kskowronski.data.entity;


import pl.kskowronski.data.Role;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "nap_users")
public class User {

    @Id
    @Column(name="ID")
    private BigDecimal id;

    @Column(name="USERNAME")
    private String username;

    @Column(name="NAME")
    private String name;

    @Column(name="HASHEDPASSWORD")
    private String hashedPassword;

    @Column(name="OPERATOR_ID")
    private BigDecimal operatorId;

    @ElementCollection(fetch = FetchType.EAGER)
    @Transient
    private Set<Role> roles;

    public User() {
    }

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public BigDecimal getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(BigDecimal operatorId) {
        this.operatorId = operatorId;
    }
}

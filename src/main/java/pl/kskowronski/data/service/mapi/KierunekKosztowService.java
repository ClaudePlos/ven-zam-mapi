package pl.kskowronski.data.service.mapi;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;

@Service
public class KierunekKosztowService {

    @PersistenceContext
    private EntityManager em;

    @Transactional
    public void deleteSetting(BigDecimal userId, BigDecimal kkId) {
        this.em.createNativeQuery("delete from NAP_USERS_KK where user_id = " + userId + " and kk_id = " + kkId)
                .executeUpdate();
    }

    @Transactional
    public void saveSetting(BigDecimal userId, BigDecimal kkId) {
        this.em.createNativeQuery("insert into NAP_USERS_KK(user_id, kk_id) values (" + userId + ", " + kkId + ")"  )
                .executeUpdate();
    }


}

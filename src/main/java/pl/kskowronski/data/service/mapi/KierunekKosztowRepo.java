package pl.kskowronski.data.service.mapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.kskowronski.data.entity.mapi.KierunekKosztowVO;

import java.math.BigDecimal;
import java.util.List;

public interface KierunekKosztowRepo extends JpaRepository<KierunekKosztowVO, BigDecimal> {

    @Query(value = "SELECT * from s_kierunki_kosztow where ID_KIERUNEK_KOSZTOW in (SELECT kk_Id FROM NAP_USERS_KK  where user_Id = ?1) order by KIERUNEK_KOSZTOW", nativeQuery = true)
    List<KierunekKosztowVO> findAllUserKK(BigDecimal userId);

}

package pl.kskowronski.data.service.mapi;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kskowronski.data.entity.mapi.KierunekKosztowVO;

import java.math.BigDecimal;

public interface KierunekKosztowRepo extends JpaRepository<KierunekKosztowVO, BigDecimal> {
}

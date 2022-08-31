package pl.kskowronski.data.service.mapi.nap;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.kskowronski.data.entity.mapi.nap.NapZamBlockadeVO;

import java.math.BigDecimal;

public interface NapZamBlockadeRepo extends JpaRepository<NapZamBlockadeVO, BigDecimal> {

}


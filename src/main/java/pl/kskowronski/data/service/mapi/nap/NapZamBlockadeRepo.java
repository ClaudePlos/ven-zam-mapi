package pl.kskowronski.data.service.mapi.nap;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.kskowronski.data.entity.mapi.nap.NapZamBlockadeVO;

import java.math.BigDecimal;
import java.util.List;

public interface NapZamBlockadeRepo extends JpaRepository<NapZamBlockadeVO, BigDecimal> {

    @Query("select b from NapZamBlockadeVO b where b.blkKkId = :idKK")
    List<NapZamBlockadeVO> getBlockadesForKK(@Param("idKK") BigDecimal idKK);

}


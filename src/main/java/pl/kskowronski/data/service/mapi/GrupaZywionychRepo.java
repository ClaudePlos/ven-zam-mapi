package pl.kskowronski.data.service.mapi;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.kskowronski.data.entity.mapi.GrupaZywionychVO;

import java.math.BigDecimal;
import java.util.List;

public interface GrupaZywionychRepo extends JpaRepository<GrupaZywionychVO, BigDecimal> {

    @Query("select g from GrupaZywionychVO g where g.aktywne = 1 and g.idKierunekKosztow = :idKK")
    List<GrupaZywionychVO> getAllGzForKkId( @Param("idKK") BigDecimal idKK);

}

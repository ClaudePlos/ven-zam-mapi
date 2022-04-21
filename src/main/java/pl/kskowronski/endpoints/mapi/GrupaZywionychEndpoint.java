package pl.kskowronski.endpoints.mapi;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.GrupaZywionychVO;
import pl.kskowronski.data.service.mapi.GrupaZywionychRepo;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class GrupaZywionychEndpoint {

    private GrupaZywionychRepo grupaZywionychRepo;

    public GrupaZywionychEndpoint(GrupaZywionychRepo grupaZywionychRepo) {
        this.grupaZywionychRepo = grupaZywionychRepo;
    }

    public @Nonnull List<@Nonnull GrupaZywionychVO> getAllGzForKkId( BigDecimal idKK) {
        List<GrupaZywionychVO> gzList = grupaZywionychRepo.getAllGzForKkId(idKK);
        return gzList;
    }
}

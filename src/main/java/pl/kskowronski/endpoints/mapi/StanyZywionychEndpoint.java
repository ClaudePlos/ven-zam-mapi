package pl.kskowronski.endpoints.mapi;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.StanZywionychNaDzienDTO;
import pl.kskowronski.data.service.mapi.StanyZywionychService;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class StanyZywionychEndpoint {

    StanyZywionychService stanyZywionychService;

    public StanyZywionychEndpoint(StanyZywionychService stanyZywionychService) {
        this.stanyZywionychService = stanyZywionychService;
    }

    public @Nonnull List<@Nonnull StanZywionychNaDzienDTO> pobierzStanZywionychWdniuDlaGZ(String naDzien, BigDecimal idGZ, String sortType){
        return stanyZywionychService.pobierzStanZywionychWdniuDlaGrupyZywionych(naDzien, idGZ, sortType);
    }

}

package pl.kskowronski.endpoints.mapi;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.MessageDTO;
import pl.kskowronski.data.entity.mapi.StanZywionychNaDzienDTO;
import pl.kskowronski.data.service.mapi.StanyZywionychService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

    public @Nonnull String zapiszStanZyw(String naDzien, BigDecimal idGZ, String sortType
            , BigDecimal idKK, String czyKorekta, BigDecimal idOperator, ArrayList<StanZywionychNaDzienDTO> stanyZywionychNaDzien){

        MessageDTO ret = stanyZywionychService.zapiszStanZywionychWDniu2(
                stanyZywionychNaDzien.stream().filter( document -> document.getDataChanged().equals(true)).collect(Collectors.toList())
                , idKK, czyKorekta, idOperator );

        return ret.getStatus() + " " + ret.getInfo();
    }

}

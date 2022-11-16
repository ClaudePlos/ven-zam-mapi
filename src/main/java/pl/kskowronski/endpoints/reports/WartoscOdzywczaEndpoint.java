package pl.kskowronski.endpoints.reports;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.JadlospisViewVO;
import pl.kskowronski.data.entity.mapi.reports.ColumnNameWskaznikiOdzywcze;
import pl.kskowronski.data.service.mapi.MapiService;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class WartoscOdzywczaEndpoint {

    private MapiService mapiService;

    public WartoscOdzywczaEndpoint(MapiService mapiService) {
        this.mapiService = mapiService;
    }

    public @Nonnull List<@Nonnull ColumnNameWskaznikiOdzywcze> getJadlospisColumnNames() throws Exception {
        List<ColumnNameWskaznikiOdzywcze> lList = mapiService.getJadlospisColumnNames();
        return lList;
    }

    public @Nonnull List<@Nonnull JadlospisViewVO> getJadlospis(BigDecimal idDietaBD, String dObr) throws Exception {
        List<JadlospisViewVO> lList = mapiService.getJadlospis(idDietaBD, dObr);
        return lList;
    }

}

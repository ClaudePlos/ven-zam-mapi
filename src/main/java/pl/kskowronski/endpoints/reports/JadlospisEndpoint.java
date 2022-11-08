package pl.kskowronski.endpoints.reports;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.JadlospisViewVO;
import pl.kskowronski.data.service.mapi.MapiService;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class JadlospisEndpoint {

    private MapiService mapiService;

    public JadlospisEndpoint(MapiService mapiService) {
        this.mapiService = mapiService;
    }

    public @Nonnull List<@Nonnull JadlospisViewVO> getColumnData(Long idDietaBD, String dObr) throws Exception {
        List<JadlospisViewVO> lList = mapiService.getJadlospis(idDietaBD, dObr);
        return lList;
    }

}

package pl.kskowronski.endpoints.mapi;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.nap.NapZamBlockadeVO;
import pl.kskowronski.data.service.mapi.nap.NapZamBlockadeRepo;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class NapZamBlockadeEndpoint {

    private NapZamBlockadeRepo napZamBlockadeRepo;

    public NapZamBlockadeEndpoint(NapZamBlockadeRepo napZamBlockadeRepo) {
        this.napZamBlockadeRepo = napZamBlockadeRepo;
    }

    public @Nonnull List<@Nonnull NapZamBlockadeVO> getBlockadesForKK(BigDecimal idKK) {
        List<NapZamBlockadeVO> bList = napZamBlockadeRepo.getBlockadesForKK(idKK);
        return bList;
    }

    public void save(NapZamBlockadeVO napZamBlockade) {
        napZamBlockadeRepo.save(napZamBlockade);
    }

}

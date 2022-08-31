package pl.kskowronski.endpoints.mapi;


import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import pl.kskowronski.data.entity.mapi.nap.NapZamBlockadeVO;
import pl.kskowronski.data.service.mapi.nap.NapZamBlockadeRepo;

@Endpoint
@AnonymousAllowed
public class NapZamBlockadeEndpoint {

    private NapZamBlockadeRepo napZamBlockadeRepo;

    public NapZamBlockadeEndpoint(NapZamBlockadeRepo napZamBlockadeRepo) {
        this.napZamBlockadeRepo = napZamBlockadeRepo;
    }

    public void save(NapZamBlockadeVO napZamBlockade) {
        napZamBlockadeRepo.save(napZamBlockade);
    }

}

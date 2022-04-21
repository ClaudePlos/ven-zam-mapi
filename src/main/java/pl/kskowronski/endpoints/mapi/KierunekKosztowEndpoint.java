package pl.kskowronski.endpoints.mapi;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.KierunekKosztowVO;
import pl.kskowronski.data.service.mapi.KierunekKosztowRepo;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class KierunekKosztowEndpoint {

    private KierunekKosztowRepo kierunekKosztowRepo;

    public KierunekKosztowEndpoint(KierunekKosztowRepo kierunekKosztowRepo) {
        this.kierunekKosztowRepo = kierunekKosztowRepo;
    }

    public @Nonnull List<@Nonnull KierunekKosztowVO> getAllKK() {
        List<KierunekKosztowVO> allKK = kierunekKosztowRepo.findAll();
        return allKK;
    }

}

package pl.kskowronski.endpoints.mapi;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import pl.kskowronski.data.entity.mapi.KierunekKosztowVO;
import pl.kskowronski.data.service.mapi.KierunekKosztowRepo;
import pl.kskowronski.data.service.mapi.KierunekKosztowService;

import java.math.BigDecimal;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class KierunekKosztowEndpoint {

    private KierunekKosztowRepo kierunekKosztowRepo;
    private KierunekKosztowService kierunekKosztowService;

    public KierunekKosztowEndpoint(KierunekKosztowRepo kierunekKosztowRepo, KierunekKosztowService kierunekKosztowService) {
        this.kierunekKosztowRepo = kierunekKosztowRepo;
        this.kierunekKosztowService = kierunekKosztowService;
    }

    public @Nonnull List<@Nonnull KierunekKosztowVO> getAllKK() {
        List<KierunekKosztowVO> allKK = kierunekKosztowRepo.findAll(Sort.by(Sort.Direction.ASC, "kierunekKosztowNazwa"));
        return allKK;
    }

    public @Nonnull List<@Nonnull KierunekKosztowVO> findAllUserKK(BigDecimal userId){
        return kierunekKosztowRepo.findAllUserKK(userId);
    }

    public void deleteSetting(BigDecimal userId, BigDecimal casId) {
        kierunekKosztowService.deleteSetting(userId, casId);
    }

    public void saveSetting(BigDecimal userId, BigDecimal casId) {
        kierunekKosztowService.saveSetting(userId, casId);
    }




}

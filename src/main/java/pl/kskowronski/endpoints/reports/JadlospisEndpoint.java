package pl.kskowronski.endpoints.reports;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import pl.kskowronski.data.entity.mapi.JadlospisViewVO;
import pl.kskowronski.data.entity.mapi.reports.*;
import pl.kskowronski.data.service.mapi.MapiService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class JadlospisEndpoint {

    private MapiService mapiService;

    public JadlospisEndpoint(MapiService mapiService) {
        this.mapiService = mapiService;
    }

    public @Nonnull List<@Nonnull JadlospisDlaDietyNaDzienDTO> getJadlospisDlaDietyNaDzien(String dietName, String dObr) throws Exception {
        List<JadlospisDlaDietyNaDzienDTO> lList = mapiService.getJadlospisDlaDietyNaDzien(dietName, dObr);
        return lList;
    }

    public @Nonnull List<@Nonnull JadlospisSkladnikiViewVO> getInfAboutJadlospisForDiet(BigDecimal dietId, String forDay) throws Exception {

        List<JadlospisSkladnikiViewVO> jsL = new ArrayList<>();
        List<JadlospisSkladnikiViewVO> jsL2 = new ArrayList<>();


        List<Object> jList = mapiService.getIdWartoscOdzywczaForDiet(dietId, forDay);

        for (int i = 0; i < jList.size(); i++) {
            List<JadlospisSkladnikiViewVO> jsList = mapiService.getInfAboutJadlospisForDiet( new BigDecimal(jList.get(i).toString()) );

            for ( JadlospisSkladnikiViewVO js : jsList ){
                List<AsortymentyDaniaDTO> listAsortDania = mapiService.getAsortymentForDish(js.getIdJadlospisSkladnik());
                js.setListAsortymentyDania(listAsortDania);

                List<AsortymentyDaniaSkladnikiDTO> listAsortDaniaSkladCaly = new ArrayList<>();
                for( AsortymentyDaniaDTO lad : listAsortDania){

                    List<AsortymentyDaniaSkladnikiDTO> listAsortDaniaSklad = mapiService.getAsortymentyDaniaSklad(lad.getIdAsortyment());
                    if(listAsortDaniaSklad.size() != 0){
                        for (AsortymentyDaniaSkladnikiDTO a : listAsortDaniaSklad){
                            listAsortDaniaSkladCaly.add(a);
                        }
                    }
                    js.setListAsortymentyDaniaSkladniki(listAsortDaniaSkladCaly);
                }
                jsL.add(js);
            }
        }

        return jsL;
    }

    public @Nonnull List<@Nonnull AlergenyDTO> getAlergeny() throws Exception {
        List<AlergenyDTO> aList = mapiService.getAlergeny();
        return aList;
    }

}

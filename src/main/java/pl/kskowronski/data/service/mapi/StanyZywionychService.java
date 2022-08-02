package pl.kskowronski.data.service.mapi;

import org.hibernate.JDBCException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.kskowronski.data.entity.mapi.MessageDTO;
import pl.kskowronski.data.entity.mapi.StanZywionychNaDzienDTO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.sql.Timestamp;

@Service
public class StanyZywionychService {

    @PersistenceContext
    private EntityManager em;

    public List<StanZywionychNaDzienDTO> pobierzStanZywionychWdniuDlaGrupyZywionych(String naDzien, BigDecimal idGZ, String sortType)
    {
        List<Object[]> stanyOb = null;
        List<StanZywionychNaDzienDTO> stanZywionych = new ArrayList<>();

        try {
            // TODO - zobacz jak Piotrek robi duĹĽe zapytania
            Query query =  em.createNativeQuery("select d_obr, id_grupa_zywionych, id_dieta, \n" +
                    "dieta_nazwa, SP_il, DSP_il, OP_il, PP_il, KP_il, PNP_il, \n" +
                    "SK1_il, DSK1_il, OK1_il, PK1_il, KK1_il, PNK1_il, lp, uwagi  from \n" +
                    "(\n" +
                    "select sz.d_obr, sz.id_grupa_zywionych, d.id_dieta, \n" +
                    "dieta_kod, dieta_nazwa, grupa_zywionych, posilek||' '||typ_stan_zywionych posilek, szp.ilosc, d.lp lp, sz.uwagi uwagi  \n" +
                    "--*\n" +
                    "from STANY_ZYWIONYCH sz, grupy_zywionych gz, diety d, Stany_zywionych_posilki szp, s_posilki p, s_typy_stanu_zywionych stsz, diety_grupy_zywionych dgz, diety_kuchnie dk\n" +
                    "where sz.id_grupa_zywionych = gz.id_grupa_zywionych\n" +
                    "and sz.id_dieta = d.id_dieta\n" +
                    "and szp.id_stan_zywionych = sz.ID_STAN_ZYWIONYCH\n" +
                    "and p.id_posilek = szp.id_posilek\n" +
                    "and stsz.id_typ_stan_zywionych = szp.id_typ_stan_zywionych\n" +
                    "and sz.d_obr = to_Date('" + naDzien + "','YYYY-MM-DD')\n" +
                    "and gz.id_grupa_zywionych = " + idGZ + "\n" +
                    "and dgz.ID_GRUPA_ZYWIONYCH = gz.ID_GRUPA_ZYWIONYCH \n" +
                    "and dgz.ID_DIETA = d.ID_DIETA \n" +
                    "and dk.ID_DIETA = d.ID_DIETA \n" +
                    "and dk.AKTYWNE = 1 \n" +
                    //"and dgz.AKTYWNE = 1 \n" +
                    "and dk.ID_KUCHNIA = gz.ID_KUCHNIA \n" +
                    ")\n" +
                    "PIVOT( \n" +
                    "        SUM(ilosc) il \n" +
                    "	   FOR posilek \n" +
                    "	   IN ('Obiad korekta I' as OK1,'Obiad planowany' as OP,'Kolacja korekta I' as KK1,'Kolacja planowany' as KP,'Śniadanie korekta I' as SK1,'Śniadanie planowany' as SP, \n" +
                    "      '2. śniadanie korekta I' as DSK1, '2. śniadanie planowany' as DSP, 'Podwieczorek korekta I' as PK1, 'Podwieczorek planowany' as PP, 'Posiłek nocny korekta I' as PNK1, 'Posiłek nocny planowany' as PNP)\n" +
                    "	   ) order by " + sortType );

            stanyOb =  query.getResultList();

            int i = 1;

            for ( Object[] s : stanyOb)
            {
                StanZywionychNaDzienDTO stan
                        = new StanZywionychNaDzienDTO( (Timestamp) s[0]
                        , (BigDecimal) s[1]
                        , (BigDecimal) s[2]
                        , (String) s[3]
                        , (BigDecimal) s[4]
                        , (BigDecimal) s[5]
                        , (BigDecimal) s[6]
                        , (BigDecimal) s[7]
                        , (BigDecimal) s[8]
                        , (BigDecimal) s[9]
                        , (BigDecimal) s[10]
                        , (BigDecimal) s[11]
                        , (BigDecimal) s[12]
                        , (BigDecimal) s[13]
                        , (BigDecimal) s[14]
                        , (BigDecimal) s[15]
                        , new BigDecimal( String.valueOf(i) )
                        , (String) s[17]  // uwagi
                );

                if ( stan.getSniadaniePlanIl() == null ) stan.setsVisible(Boolean.FALSE);
                if ( stan.getDrugieSniadaniePlanIl() == null ) stan.setS2Visible(Boolean.FALSE);
                if ( stan.getObiadPlanIl() == null ) stan.setoVisible(Boolean.FALSE);
                if ( stan.getPodwieczorekPlanIl() == null ) stan.setpVisible(Boolean.FALSE);
                if ( stan.getKolacjaPlanIl() == null ) stan.setkVisible(Boolean.FALSE);
                if ( stan.getPosilekNocnyPlanIl() == null ) stan.setPnVisible(Boolean.FALSE);

                if ( stan.getSniadanieKorIl() == null ) stan.setKsVisible(Boolean.FALSE);
                if ( stan.getDrugieSniadanieKorIl() == null ) stan.setKs2Visible(Boolean.FALSE);
                if ( stan.getObiadKorIl() == null ) stan.setKoVisible(Boolean.FALSE);
                if ( stan.getPodwieczorekKorIl() == null ) stan.setKpVisible(Boolean.FALSE);
                if ( stan.getKolacjaKorIl() == null ) stan.setKkVisible(Boolean.FALSE);
                if ( stan.getPosilekNocnyKorIl() == null ) stan.setKpnVisible(Boolean.FALSE);


                stanZywionych.add(stan);

                i++;
            }

        } catch ( Exception e) {
            StanZywionychNaDzienDTO m = new StanZywionychNaDzienDTO();
            m.setMessage(e.toString());
            stanZywionych = new ArrayList<>();
            stanZywionych.add(m);
            return stanZywionych;
        }

        return stanZywionych;

    }


    public MessageDTO zapiszStanZywionychWDniu2(List<StanZywionychNaDzienDTO> stany, BigDecimal idKK, String czyKorekta, BigDecimal idOperator )
    {
        Session session = em.unwrap( Session.class );
        int ileWierszy = stany.size();
        int i = 1;
        String retInfo = "\nZapisano: \n";
        String retAkt = "";

        for( StanZywionychNaDzienDTO s : stany )
        {
            try {

                if ( s.getDataChanged() ) {

                    session.doReturningWork(
                            connection -> {
                                try (CallableStatement function = connection
                                        .prepareCall(
                                                "{ ? = call nap_hl7_tools.wgraj_stan_zyw_w_dniu_plan3(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) }" )) {
                                    function.registerOutParameter( 1, Types.INTEGER );
                                    function.setBigDecimal( 2, idKK);
                                    function.setBigDecimal( 3, s.getIdGrupaZywionych() );
                                    function.setString( 4, s.getDietaNazwa() );
                                    function.setTimestamp( 5, s.getdObr() );

                                    function.setBigDecimal( 6, s.getSniadaniePlanIl());
                                    function.setBigDecimal( 7, s.getDrugieSniadaniePlanIl());
                                    function.setBigDecimal( 8, s.getObiadPlanIl() );
                                    function.setBigDecimal( 9, s.getPodwieczorekPlanIl() );
                                    function.setBigDecimal( 10, s.getKolacjaPlanIl() );
                                    function.setBigDecimal( 11, s.getPosilekNocnyPlanIl() );

                                    function.setBigDecimal( 12, s.getSniadanieKorIl() );
                                    function.setBigDecimal( 13, s.getDrugieSniadanieKorIl());
                                    function.setBigDecimal( 14, s.getObiadKorIl() );
                                    function.setBigDecimal( 15, s.getPodwieczorekKorIl() );
                                    function.setBigDecimal( 16, s.getKolacjaKorIl() );
                                    function.setBigDecimal( 17, s.getPosilekNocnyKorIl() );

                                    function.setString( 18, s.getSzUwagi() );
                                    function.setBigDecimal( 19, idOperator );
                                    function.setString( 20, czyKorekta );


                                    function.execute();
                                    return function.getInt( 1 );
                                }
                            });

//                    em.createNativeQuery("begin "
//                            + "nap_hl7_tools.wgraj_stan_zyw_w_dniu_plan2("
//                            + "'" + idKK + "'"
//                            + ",'" + s.getIdGrupaZywionych() + "'"
//                            + ",'" + s.getDietaNazwa() + "'"
//                            + ",to_date('" + s.getdObr().toString().substring(0, 10) + "','YYYY-MM-DD')"
//
//                            + "," + s.getSniadaniePlanIl()
//                            + "," + s.getDrugieSniadaniePlanIl()
//                            + "," + s.getObiadPlanIl()
//                            + "," + s.getPodwieczorekPlanIl()
//                            + "," + s.getKolacjaPlanIl()
//                            + "," + s.getPosilekNocnyPlanIl()
//
//                            + "," + s.getSniadanieKorIl()
//                            + "," + s.getDrugieSniadanieKorIl()
//                            + "," + s.getObiadKorIl()
//                            + "," + s.getPodwieczorekKorIl()
//                            + "," + s.getKolacjaKorIl()
//                            + "," + s.getPosilekNocnyKorIl()
//
//                            + ",'" + s.getSzUwagi() + "'"
//
//                            + "," + idOperator
//                            + ",'" + czyKorekta + "'"
//                            + ");"
//                            + " end;").executeUpdate();

                    if ( i == ileWierszy ) {
                       retAkt =  aktualizujStanZywionychPoWgraniu( idKK, s.getIdGrupaZywionych(), s.getdObr().toString().substring(0, 10), idOperator );
                    }

                    s.setDataChanged(Boolean.FALSE);
                    retInfo += s.getDietaNazwa() + "; ";
                }

            } catch ( JDBCException e) {
                MessageDTO ret = new MessageDTO(e.getMessage() + retAkt, retInfo.substring(0, retInfo.length()-1));
                return ret;
            }
            i++;
        }

        //System.out.print("End wgranie StZy, kk: " + kierKosztow + " Czy korekta?: " + czyKorekta + " Na dzien: TODO" );
        MessageDTO ret = new MessageDTO("OK", retInfo.substring(0, retInfo.length()-1));
        return ret;
    }

    public String aktualizujStanZywionychPoWgraniu(BigDecimal idKK, BigDecimal idGrupaZywionch, String data, BigDecimal idOperator)
    {

        try {

            em.createNativeQuery("begin "
                    + "nap_hl7_tools.AKTUALIZUJ_STANY_ZYWIONYCH("
                    + "'" + idKK + "'"
                    + "," + idGrupaZywionch
                    + ",to_date('" + data + "','YYYY-MM-DD')"
                    + "," + idOperator
                    + ");"
                    + " end;").executeUpdate();

        } catch ( Exception e) {
            return e.getMessage();
        }

        return "OK";
    }


}

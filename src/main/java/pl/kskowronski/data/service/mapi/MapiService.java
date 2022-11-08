package pl.kskowronski.data.service.mapi;

import org.springframework.stereotype.Service;
import pl.kskowronski.data.entity.mapi.JadlospisViewVO;
import pl.kskowronski.data.entity.mapi.reports.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class MapiService {

    @PersistenceContext
    private EntityManager em;

    private SimpleDateFormat dtYYYYMMDD = new SimpleDateFormat("yyyy-MM-dd");


    public List<JadlospisDlaDietyNaDzienDTO> getJadlospisDlaDietyNaDzien(String dietName,String forDay) throws Exception
    {

        List<Object[]> jadlospis = null;
        List<JadlospisDlaDietyNaDzienDTO> listJadlospis = new ArrayList<JadlospisDlaDietyNaDzienDTO>();


        try {
            Query query =  em.createNativeQuery(
                    "select j.lp,\n" +
                            "j.posilek_kod,\n" +
                            "j.nazwa_skladnik,\n" +
                            "j.gramatura,\n" +
                            "j.jm_gramatura_dania,\n" +
                            "j.w1,\n" +
                            "j.w2,\n" +
                            "j.w3,\n" +
                            "j.w5\n" +
                            "from V_JADLOSPIS_SKLADNIKI j\n" +
                            "WHERE j.d_obr=to_date('" + forDay + "','YY/MM/DD')\n" +
                            "AND j.dieta_nazwa='" + dietName + "'\n" +
                            "order by j.lp\n");

            jadlospis = query.getResultList();

            for ( Object[] s : jadlospis)
            {
                JadlospisDlaDietyNaDzienDTO list
                        = new JadlospisDlaDietyNaDzienDTO(
                        ((BigDecimal) s[0]).longValue()
                        , (String) s[1]
                        , (String) s[2]
                        , (BigDecimal) s[3]
                        , (String) s[4]
                        , (BigDecimal) s[5]
                        , (BigDecimal) s[6]
                        , (BigDecimal) s[7]
                        , (BigDecimal) s[8]
                );

                listJadlospis.add(list);

            }

        } catch ( Exception e) {
            throw new Exception("I have problem get list getJadlospisDlaDietyNaDzienfor: dietaNazwa: " + dietName + " " + e.getMessage());
        }

        return listJadlospis;

    }


    public List<Object> getIdWartoscOdzywczaForDiet(BigDecimal dietId , String forDay) throws Exception
    {
        try{
            List<Object> ret = em.createQuery("select j.idJadlospis from JadlospisViewVO j where j.dObr = :dObr and j.idDieta = :dietId")
                    .setParameter("dietId", dietId).setParameter("dObr", dtYYYYMMDD.parse(forDay))
                    .getResultList();
            return ret;
        }
        catch (Exception e){
            throw new Exception("I have problem get list getIdWartoscOdzywczaForDiet for: dietId: " + dietId + " " + e.getMessage());
        }
    }

    public List<JadlospisSkladnikiViewVO> getInfAboutJadlospisForDiet(BigDecimal jadlospisId ) throws Exception
    {
        try{

            List<JadlospisSkladnikiViewVO> jsL = em.createQuery("select js from JadlospisSkladnikiViewVO js where js.idJadlospis = :idJadlospis")
                    .setParameter("idJadlospis", jadlospisId)
                    .getResultList();
            return jsL;
        }
        catch (Exception e){
            throw new Exception("I have problem get list getInfAboutJadlospisForDiet for: jadlospisId: " + jadlospisId + " " + e.getMessage());
        }
    }

    public List<AsortymentyDaniaDTO> getAsortymentForDish(BigDecimal idJadlospisSkladniki) throws Exception
    {
        List<Object[]> listAsortDania = null;
        List<AsortymentyDaniaDTO> listAsortDaniaM = new ArrayList<AsortymentyDaniaDTO>();

        try {

            Query query =  em.createNativeQuery("SELECT s.lp,s.id_asortyment_dania, s.asortyment, round(s.ilosc_brutto,2), s.jm_kod, replace('('||LISTAGG(sa.symbol, ', ') WITHIN  GROUP (ORDER BY sa.symbol)||')','()','') alergeny\n" +
                    "  FROM v_ufn_danie_sklad_w_jadlos s, asortymenty_alergeny aa , s_alergeny sa \n" +
                    "where s.id_asortyment_dania = aa.ID_ASORTYMENT(+) \n" +
                    "and sa.ID_ALERGEN(+) = aa.ID_ALERGEN	\n" +
                    "and aa.AKTYWNE(+) = 1\n" +
                    "and s.id_jadlospis_skladnik = " + idJadlospisSkladniki + " \n" +
                    "group by s.lp,s.id_asortyment_dania, s.asortyment, s.ilosc_brutto, s.jm_kod\n" +
                    "ORDER BY s.ilosc_brutto desc	");

            listAsortDania =  query.getResultList();

            for ( Object[] a : listAsortDania)
            {
                AsortymentyDaniaDTO asort = new AsortymentyDaniaDTO();
                asort.setId((BigDecimal) a[0]);
                asort.setIdAsortyment((BigDecimal) a[1]);
                asort.setAsortyment((String) a[2]);
                asort.setIloscBrutto((BigDecimal) a[3]);
                asort.setJmKod((String) a[4]);
                asort.setAlergeny((String) a[5]);
                listAsortDaniaM.add(asort);
            }

            return listAsortDaniaM;
        }
        catch (Exception e){
            throw new Exception("I have problem get list getAsortymentForDish for: idJadlospisSkladniki: " + idJadlospisSkladniki + " " + e.getMessage());
        }
    }

    public List<AsortymentyDaniaSkladnikiDTO> getAsortymentyDaniaSklad(BigDecimal idAsortyment) throws Exception
    {
        List<Object[]> listAsortDaniaSklad = null;
        List<AsortymentyDaniaSkladnikiDTO> listAsortDaniaSk = new ArrayList<AsortymentyDaniaSkladnikiDTO>();

        try {

            Query query =  em.createNativeQuery("SELECT SKL.LP,\n" +
                    "SKL.ASORTYMENT,\n" +
                    "A.Asortyment,\n" +
                    "SKL.ILOSC,\n" +
                    "SKL.JM_KOD,\n" +
                    "A.ALERGENY\n" +
                    "FROM V_ASORTYMENTY_SKLADNIKI SKL, V_Asortymenty A\n" +
                    "where SKL.ID_ASORTYMENT = " + idAsortyment + "\n" +
                    "AND SKL.ID_skladnik=A.id_asortyment\n" +
                    "order by SKL.LP ");

            listAsortDaniaSklad =  query.getResultList();

            for ( Object[] a : listAsortDaniaSklad)
            {
                AsortymentyDaniaSkladnikiDTO asort = new AsortymentyDaniaSkladnikiDTO();
                asort.setAsortyment((String) a[1]);
                asort.setSkladnik((String) a[2]);
                asort.setIlosc((BigDecimal) a[3]);
                asort.setJmKod((String) a[4]);
                asort.setAlergeny((String) a[5]);
                listAsortDaniaSk.add(asort);
            }

            return listAsortDaniaSk;
        }
        catch (Exception e){
            throw new Exception("error getAsortymentyDaniaSklad" + e.getMessage());
        }
    }











    public List<ColumnNameWskaznikiOdzywcze> getJadlospisColumnNames() throws Exception
    {
        List<Object[]> tmp = null;
        List<ColumnNameWskaznikiOdzywcze> listTmp = new ArrayList();
        try{
            Query query = em.createNativeQuery("select *\n" +
                    "from V_S_WSKAZNIKI_ODZYW_OBLICZ\n" +
                    "where \n" +
                    "aktywne = 1\n" +
                    "and numer_kolumny != 0\n" +
                    "order BY AKTYWNE DESC, NUMER_KOLUMNY");
            tmp = query.getResultList();

            for(Object[] t: tmp){
                ColumnNameWskaznikiOdzywcze tCNWO = new ColumnNameWskaznikiOdzywcze();

                if(t[8] != null){
                    tCNWO.setColumnName((String) t[8]);
                }
                if(t[4] != null){
                    tCNWO.setColumnNumber((BigDecimal) t[4]);
                }
                if(t[7] != null){
                    tCNWO.setColumnJmKod((String) t[7]);
                }

                listTmp.add(tCNWO);
            }

        }
        catch (Exception e){
            throw new Exception("I have problem" + " " + e.getMessage());
        }
        return listTmp;
    }


    public List<JadlospisViewVO> getJadlospis(BigDecimal idDieta, String dObr) throws Exception
    {
        List<JadlospisViewVO> data;
        try{
            Query query = em.createQuery("select e from JadlospisViewVO e where e.idDieta = :idDieta and e.dObr = to_date('" + dObr + "','YYYY-MM-DD')");
            data = query.setParameter("idDieta", idDieta).getResultList();
        }
        catch (Exception e){
            throw new Exception("I have problem" + " " + e.getMessage());
        }
        return data;
    }

}

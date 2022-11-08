package pl.kskowronski.data.service.mapi;

import org.springframework.stereotype.Service;
import pl.kskowronski.data.entity.mapi.JadlospisViewVO;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class MapiService {

    @PersistenceContext
    private EntityManager em;


    public List<JadlospisViewVO> getJadlospis(Long idDieta, String dObr) throws Exception
    {
        List<JadlospisViewVO> data = new ArrayList<JadlospisViewVO>();
        try{
            Query query = em.createQuery("select e from JadlospisViewVO e where e.idDieta = :idDieta and e.dObr = '" + dObr + "' ");
            data = query.setParameter("idDieta", idDieta).getResultList();
        }
        catch (Exception e){
            throw new Exception("I have problem" + " " + e.getMessage());
        }
        return data;
    }

}

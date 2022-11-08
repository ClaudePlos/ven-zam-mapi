package pl.kskowronski.data.entity.mapi.reports;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "v_jadlospis_skladniki")
public class JadlospisSkladnikiViewVO {

    @Id
    @Column(name = "id_jadlospis_skladnik")
    private BigDecimal idJadlospisSkladnik;

    @Column(name = "id_jadlospis")
    private BigDecimal idJadlospis;

    @Column(name = "lp")
    private BigDecimal lp;

    @Column(name = "posilek_kod")
    private String posilekKod;

    @Column(name = "rodzaj")
    private String rodzaj;

    @Column(name = "nazwa_skladnik")
    private String nazwaSkladnik;

    @Column(name = "gramatura")
    private String gramatura;

    @Column(name = "jm_gramatura_dania")
    private String jmGramaturaDania;

    @Column(name = "ilosc")
    private BigDecimal ilosc;

    @Column(name = "jm_kod")
    private String jmKod;

    @Column(name = "alergeny_pozycji_jadlospisu")
    private String alergenyPozycjiJadlospisu;

    @Column(name = "id_asortyment_jadlospis")
    private BigDecimal idAsortymentJadlospis;

    @Transient
    List<AsortymentyDaniaDTO> listAsortymentyDania;

    @Transient
    List<AsortymentyDaniaSkladnikiDTO> listAsortymentyDaniaSkladniki;

    public BigDecimal getIdJadlospisSkladnik() {
        return idJadlospisSkladnik;
    }

    public void setIdJadlospisSkladnik(BigDecimal idJadlospisSkladnik) {
        this.idJadlospisSkladnik = idJadlospisSkladnik;
    }

    public BigDecimal getIdJadlospis() {
        return idJadlospis;
    }

    public void setIdJadlospis(BigDecimal idJadlospis) {
        this.idJadlospis = idJadlospis;
    }

    public BigDecimal getLp() {
        return lp;
    }

    public void setLp(BigDecimal lp) {
        this.lp = lp;
    }

    public String getPosilekKod() {
        return posilekKod;
    }

    public void setPosilekKod(String posilekKod) {
        this.posilekKod = posilekKod;
    }

    public String getRodzaj() {
        return rodzaj;
    }

    public void setRodzaj(String rodzaj) {
        this.rodzaj = rodzaj;
    }

    public String getNazwaSkladnik() {
        return nazwaSkladnik;
    }

    public void setNazwaSkladnik(String nazwaSkladnik) {
        this.nazwaSkladnik = nazwaSkladnik;
    }

    public String getGramatura() {
        return gramatura;
    }

    public void setGramatura(String gramatura) {
        this.gramatura = gramatura;
    }

    public String getJmGramaturaDania() {
        return jmGramaturaDania;
    }

    public void setJmGramaturaDania(String jmGramaturaDania) {
        this.jmGramaturaDania = jmGramaturaDania;
    }

    public BigDecimal getIlosc() {
        return ilosc;
    }

    public void setIlosc(BigDecimal ilosc) {
        this.ilosc = ilosc;
    }

    public String getJmKod() {
        return jmKod;
    }

    public void setJmKod(String jmKod) {
        this.jmKod = jmKod;
    }

    public String getAlergenyPozycjiJadlospisu() {
        return alergenyPozycjiJadlospisu;
    }

    public void setAlergenyPozycjiJadlospisu(String alergenyPozycjiJadlospisu) {
        this.alergenyPozycjiJadlospisu = alergenyPozycjiJadlospisu;
    }

    public List<AsortymentyDaniaDTO> getListAsortymentyDania() {
        return listAsortymentyDania;
    }

    public void setListAsortymentyDania(List<AsortymentyDaniaDTO> listAsortymentyDania) {
        this.listAsortymentyDania = listAsortymentyDania;
    }

    public BigDecimal getIdAsortymentJadlospis() {
        return idAsortymentJadlospis;
    }

    public void setIdAsortymentJadlospis(BigDecimal idAsortymentJadlospis) {
        this.idAsortymentJadlospis = idAsortymentJadlospis;
    }

    public List<AsortymentyDaniaSkladnikiDTO> getListAsortymentyDaniaSkladniki() {
        return listAsortymentyDaniaSkladniki;
    }

    public void setListAsortymentyDaniaSkladniki(List<AsortymentyDaniaSkladnikiDTO> listAsortymentyDaniaSkladniki) {
        this.listAsortymentyDaniaSkladniki = listAsortymentyDaniaSkladniki;
    }



}

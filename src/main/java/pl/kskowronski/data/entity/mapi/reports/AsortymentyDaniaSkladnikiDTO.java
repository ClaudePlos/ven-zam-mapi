package pl.kskowronski.data.entity.mapi.reports;

import java.math.BigDecimal;

public class AsortymentyDaniaSkladnikiDTO {


    private String asortyment;
    private String skladnik;
    private BigDecimal ilosc;
    private String jmKod;
    private String alergeny;

    public String getAsortyment() {
        return asortyment;
    }

    public void setAsortyment(String asortyment) {
        this.asortyment = asortyment;
    }

    public String getSkladnik() {
        return skladnik;
    }

    public void setSkladnik(String skladnik) {
        this.skladnik = skladnik;
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

    public String getAlergeny() {
        return alergeny;
    }

    public void setAlergeny(String alergeny) {
        this.alergeny = alergeny;
    }

}

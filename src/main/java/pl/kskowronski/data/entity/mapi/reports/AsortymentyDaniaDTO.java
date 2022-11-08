package pl.kskowronski.data.entity.mapi.reports;

import java.math.BigDecimal;

public class AsortymentyDaniaDTO {

    private BigDecimal id;
    private BigDecimal idAsortyment;
    private String asortyment;
    private BigDecimal iloscBrutto;
    private String jmKod;
    private String alergeny;

    public BigDecimal getId() {
        return id;
    }

    public void setId(BigDecimal id) {
        this.id = id;
    }

    public BigDecimal getIdAsortyment() {
        return idAsortyment;
    }

    public void setIdAsortyment(BigDecimal idAsortyment) {
        this.idAsortyment = idAsortyment;
    }



    public String getAsortyment() {
        return asortyment;
    }

    public void setAsortyment(String asortyment) {
        this.asortyment = asortyment;
    }

    public BigDecimal getIloscBrutto() {
        return iloscBrutto;
    }

    public void setIloscBrutto(BigDecimal iloscBrutto) {
        this.iloscBrutto = iloscBrutto;
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

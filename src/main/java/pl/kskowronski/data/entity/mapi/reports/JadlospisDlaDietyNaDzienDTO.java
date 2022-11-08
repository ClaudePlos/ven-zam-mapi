package pl.kskowronski.data.entity.mapi.reports;

import java.math.BigDecimal;

public class JadlospisDlaDietyNaDzienDTO {


    private Long lp;
    private String posilek;
    private String danieAsortyment;
    private BigDecimal gramatura;
    private String jm;
    private BigDecimal w1;
    private BigDecimal w2;
    private BigDecimal w3;
    private BigDecimal w4;

    public JadlospisDlaDietyNaDzienDTO(Long lp, String posilek, String danieAsortyment, BigDecimal gramatura, String jm, BigDecimal w1, BigDecimal w2, BigDecimal w3, BigDecimal w4)  {
        this.lp = lp;
        this.posilek = posilek;
        this.danieAsortyment = danieAsortyment;
        this.gramatura = gramatura;
        this.jm = jm;
        this.w1 = w1;
        this.w2 = w2;
        this.w3 = w3;
        this.w4 = w4;
    }

    public Long getLp() {
        return lp;
    }

    public void setLp(Long lp) {
        this.lp = lp;
    }

    public String getPosilek() {
        return posilek;
    }

    public void setPosilek(String posilek) {
        this.posilek = posilek;
    }

    public String getDanieAsortyment() {
        return danieAsortyment;
    }

    public void setDanieAsortyment(String danieAsortyment) {
        this.danieAsortyment = danieAsortyment;
    }

    public BigDecimal getGramatura() {
        return gramatura;
    }

    public void setGramatura(BigDecimal gramatura) {
        this.gramatura = gramatura;
    }

    public String getJm() {
        return jm;
    }

    public void setJm(String jm) {
        this.jm = jm;
    }

    public BigDecimal getW1() {
        return w1;
    }

    public void setW1(BigDecimal w1) {
        this.w1 = w1;
    }

    public BigDecimal getW2() {
        return w2;
    }

    public void setW2(BigDecimal w2) {
        this.w2 = w2;
    }

    public BigDecimal getw3() {
        return w3;
    }

    public void setw3(BigDecimal w3) {
        this.w3 = w3;
    }

    public BigDecimal getw4() {
        return w4;
    }

    public void setw4(BigDecimal w4) {
        this.w4 = w4;
    }

}

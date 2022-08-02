package pl.kskowronski.data.entity.mapi;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "OPERATORZY")
public class OperatorVO {

    @Id
    @Column(name = "ID_OPERATOR")
    private BigDecimal idOperator;

    @Column(name = "ID_ROLA")
    private BigDecimal idRola;

    @Column(name = "KOD")
    private String kod;

    @Column(name = "HASLO")
    private String haslo;

    @Column(name = "AKTYWNE")
    private long aktywne;

    @Column(name = "UWAGI_LONG")
    private String uwagi;

    @Column(name = "SPID")
    private long spid;

    @Column(name = "LOKALNY_KATALOG_ROBOCZY")
    private String lokalnyKatalogRoboczy;

    @Column(name = "LOKALNY_KATALOG_DLA_POBIER_ZAL")
    private String lokalnyKatalogDlaPobierZal;

    @Column(name = "LOKALNY_KATALOG_DLA_WYSLAN_ZAL")
    private String lokalnyKatalogDlaWyslanZal;

    @Column(name = "HASLO_INT")
    private Long hasloInt;

    @Column(name = "UZYTKOWNIK_DOMENOWY")
    private String uzytkownikDomenowy;


    public OperatorVO() {
    }

    public OperatorVO(BigDecimal idOperator) {
        this.idOperator = idOperator;
    }

    public OperatorVO(BigDecimal idOperator, String kod, String haslo, long aktywne, long spid) {
        this.idOperator = idOperator;
        this.kod = kod;
        this.haslo = haslo;
        this.aktywne = aktywne;
        this.spid = spid;
    }

    public BigDecimal getIdOperator() {
        return idOperator;
    }

    public void setIdOperator(BigDecimal idOperator) {
        this.idOperator = idOperator;
    }

    public BigDecimal getIdRola() {
        return idRola;
    }

    public void setIdRola(BigDecimal idRola) {
        this.idRola = idRola;
    }

    public String getKod() {
        return kod;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public String getHaslo() {
        return haslo;
    }

    public void setHaslo(String haslo) {
        this.haslo = haslo;
    }

    public long getAktywne() {
        return aktywne;
    }

    public void setAktywne(long aktywne) {
        this.aktywne = aktywne;
    }

    public String getUwagi() {
        return uwagi;
    }

    public void setUwagi(String uwagi) {
        this.uwagi = uwagi;
    }

    public long getSpid() {
        return spid;
    }

    public void setSpid(long spid) {
        this.spid = spid;
    }

    public String getLokalnyKatalogRoboczy() {
        return lokalnyKatalogRoboczy;
    }

    public void setLokalnyKatalogRoboczy(String lokalnyKatalogRoboczy) {
        this.lokalnyKatalogRoboczy = lokalnyKatalogRoboczy;
    }

    public String getLokalnyKatalogDlaPobierZal() {
        return lokalnyKatalogDlaPobierZal;
    }

    public void setLokalnyKatalogDlaPobierZal(String lokalnyKatalogDlaPobierZal) {
        this.lokalnyKatalogDlaPobierZal = lokalnyKatalogDlaPobierZal;
    }

    public String getLokalnyKatalogDlaWyslanZal() {
        return lokalnyKatalogDlaWyslanZal;
    }

    public void setLokalnyKatalogDlaWyslanZal(String lokalnyKatalogDlaWyslanZal) {
        this.lokalnyKatalogDlaWyslanZal = lokalnyKatalogDlaWyslanZal;
    }

    public Long getHasloInt() {
        return hasloInt;
    }

    public void setHasloInt(Long hasloInt) {
        this.hasloInt = hasloInt;
    }

    public String getUzytkownikDomenowy() {
        return uzytkownikDomenowy;
    }

    public void setUzytkownikDomenowy(String uzytkownikDomenowy) {
        this.uzytkownikDomenowy = uzytkownikDomenowy;
    }


}

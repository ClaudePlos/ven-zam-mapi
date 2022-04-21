package pl.kskowronski.data.entity.mapi;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "s_kierunki_kosztow")
public class KierunekKosztowVO {

    @Id
    @Column(name = "ID_KIERUNEK_KOSZTOW")
    private BigDecimal idKierunekKosztow;

    @Column(name = "KIERUNEK_KOSZTOW")
    private String kierunekKosztowNazwa;

    @Column(name = "KIERUNEK_KOSZTOW_KOD")
    private String kierunekKosztowKod;

    @Column(name = "UWAGI")
    private String uwagi;

    public KierunekKosztowVO() {
    }

    public BigDecimal getIdKierunekKosztow() {
        return idKierunekKosztow;
    }

    public void setIdKierunekKosztow(BigDecimal idKierunekKosztow) {
        this.idKierunekKosztow = idKierunekKosztow;
    }

    public String getKierunekKosztowNazwa() {
        return kierunekKosztowNazwa;
    }

    public void setKierunekKosztowNazwa(String kierunekKosztowNazwa) {
        this.kierunekKosztowNazwa = kierunekKosztowNazwa;
    }

    public String getKierunekKosztowKod() {
        return kierunekKosztowKod;
    }

    public void setKierunekKosztowKod(String kierunekKosztowKod) {
        this.kierunekKosztowKod = kierunekKosztowKod;
    }

    public String getUwagi() {
        return uwagi;
    }

    public void setUwagi(String uwagi) {
        this.uwagi = uwagi;
    }
}

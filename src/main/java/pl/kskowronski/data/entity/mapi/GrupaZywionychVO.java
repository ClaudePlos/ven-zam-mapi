package pl.kskowronski.data.entity.mapi;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Collection;

@Entity
@Table(name = "GRUPY_ZYWIONYCH")
public class GrupaZywionychVO {

    @Id
    @Column(name = "ID_GRUPA_ZYWIONYCH")
    private BigDecimal idGrupaZywionych;

    @Column(name = "id_kierunek_kosztow")
    private BigDecimal idKierunekKosztow;

    @Column(name = "ID_KUCHNIA")
    private long idKuchnia;

    @Column(name = "GRUPA_ZYWIONYCH")
    private String grupaZywionych;

    @Column(name = "GRUPA_ZYWIONYCH_KOD")
    private String grupaZywionychKod;

    @Column(name = "LP")
    private long lp;

    @Column(name = "DOMYSLNE")
    private long domyslne;

    @Column(name = "AKTYWNE")
    private long aktywne;

    @Column(name = "UWAGI")
    private String uwagi;

//    @OneToMany(mappedBy = "idOjca")
//    private Collection<GrupaZywionychVO> grupaZywionychVOCollection;
//    @JoinColumn(name = "ID_OJCA", referencedColumnName = "ID_GRUPA_ZYWIONYCH")
//    @ManyToOne
//    private GrupaZywionychVO idOjca;

    public GrupaZywionychVO() {
    }

    public BigDecimal getIdGrupaZywionych() {
        return idGrupaZywionych;
    }

    public void setIdGrupaZywionych(BigDecimal idGrupaZywionych) {
        this.idGrupaZywionych = idGrupaZywionych;
    }

    public long getIdKuchnia() {
        return idKuchnia;
    }

    public void setIdKuchnia(long idKuchnia) {
        this.idKuchnia = idKuchnia;
    }

    public String getGrupaZywionych() {
        return grupaZywionych;
    }

    public void setGrupaZywionych(String grupaZywionych) {
        this.grupaZywionych = grupaZywionych;
    }

    public String getGrupaZywionychKod() {
        return grupaZywionychKod;
    }

    public void setGrupaZywionychKod(String grupaZywionychKod) {
        this.grupaZywionychKod = grupaZywionychKod;
    }

    public long getLp() {
        return lp;
    }

    public void setLp(long lp) {
        this.lp = lp;
    }

    public long getDomyslne() {
        return domyslne;
    }

    public void setDomyslne(long domyslne) {
        this.domyslne = domyslne;
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

//    public Collection<GrupaZywionychVO> getGrupaZywionychVOCollection() {
//        return grupaZywionychVOCollection;
//    }
//
//    public void setGrupaZywionychVOCollection(Collection<GrupaZywionychVO> grupaZywionychVOCollection) {
//        this.grupaZywionychVOCollection = grupaZywionychVOCollection;
//    }
//
//    public GrupaZywionychVO getIdOjca() {
//        return idOjca;
//    }
//
//    public void setIdOjca(GrupaZywionychVO idOjca) {
//        this.idOjca = idOjca;
//    }

    public BigDecimal getIdKierunekKosztow() {
        return idKierunekKosztow;
    }

    public void setIdKierunekKosztow(BigDecimal idKierunekKosztow) {
        this.idKierunekKosztow = idKierunekKosztow;
    }
}

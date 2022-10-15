package pl.kskowronski.data.entity.mapi.nap;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "NAP_ZAM_BLOKADY")
public class NapZamBlockadeVO {

    @Id
    @GeneratedValue(generator = "NAP_ZAM_BLOCK_SEQ")
    @SequenceGenerator(name="NAP_ZAM_BLOCK_SEQ", sequenceName = "NAP_ZAM_BLOCK_SEQ", allocationSize=1)
    @Column(name = "BLK_ID")
    private BigDecimal blkId;

    @Column(name = "BLK_KK_ID")
    private BigDecimal blkKkId;

    @Column(name = "BLK_RODZAJ")
    private String blkType;

    @Temporal(TemporalType.TIME)
    @Column(name = "BLK_GODZ")
    private Date blkHours;

    @Column(name = "BLK_PORA_DNIA")
    private String blkTimeOfDay;

    @Column(name = "BLK_LP")
    private BigDecimal blkLp;

    public BigDecimal getBlkId() {
        return blkId;
    }

    public void setBlkId(BigDecimal blkId) {
        this.blkId = blkId;
    }

    public BigDecimal getBlkKkId() {
        return blkKkId;
    }

    public void setBlkKkId(BigDecimal blkKkId) {
        this.blkKkId = blkKkId;
    }

    public String getBlkType() {
        return blkType;
    }

    public void setBlkType(String blkType) {
        this.blkType = blkType;
    }

    public Date getBlkHours() {
        return blkHours;
    }

    public void setBlkHours(Date blkHours) {
        this.blkHours = blkHours;
    }

    public String getBlkTimeOfDay() {
        return blkTimeOfDay;
    }

    public void setBlkTimeOfDay(String blkTimeOfDay) {
        this.blkTimeOfDay = blkTimeOfDay;
    }

    public BigDecimal getBlkLp() {
        return blkLp;
    }

    public void setBlkLp(BigDecimal blkLp) {
        this.blkLp = blkLp;
    }
}

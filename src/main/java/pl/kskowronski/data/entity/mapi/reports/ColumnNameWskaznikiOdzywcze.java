package pl.kskowronski.data.entity.mapi.reports;

import java.math.BigDecimal;

public class ColumnNameWskaznikiOdzywcze {
    private BigDecimal columnNumber;
    private String columnName;
    private String columnJmKod;

    public BigDecimal getColumnNumber() {
        return columnNumber;
    }

    public void setColumnNumber(BigDecimal columnNumber) {
        this.columnNumber = columnNumber;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnJmKod() {
        return columnJmKod;
    }

    public void setColumnJmKod(String columnJmKod) {
        this.columnJmKod = columnJmKod;
    }



}

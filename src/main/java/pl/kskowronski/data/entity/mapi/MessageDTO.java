package pl.kskowronski.data.entity.mapi;

public class MessageDTO {

    private String status;
    private String info;

    public MessageDTO(String status, String info) {
        this.status = status;
        this.info = info;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
}

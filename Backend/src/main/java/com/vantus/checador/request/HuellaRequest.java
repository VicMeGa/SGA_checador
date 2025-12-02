package com.vantus.checador.request;

public class HuellaRequest {
    private String huella;
    private Integer idSala;

    public String getHuella() {
        return huella;
    }

    public void setHuella(String huella) {
        this.huella = huella;
    }
    
    public Integer getIdSala() { // 👈 Este es el getter que falta
        return idSala;
    }

    public void setIdSala(Integer idSala) {
        this.idSala = idSala;
    }
}

package com.puce.odontogramaservice.Entity;

import java.util.Map;

public class OdontrogramaDTO {
        private Integer id;
        private Integer pacienteId;
        private Map<String, Double> cariesPos;
        private Map<String, Double> zarroPos;
        private Map<String, Double> manchasPos;

}

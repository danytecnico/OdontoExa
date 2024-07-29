package com.wannacode.tecnicasmicroservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient

public class TecnicasMicroserviceApplication {

    public static void main(String[] args) {
        SpringApplication.run(TecnicasMicroserviceApplication.class, args);
    }

}

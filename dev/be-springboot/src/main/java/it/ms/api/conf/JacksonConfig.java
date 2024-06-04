package it.ms.api.conf;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.sql.Blob;
import it.ms.api.Custom.BlobDeserializer;
import it.ms.api.Custom.BlobSerializer;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(Blob.class, new BlobSerializer());
        module.addDeserializer(Blob.class, new BlobDeserializer());
        mapper.registerModule(module);
        return mapper;
    }
}

package it.ms.api.Custom;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Blob;
import javax.sql.rowset.serial.SerialBlob;
import java.util.Base64;

public class BlobDeserializer extends StdDeserializer<Blob> {

    public BlobDeserializer() {
        this(null);
    }

    public BlobDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Blob deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        try {
            String base64Encoded = p.getValueAsString();
            byte[] bytes = Base64.getDecoder().decode(base64Encoded);
            return new SerialBlob(bytes);
        } catch (Exception e) {
            throw new IOException("Failed to deserialize Blob", e);
        }
    }
}

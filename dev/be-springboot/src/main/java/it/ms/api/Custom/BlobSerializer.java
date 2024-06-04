package it.ms.api.Custom;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

public class BlobSerializer extends StdSerializer<Blob> {

    public BlobSerializer() {
        this(null);
    }

    public BlobSerializer(Class<Blob> t) {
        super(t);
    }

    @Override
    public void serialize(Blob blob, JsonGenerator gen, SerializerProvider provider) throws IOException {
        try {
            byte[] bytes = blob.getBytes(1, (int) blob.length());
            String base64Encoded = Base64.getEncoder().encodeToString(bytes);
            gen.writeString(base64Encoded);
        } catch (SQLException e) {
            throw new IOException("Failed to serialize Blob", e);
        }
    }
}

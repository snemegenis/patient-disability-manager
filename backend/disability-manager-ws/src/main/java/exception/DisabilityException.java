package exception;

/**
 * Created by liutkvai on 11/22/2017.
 */
public class DisabilityException extends RuntimeException {
    public DisabilityException(String message) {
        super(message);
    }

    public DisabilityException(String message, Throwable cause) {
        super(message, cause);
    }
}

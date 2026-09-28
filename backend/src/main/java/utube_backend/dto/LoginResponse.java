package utube_backend.dto;

public class LoginResponse {

    private String token;
    private Long id;
    private String username;
    private String displayName;

    public LoginResponse() {
    }

    public LoginResponse(String token, Long id, String username, String displayName) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.displayName = displayName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
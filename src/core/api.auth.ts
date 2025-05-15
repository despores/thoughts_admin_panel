interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

class AuthService {
    private static mockDelay = 1000; // Simulate network delay

    static async login(email: string, password: string): Promise<{ data: AuthResponse }> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, this.mockDelay));
        
        // Mock validation
        if (email === "admin@example.com" && password === "password") {
            return {
                data: {
                    accessToken: "mock_access_token_" + Date.now(),
                    refreshToken: "mock_refresh_token_" + Date.now()
                }
            };
        }
        
        throw new Error("Invalid credentials");
    }

    static async refresh(): Promise<{ data: AuthResponse }> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, this.mockDelay));
        
        // Mock refresh token validation
        const currentToken = localStorage.getItem("token");
        if (currentToken) {
            return {
                data: {
                    accessToken: "mock_refreshed_token_" + Date.now(),
                    refreshToken: "mock_refresh_token_" + Date.now()
                }
            };
        }
        
        throw new Error("No refresh token found");
    }

    static async logout(): Promise<void> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, this.mockDelay));
        return;
    }
}

export default AuthService; 
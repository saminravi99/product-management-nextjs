const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bitechx.com";

export class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken(): string | null {
        return this.token;
    }

    clearToken() {
        this.token = null;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (options.headers) {
            Object.assign(headers, options.headers);
        }

        if (this.token) {
            headers.Authorization = `Bearer ${this.token}`;
        }

        const config: RequestInit = {
            ...options,
            headers,
        };

        const response = await fetch(`${this.baseURL}${endpoint}`, config);

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: "An error occurred",
            }));
            throw new Error(error.message || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    }

    async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: "DELETE" });
    }
}

export const apiClient = new ApiClient();

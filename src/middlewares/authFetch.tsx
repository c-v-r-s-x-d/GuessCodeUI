const createAuthenticatedFetch = (): typeof fetch => {
    return async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const storedToken = localStorage.getItem("token");

        const headers = new Headers(init?.headers);
        if (storedToken) {
            headers.set('Authorization', `Bearer ${storedToken}`);
        }

        const modifiedInit: RequestInit = {
            ...init,
            headers: headers,
        };

        try {
            const response = await fetch(input, modifiedInit);
            return response;
        } catch (error) {
            throw error;
        }
    };
};

export default createAuthenticatedFetch;
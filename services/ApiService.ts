class ApiService {
  baseUrl?: string | undefined;
  isServer: boolean;

  constructor(baseUrl?: string | undefined) {
    this.baseUrl = baseUrl;
    this.isServer = typeof window === "undefined";
  }

  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (!this.baseUrl) {
      this.baseUrl = `${process.env.NEXT_PUBLIC_API_URI}/api`;

      if (this.isServer) {
        this.baseUrl = `${process.env.NEXT_API_URI}/api`;
      }
    }

    options.headers = headers;
    const response = await fetch(`${this.baseUrl}${url}`, options);

    if (response.status === 204) {
      return response.text() as Promise<T>;
    }

    if (!response.ok) {
      const body = await response.json();

      if (response.status === 403) {
        return Promise.reject(body.data);
      }

      return Promise.reject(body.message);
    }

    return response.json() as Promise<T>;
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}${queryString ? `?${queryString}` : ""}`;

    return this.request<T>(fullUrl);
  }

  async post<T>(url: string, data: any): Promise<T> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  async put<T>(url: string, data: any): Promise<T> {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.request<T>(url, options);
  }

  async delete<T>(url: string): Promise<T> {
    const options: RequestInit = {
      method: "DELETE",
    };

    return this.request<T>(url, options);
  }
}

export default ApiService;

// const api = new ApiService('https://api.example.com');

// // Exemplo de solicitação GET
// api.get<{ name: string }>('/data/1')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Exemplo de solicitação POST
// const postData = { name: 'John' };
// api.post('/data', postData)
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Exemplo de solicitação PUT
// const putData = { name: 'Jane' };
// api.put('/data/1', putData)
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

// // Exemplo de solicitação DELETE
// api.delete('/data/1')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));

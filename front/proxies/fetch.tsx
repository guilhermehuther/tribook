export class FetchProxy {
    static async request<T = any>(
      endpoint: string,
      method: string = "GET",
      body?: any,
      headers: Record<string, string> = { "Content-Type": "application/json" }
    ): Promise<T> {
      const config: RequestInit = {
        method,
        headers,
      };
  
      if (body) {
        config.body = JSON.stringify(body);
      }
  
      const response = await fetch(`http://localhost:8000/api/${endpoint}`, config);
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
  
      return response.json();
    }
  }
  
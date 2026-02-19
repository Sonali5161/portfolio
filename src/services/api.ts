const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Array<{ field: string; message: string }>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status,
      data.errors
    );
  }

  return data;
};

export const contactApi = {
  /**
   * Send contact form message
   */
  sendMessage: async (formData: ContactFormData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      return await handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError('Network error. Please check your connection.', 0);
    }
  },

  /**
   * Check API health
   */
  checkHealth: async (): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
      return await handleResponse(response);
    } catch (error) {
      throw new ApiError('Unable to connect to server', 0);
    }
  },
};

export { ApiError };
export type { ContactFormData, ApiResponse };

// AgriConnect REST API Connector Service
// Automatically attaches JWT token and provides unified API methods

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('agriconnect_user') || '{}');
  return {
    'Content-Type': 'application/json',
    ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {})
  };
};

export const api = {
  // Generic Fetch Wrapper
  async request(endpoint, options = {}) {
    const config = {
      headers: getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (error) {
      console.warn(`REST API [${endpoint}] not reachable, falling back to local state:`, error.message);
      throw error;
    }
  },

  // Auth Endpoints
  auth: {
    login: (credentials) => api.request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData) => api.request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    me: () => api.request('/auth/me')
  },

  // Farmer & Verification Endpoints
  farmer: {
    submitVerification: (formData) => api.request('/farmer/verification', { method: 'POST', body: formData }),
    getVerificationStatus: () => api.request('/farmer/verification/status'),
    getDashboardStats: () => api.request('/farmer/dashboard-stats')
  },

  // Marketplace & Products Endpoints
  products: {
    getAll: (params = '') => api.request(`/products?${params}`),
    getById: (id) => api.request(`/products/${id}`),
    create: (productData) => api.request('/products', { method: 'POST', body: JSON.stringify(productData) }),
    update: (id, updates) => api.request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
    delete: (id) => api.request(`/products/${id}`, { method: 'DELETE' })
  },

  // Orders Endpoints
  orders: {
    create: (orderData) => api.request('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
    getCustomerOrders: () => api.request('/orders/customer'),
    getFarmerOrders: () => api.request('/orders/farmer'),
    updateStatus: (id, status) => api.request(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) })
  },

  // Community Endpoints
  community: {
    getPosts: (filter = '') => api.request(`/community/posts?${filter}`),
    createPost: (postData) => api.request('/community/posts', { method: 'POST', body: JSON.stringify(postData) }),
    addComment: (postId, comment) => api.request(`/community/posts/${postId}/comments`, { method: 'POST', body: JSON.stringify(comment) })
  },

  // Admin Endpoints
  admin: {
    getPendingVerifications: () => api.request('/admin/verifications'),
    reviewVerification: (id, status, remarks) => api.request(`/admin/verifications/${id}`, { method: 'PATCH', body: JSON.stringify({ status, remarks }) }),
    getAllUsers: () => api.request('/admin/users'),
    toggleUser: (id) => api.request(`/admin/users/${id}/toggle`, { method: 'PATCH' })
  }
};


// Product API Service
// Replace the base URL with your actual API endpoint

const API_BASE_URL = "http://localhost:3000"; // Update this to your actual API URL

class ProductService {
  // Get authentication token from cookies or localStorage
  getAuthToken() {
    // You can implement your own token retrieval logic here
    // For now, we'll rely on cookies being sent automatically
    return null;
  }

  // Create headers for API requests
  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = this.getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
  }

  // Create a new product
  async createProduct(productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/add/`, {
        method: "POST",
        headers: this.getHeaders(),
        credentials: "include", // Include cookies for authentication
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  // Get all products
  async getProducts(filters = {}) {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams
        ? `${API_BASE_URL}/products/product-list/?${queryParams}`
        : `${API_BASE_URL}/products/product-list/`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  // Get a single product by ID
  async getProductById(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "GET",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  }

  // Update a product
  async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "PUT",
        headers: this.getHeaders(),
        credentials: "include",
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  // Delete a product
  async deleteProduct(productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
        method: "DELETE",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }

  // Get products by user ID
  async getUserProducts(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/products/user/${userId}`, {
        method: "GET",
        headers: this.getHeaders(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching user products:", error);
      throw error;
    }
  }

  // Search products
  async searchProducts(searchTerm, filters = {}) {
    try {
      const searchParams = new URLSearchParams({
        q: searchTerm,
        ...filters,
      });

      const response = await fetch(
        `${API_BASE_URL}/products/search?${searchParams}`,
        {
          method: "GET",
          headers: this.getHeaders(),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }

  // Upload image (if you have a separate image upload endpoint)
  async uploadImage(file) {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const productService = new ProductService();
export default productService;

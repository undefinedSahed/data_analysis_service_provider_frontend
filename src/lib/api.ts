/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios"
import { getSession } from "next-auth/react"

const API_URL = process.env.NEXT_PUBLIC_API_URL

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
})

// Add request interceptor to include access token from next-auth session
api.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    console.log("SESSION:", session)
    if (session?.user?.accessToken) {
      config.headers.Authorization = `${session.user.accessToken}`
    } else {
      console.warn("No token in session")
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ================== API FUNCTIONS ================== //

// User Account API
export async function fetchUserProfile() {
  try {
    const response = await api.get("/user/profile")
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch user profile")
  }
}

// Update user profile
export async function updateUserProfile(data: any, image?: File) {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (image) {
      formData.append("image", image)
    }
    const response = await api.put("/user/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update user profile")
  }
}

// Services API
export async function fetchServices(page = 1, limit = 10) {
  try {
    const response = await api.get(`/services/get?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch services")
  }
}

export async function fetchService(id: string) {
  try {
    const response = await api.get(`/services/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch service")
  }
}

export async function createService(data: any, image?: File) {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (image) {
      formData.append("image", image)
    }
    const response = await api.post("/services/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create service")
  }
}

export async function updateService(id: string, data: any, image?: File) {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (image) {
      formData.append("image", image)
    }
    const response = await api.put(`/services/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update service")
  }
}

export async function deleteService(id: string) {
  try {
    const response = await api.delete(`/services/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete service")
  }
}

// Blog API
export async function fetchBlogs(page = 1, limit = 10) {
  try {
    const response = await api.get(`/blog/get?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch blogs")
  }
}

export async function fetchBlog(id: string) {
  try {
    const response = await api.get(`/blog/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch blog")
  }
}

export async function createBlog(data: any, image?: File) {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (image) {
      formData.append("image", image)
    }
    const response = await api.post("/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create blog")
  }
}

export async function updateBlog(id: string, data: any, image?: File) {
  try {
    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    if (image) {
      formData.append("image", image)
    }
    const response = await api.put(`/blog/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update blog")
  }
}

export async function deleteBlog(id: string) {
  try {
    const response = await api.delete(`/blog/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete blog")
  }
}

// Strategy API
export async function fetchStrategies(page = 1, limit = 10) {
  try {
    const response = await api.get(`/strategy/get?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch strategies")
  }
}

export async function fetchStrategy(id: string) {
  try {
    const response = await api.get(`/strategy/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch strategy")
  }
}

export async function updateStrategy(id: string, data: any) {
  try {
    const response = await api.put(`/strategy/${id}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update strategy")
  }
}

export async function deleteStrategy(id: string) {
  try {
    const response = await api.delete(`/strategy/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete strategy")
  }
}

export async function createStrategy(data: any) {
  try {
    const response = await api.post("/strategy/create", data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create strategy")
  }
}

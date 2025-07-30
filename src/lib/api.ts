/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogResponse } from "@/components/solution/blog"
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


// Update user password
export async function updatePassword(data: { currentPassword: string; newPassword: string }) {
  try {
    const response = await api.post("/auth/change-password", data)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to update password")
  }
}



// Solutions API
export async function fetchSolutions(page = 1, limit = 5) {
  try {
    const response = await api.get(`/solution/get?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch solutions")
  }
}


export async function createSolution(data: any) {
  try {
    const response = await api.post(`/solution/create`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create solution")
  }
}


export async function updateSolution(id: string, data: any) {
  try {
    const response = await api.put(`/solution/${id}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update solution")
  }
}

export async function deleteSolution(id: string) {
  try {
    const response = await api.delete(`/solution/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete solution")
  }
}



// Needed staff API
export async function createStaffingNeed(data: {
  firstName: string
  lastName: string
  companyName: string
  businessEmail: string
  staffDescription: string
}) {
  try {
    const response = await api.post("/needed-staff/create", data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create staffing need")
  }
}


export async function fetchAllStaffingNeed(page = 1, limit = 6) {
  try {
    const response = await api.get(`/needed-staff/get?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch staffing needs")
  }
}


export async function fetchUserStaffingNeed(page = 1, limit = 6) {
  try {
    const response = await api.get(`/needed-staff/my-needed-staff?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch staffing needs")
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
export async function fetchBlogs(page = 1, limit = 10): Promise<BlogResponse> {
  const response = await api.get(`/blog/get?page=${page}&limit=${limit}`)
  return response.data
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


// Fetch a specific strategy
export async function fetchStrategy(id: string) {
  try {
    const response = await api.get(`/strategy/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch strategy")
  }
}


// Update a specific strategy
export async function updateStrategy(id: string, data: any) {
  try {
    const response = await api.put(`/strategy/${id}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update strategy")
  }
}


// Get user Strategies
export async function fetchUserStrategies(page = 1, limit = 5) {
  try {
    const response = await api.get(`/strategy/my-strategy?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch user strategies")
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



// Payment API

export async function createPayment(data: any) {
  try {
    const response = await api.post("/payment/create-payment", data)
    const result = await response.data
    return result
  } catch (error) {
    console.error("Error creating payment:", error)
    throw error
  }
}


export async function fetchAllPayments(page = 1, limit = 5) {
  try {
    const response = await api.get(`/payment?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch payments")
  }
}


// Payment Status API
export async function fetchPaymentStatus(data: any) {
  try {
    const response = await api.post(`/payment/confirm-payment`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch payment status")
  }
}


export async function fetchUserPayments(page = 1, limit = 5) {
  try {
    const response = await api.get(`/payment/my-payments?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch payments")
  }
}




// Data set api

export async function createDataSet(data: any, userId: string) {
  try {
    const response = await api.post(`data-set/create/${userId}`, data) 
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to create data set")
  }
}


// get all data set for admin
export async function fetchDataSets(page = 1, limit = 5) {
  try {
    const response = await api.get(`/data-set/all?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data sets")
  }
}


// get single dataset
export async function fetchDataSet(id: string) {
  try {
    const response = await api.get(`/data-set/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data set")
  }
}


// get user all data set
export async function fetchUserDataSet(page = 1, limit = 5) {
  try {
    const response = await api.get(`/data-set/my?page=${page}&limit=${limit}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch data sets")
  }
}


// delete data set
export async function deleteDataSet(id: string) {
  try {
    const response = await api.delete(`/data-set/delete/${id}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to delete data set")
  }
}


// update data set 
export async function updateDataSet(id: string, data: any) {
  try {
    const response = await api.put(`/data-set/update/${id}`, data)
    return response.data
  } catch (error: any) {
    throw new Error(error.message || "Failed to update data set")
  }
} 
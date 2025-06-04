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
        console.log("SESSION:", session) // Add this
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

        // Add the data as JSON string
        formData.append("data", JSON.stringify(data))

        // Add image if provided
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
export async function fetchServices() {
    try {
        const response = await api.get("/services/get")
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

// Solution API
export async function fetchSolutions() {
    try {
        const response = await api.get("/solution/get")
        return response.data
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch solutions")
    }
}

// Blog API
export async function fetchBlogs() {
    try {
        const response = await api.get("/blog/get")
        return response.data
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch blogs")
    }
}

// Strategy API
export async function createStrategy(data: any) {
    try {
        const response = await api.post("/strategy/create", data)
        return response.data
    } catch (error: any) {
        throw new Error(error.message || "Failed to create strategy")
    }
}

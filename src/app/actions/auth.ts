
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function registerUser(userData: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            return {
                success: false,
                message: data.message || "Registration failed",
            };
        }

        return {
            success: true,
            data: data.data, // contains the accessToken
            message: data.message,
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            message: "Something went wrong. Please try again.",
        };
    }
}



export async function verifyOTP(verificationData: { otp: string }, token: string | null) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(verificationData)
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Verification failed",
            };
        }

        return {
            success: true,
            data: data.data,
        };
    } catch (error) {
        console.error("Verification error:", error);
        return {
            success: false,
            message: "An error occurred during verification",
        };
    }
}

export async function forgotPassword(email: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to send reset email",
            };
        }

        return {
            success: true,
            message: "Password reset instructions sent to your email",
            data: data.data,
        };
    } catch (error) {
        console.error("Forgot password error:", error);
        return {
            success: false,
            message: "An error occurred while processing your request",
        };
    }
}

export async function resetPassword(resetData: {
    token: string;
    password: string;
}) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resetData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Password reset failed",
            };
        }

        return {
            success: true,
            message: "Password has been reset successfully",
        };
    } catch (error) {
        console.error("Reset password error:", error);
        return {
            success: false,
            message: "An error occurred while resetting your password",
        };
    }
}

// Update logout to use NextAuth signOut
export async function logout() {
    // This should be handled by NextAuth signOut on the client side
    return {
        success: true,
        message: "Logged out successfully",
    };
}
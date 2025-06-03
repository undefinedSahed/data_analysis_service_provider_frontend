import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password are required");
                }

                const result = await loginUser({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (!result?.success) {
                    return (result.message || "Invalid credentials");
                }

                const user = result?.data?.isExistingUser;

                return {
                    id: user?._id,
                    name: `${user?.firstName} ${user?.lastName}`,
                    email: user?.email,
                    image: user?.imageLink || null,
                    role: user?.role,
                    accessToken: result.token,
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                role: token.role,
                accessToken: token.accessToken,
            };
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };

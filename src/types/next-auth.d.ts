// types/next-auth.d.ts or app/types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            role: string;
            accessToken: string;
            image?: string | null;
        };
    }

    interface User {
        id: string;
        name?: string | null;
        email?: string | null;
        role: string;
        accessToken: string;
        image?: string | null;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        accessToken: string;
    }
}

import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback_dev_secret_key_12345";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let payload = body;

        // Decrypt if it's wrapped in { data: ... }
        if (body.data) {
            const bytes = CryptoJS.AES.decrypt(body.data, ENCRYPTION_KEY);
            payload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }

        const { email, password } = payload;

        // Static test data for verification
        const testUsers: Record<string, any> = {
            "admin@shopod.com": { role: "admin", password: "admin123", name: "Super Admin" },
            "seller@shopod.com": { role: "seller", password: "seller123", name: "Burger King" },
            "user@shopod.com": { role: "client", password: "user123", name: "John Doe" },
        };

        if (testUsers[email]) {
            const user = testUsers[email];
            if (user.password === password) {
                return NextResponse.json({
                    token: "mock-jwt-token-static-" + user.role,
                    user: {
                        email,
                        name: user.name,
                    },
                    role: user.role
                });
            } else {
                return NextResponse.json(
                    { message: "Invalid password for test account" },
                    { status: 401 }
                );
            }
        }

        // Fallback for any other valid-looking input
        if (email && password) {
            let role = "client";
            if (email.includes("admin")) role = "admin";
            else if (email.includes("seller")) role = "seller";

            return NextResponse.json({
                token: "mock-jwt-token-" + Math.random().toString(36).substring(7),
                user: {
                    email,
                    name: email.split("@")[0],
                },
                role
            });
        }

        return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}

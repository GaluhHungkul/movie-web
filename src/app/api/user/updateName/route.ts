import { prisma } from "@/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export async function PUT(req: NextRequest) {
    try {
        const token = await getToken({ req, secret })
        if(!token) return NextResponse.json({ message : "Invalid token"}, { status: 401})

        const { name } = await req.json()
        if(!name) return NextResponse.json({ message : "Invalid body request"}, { status: 400})

        await prisma.user.update({
            where: { id: token.id },
            data: {
                name
            }
        })
        
        return NextResponse.json({ message : "User name updated successfully"})
        

    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
            if(error.code === "P2025") {
                console.log("User not found")
                return NextResponse.json({ message : "User not found"}, { status: 404 })
            }
        }
        console.log("Error: " , error)
        return NextResponse.json({ message : "Internal server error" }, { status: 500 })
    }
}
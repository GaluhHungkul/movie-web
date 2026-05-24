import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    try {
        console.log("masuk ke /signin")
        const { email, password } = await req.json()
        console.log({email, password})
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(!user || !user.password) return NextResponse.json({ error: "Invalid credentials"})        

        const isCompared = await bcrypt.compare(password, user.password)
        if(!isCompared) return NextResponse.json({ error: "Invalid credentials"})        

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 
            process.env.NEXTAUTH_SECRET!,
        )

        return NextResponse.json({ user, token })
    } catch (error) {
        return NextResponse.json({ error: "Internal server error : " + error })
    }
}
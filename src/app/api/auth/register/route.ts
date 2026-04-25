import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest) {
    try {
        const { name, email, password } = await req.json()
        if(!(name && email && password)) return NextResponse.json({ message : "Incomplete data" }, { status : 400 })
        
        const isEmailUsed = await prisma.user.findFirst({ where : { email } })
        if(isEmailUsed) return NextResponse.json({ message : "Email is already in use" }, { status : 400 })

        const hashedPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data : { 
                name, email, 
                password : hashedPassword,
                favoritesMovie : {
                    create : []
                }
            }
        })
        if(!user) return NextResponse.json({ message : "Sign up error. Something went wrong"}, { status : 500 })
        
        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 
            process.env.NEXTAUTH_SECRET!,
            {
                expiresIn: "7d"
            }
        )
        return NextResponse.json({ message : "Sign up success", user, token }, { status : 200 })
        
    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ error })
    }
}
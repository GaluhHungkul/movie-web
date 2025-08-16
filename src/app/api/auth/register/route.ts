import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const { name, email, password } = await req.json()
        if(!(name && email && password)) return NextResponse.json({ message : "Incomplete data" }, { status : 400 })
        
        const isEmailUsed = await prisma.user.findFirst({ where : { email } })
        if(isEmailUsed) return NextResponse.json({ message : "Email is already in use" }, { status : 400 })

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data : { 
                name, email, 
                password : hashedPassword,
                favoritesMovie : {
                    create : []
                }
            }
        })
        if(!newUser) return NextResponse.json({ message : "Sign up error. Something went wrong"}, { status : 500 })
        console.log(newUser)
        return NextResponse.json({ message : "Sign up success" }, { status : 200 })
        
    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ error })
    }
}
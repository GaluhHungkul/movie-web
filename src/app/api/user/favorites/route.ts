import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export async function POST(req:NextRequest) {
    try {
        const token = await getToken({ req, secret  })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
            
        const { backdrop_path, title, poster_path, movieId } = await req.json()
        if(!(backdrop_path || title || poster_path || movieId)) return NextResponse.json({ message : "Incomplete data" }, { status : 422})

        await prisma.favoriteMovie.create({
            data : {
                backdrop_path, title, poster_path, movieId : movieId.toString(), userId : token.id
            }
        })
        return NextResponse.json({ message : "Action success"})

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Something went wrong!" }, { status : 500})
    }
}
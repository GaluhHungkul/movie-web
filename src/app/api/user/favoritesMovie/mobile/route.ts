import { prisma } from "@/lib/prisma";
import { JwtPayload, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const defaultMovieCount = 8

interface DecodedJwt extends JwtPayload {
    id: string
    email: string
}

export async function GET(req: NextRequest) {
    try {
        const authorization = req.headers.get("Authorization")
        if(!authorization) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
    
        const [bearer, token] = authorization?.split(" ")
        if(bearer != "Bearer" || !token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
    
        const decoded = verify(token, process.env.NEXTAUTH_SECRET ?? "top_secret") as DecodedJwt;


        const { searchParams } = new URL(req.url)
        const limit = Number(searchParams.get("limit"))
        const take = isNaN(limit) || limit < 1 ? defaultMovieCount : limit
        const movies = await prisma.favoriteMovie.findMany({
            where: {
                userId: decoded.id
            },
            orderBy: {
                added_at: "desc"
            },
            take
        })
        
        return NextResponse.json({
            data: {
                movies
            }
        })
        
        
    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Something went wrong!" }, { status : 500})
    }
}

export async function POST(req:NextRequest) {
    try {
        console.log("masuk")
        const authorization = req.headers.get("Authorization")
        if(!authorization) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
            
            const [bearer, token] = authorization?.split(" ")
            if(bearer != "Bearer" || !token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
                
                const decoded = verify(token, process.env.NEXTAUTH_SECRET ?? "top_secret") as DecodedJwt;
                
                const { backdrop_path, title, poster_path, movieId, isMovie } = await req.json()
                if(!(backdrop_path || title || poster_path || movieId)) return NextResponse.json({ message : "Incomplete data" }, { status : 422})
                    console.log("lolos")
                    
        const deleted = await prisma.favoriteMovie.deleteMany({
            where: {
                userId: decoded.id, 
                movieId: movieId.toString()
            }
        })
        let message
        message = "Movie removed from your list successfully"
        // return NextResponse.json({ message : token.id})
        if(deleted.count === 0) {
            await prisma.favoriteMovie.create({
                data : {
                    backdrop_path, title, poster_path, isMovie,
                    movieId : movieId.toString(), 
                    userId : decoded.id,
                }
            })
            message = "Movie added to your list successfully"
        } 
        return NextResponse.json({ message })

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Something went wrong!" }, { status : 500})
    }
}

export async function DELETE(req:NextRequest) {
    try {
        const authorization = req.headers.get("Authorization")
        if(!authorization) return NextResponse.json({ message : "Unauthorized" }, { status : 401})

        const [bearer, token] = authorization?.split(" ")
        if(bearer != "Bearer" || !token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})

        const decoded = verify(token, process.env.NEXTAUTH_SECRET ?? "top_secret") as DecodedJwt;
    
        const { movieId, deleteAll } = await req.json()
        if(!movieId && !deleteAll) return NextResponse.json({ message : "Incomplete data" }, { status : 422})
        
        if(deleteAll) {
            const deleted = await prisma.favoriteMovie.deleteMany({
                where: { userId: decoded.id }
            })
            return NextResponse.json({ message: `Successfully deleted ${deleted.count} movies` })
        } else await prisma.favoriteMovie.delete({
            where: {
                userId_movieId: {
                    movieId: movieId, 
                    userId: decoded.id
                }
            }
        })
        
        return NextResponse.json({ message: "Movie deleted successfully" })

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Something went wrong!" }, { status : 500})
    }
}
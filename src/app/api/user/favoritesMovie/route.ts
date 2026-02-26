import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET
const defaultMovieCount = 8

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})

        const { searchParams } = new URL(req.url)
        const count = Number(searchParams.get("count"))
        const take = isNaN(count) || count < 1 ? defaultMovieCount : count

        const movies = await prisma.favoriteMovie.findMany({
            where: {
                userId: token.id
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
        const token = await getToken({ req, secret  })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
            
        if(!token.isSubscribe) return NextResponse.json({ message : "Unauthorized" }, { status : 401})

        const { backdrop_path, title, poster_path, movieId, isMovie } = await req.json()
        if(!(backdrop_path || title || poster_path || movieId)) return NextResponse.json({ message : "Incomplete data" }, { status : 422})
        
        const deleted = await prisma.favoriteMovie.deleteMany({
            where: {
                userId: token.id, 
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
                    userId : token.id,
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
        const token = await getToken({ req, secret  })
        if(!token) return NextResponse.json({ message : "Unauthorized" }, { status : 401})
            
        const { movieId, deleteAll } = await req.json()
        if(!movieId && !deleteAll) return NextResponse.json({ message : "Incomplete data" }, { status : 422})
        
        

        if(deleteAll) {
            const deleted = await prisma.favoriteMovie.deleteMany({
                where: { userId: token.id }
            })
            return NextResponse.json({ message: `Successfully deleted ${deleted.count} movies` })
        } else await prisma.favoriteMovie.delete({
            where: {
                userId_movieId: {
                    movieId: movieId, 
                    userId: token.id
                }
            }
        })
        
        return NextResponse.json({ message: "Movie deleted successfully" })

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({ message : "Something went wrong!" }, { status : 500})
    }
}
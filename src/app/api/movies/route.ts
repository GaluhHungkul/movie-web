import { TypeMovie } from "@/types/types-movie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const pageRequest = Number(searchParams.get("page")) || 1
        const endpoint = searchParams.get("endpoint") || "/movie/popular"
        const limit = Number(searchParams.get("limit")) || 10
        const isInfinite = searchParams.get("infinite") == "true"

        const chain = endpoint.includes("?") ? "&" : "?"

        const res = await fetch(`${process.env.TMDB_API_BASE_URL}${endpoint}${chain}page=${pageRequest}&api_key=3543dcd2e4f8a7ade29629e3b9c4a27c`)
        if(!res.ok) return NextResponse.json({
            error: res.statusText
        }, { status: res.status })
        
        const { results, page, total_pages } = await res.json()
        
        const movies = results
            .slice(0, limit)
            .map((movie: TypeMovie & { name?: string }) => ({
                ...movie,
                backdrop_path:
                    movie.backdrop_path ? process.env.TMDB_API_BANNER_BASE_URL +
                    movie.backdrop_path : "/assets/img/backdrop_fallback.webp",
                poster_path:
                    movie.poster_path ? 
                    process.env.TMDB_API_IMG_BASE_URL +
                    movie.poster_path : "/assets/img/poster_fallback.webp",
                title: movie.title ?? movie.name ?? "No Title",
            }))

        const response = isInfinite 
        ? { movies, page, total_pages }
        : { 
            movies, 
            isNextPage: page < total_pages
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log("Error : ", error)
        return NextResponse.json({
            error
        }, { status: 500 })
    }
}
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const type = searchParams.get("type") || "movie"
        const allType = searchParams.get("allType") === "true"

        const base_path = (typeData: string) => `${process.env.TMDB_API_BASE_URL}/genre/${typeData}/list?api_key=${process.env.TMDB_API_KEY}`        

        let data;

        if(allType) {
            const [movieGenres, tvGenres] = await Promise.all([
                fetch(base_path("tv")).then(res => res.json()),
                fetch(base_path("movie")).then(res => res.json()),
            ])
            data = {
                movieGenres: movieGenres.genres,
                tvGenres: tvGenres.genres
            }
            console.log(data)

        } else {
            const res = await fetch(base_path(type))
    
            if(!res.ok) return NextResponse.json({
                error: res.statusText
            }, { status: res.status })
            
            data = await res.json()
        }

        return NextResponse.json(data)

    } catch (error) {
        console.log("Error : ", error)
        return NextResponse.json({
            error
        }, { status: 500 })
    }
}
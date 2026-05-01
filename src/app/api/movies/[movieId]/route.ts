import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { 
    params: Promise<{ movieId: string } >
}) {
    try {

        const  movieId = (await params).movieId
        const { searchParams } = req.nextUrl
        const typeRaw = (searchParams.get("type") ?? "").toLowerCase()
        const type = ["movie", "tv"].includes(typeRaw) ? typeRaw : "movie"
        console.log({type, movieId})
        const [previewMovie, descriptionMovie, actors] = await Promise.all([
            fetch(`${process.env.TMDB_API_BASE_URL}/${type}/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`).then(res => res.json()),
            fetch(`${process.env.TMDB_API_BASE_URL}/${type}/${movieId}?api_key=${process.env.TMDB_API_KEY}`).then(res => res.json()),
            fetch(`${process.env.TMDB_API_BASE_URL}/${type}/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`).then(res => res.json()),
        ])
        return NextResponse.json({
            previewMovie,  
            descriptionMovie,
            actors
        })
    } catch (error) {
        console.log("Error: " , error)
        return NextResponse.json({ error: "Internal server error"},{ status: 500 })
    }
}
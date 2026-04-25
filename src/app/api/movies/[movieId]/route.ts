import { Cast } from "@/types/types-movie";
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
            descriptionMovie : {
                ...descriptionMovie,
                poster_path : descriptionMovie.poster_path ? process.env.TMDB_API_IMG_BASE_URL +  descriptionMovie.poster_path : "/assets/img/poster_fallback.webp",
                backdrop_path : descriptionMovie.backdrop_path  ? process.env.TMDB_API_BANNER_BASE_URL + descriptionMovie.backdrop_path : "/assets/img/backdrop_fallback.webp",
                title : descriptionMovie.title ?? descriptionMovie.name
            },
            actors: {
                ...actors,
                cast : actors.cast.slice(0,12).map((c:Cast) => ({
                    ...c, 
                    profile_path: c.profile_path ? process.env.TMDB_API_PP_BASE_URL + c.profile_path : "/assets/img/default_pp.png",
                }))
            }
        })
    } catch (error) {
        console.log("Error: " , error)
        return NextResponse.json({ error: "Internal server error"},{ status: 500 })
    }
}
import { TmdbMultiSearchResponse } from "@/types/types-search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const query = searchParams.get("query") ?? ""
        const page = Number(searchParams.get("page")) ?? 1

        const res = await fetch(`${process.env.TMDB_API_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}&page=${page}`,)
        
        if (!res.ok) throw new Error("Failed to fetch search results")
        
        const data = await res.json() as TmdbMultiSearchResponse

        const response = {
            ...data, 
            results: data.results.map(item => (
                item.media_type === "person" 
                ? {
                ...item, 
                profile_path: item.profile_path ? process.env.TMDB_API_IMG_BASE_URL +  item.profile_path : "/assets/img/default_pp.png",
                } 
                : {
                ...item, 
                poster_path : item.poster_path ? process.env.TMDB_API_IMG_BASE_URL +  item.poster_path : "/assets/img/poster_fallback.webp",
                backdrop_path : item.backdrop_path  ? process.env.TMDB_API_BANNER_BASE_URL + item.backdrop_path : "/assets/img/backdrop_fallback.webp",
                }
            )),
            nextPage: data.page < data.total_pages ? data.page + 1 : undefined,
        }

        return NextResponse.json(response)

    } catch (error) {
        console.log("Error : ", error)
        return NextResponse.json({
            error
        }, { status: 500 })
    }
}
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl

        const query = searchParams.get("query") ?? ""

        const validType = ["multi", "movie", "tv"]
        const rawType = searchParams.get("type") || "multi"
        const type = validType.includes(rawType) ? rawType : "multi"

        const rawPage = Number(searchParams.get("page"))
        const page = Math.abs(rawPage) || 1

        const res = await fetch(`${process.env.TMDB_API_BASE_URL}/search/${type}?query=${encodeURIComponent(query)}&api_key=${process.env.TMDB_API_KEY}&page=${page}`)

        
        if (!res.ok) throw new Error("Failed to fetch search results")
        
        const data = await res.json()

        return NextResponse.json(data)

    } catch (error) {
        console.log("Error : ", error)
        return NextResponse.json({
            error
        }, { status: 500 })
    }
}
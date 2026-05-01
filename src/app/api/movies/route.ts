import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl
        const pageRequest = Number(searchParams.get("page")) || 1
        const endpoint = searchParams.get("endpoint") || "/movie/popular"
        const limit = Number(searchParams.get("limit")) || 10
        const isInfinite = searchParams.get("infinite") == "true"

        const chain = endpoint.includes("?") ? "&" : "?"

        const res = await fetch(`${process.env.TMDB_API_BASE_URL}${endpoint}${chain}page=${pageRequest}&api_key=${process.env.TMDB_API_KEY}`)
        if(!res.ok) return NextResponse.json({
            error: res.statusText
        }, { status: res.status })
        
        const { results, page, total_pages } = await res.json()
        const data = results.slice(0, limit)

        const response = isInfinite 
        ? { results: data, page, total_pages }
        : { 
            results: data, 
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

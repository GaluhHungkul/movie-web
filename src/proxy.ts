import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

const protectedRoutesWithNoToken = ["/movies/detail", "/myprofile"]
const protectedRoutesUnderStandardPlan = ["/showmore/top_rated"]


export async function proxy(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) 
    // if(!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    const { pathname } = req.nextUrl

    const isProtected = protectedRoutesWithNoToken.some(prefix => pathname.startsWith(prefix))

    if(isProtected && !token) return NextResponse.redirect(new URL("/", req.url))

    const isUnderStandarPlan = token?.subscribePlanTitle === "Basic Plan" || !token?.isSubscribe
    const isProtected2 = protectedRoutesUnderStandardPlan.some(prefix => pathname.startsWith(prefix))

    if(isUnderStandarPlan && isProtected2) return NextResponse.redirect(new URL("/movies", req.url))

}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|assets).*)"
  ]
}
import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret })
        if(!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

        const pricings = await prisma.subscribePlan.findMany()

        return NextResponse.json({ pricings })

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500})
    }
}

export async function POST(req:NextRequest) {
    try {
        const token = await getToken({ req, secret })
        if(!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

        const { subscribePlanId } = await req.json()
        if(!subscribePlanId) return NextResponse.json({ message: "Invalid body request"}, { status: 400})
        
        const subscribePlan = await prisma.subscribePlan.findFirst({ where: { id: subscribePlanId } })
        if(!subscribePlan) return NextResponse.json({ message: "Product not Found"}, { status: 404 })
            
        await prisma.user.update({
            where: { id: token.id },
            data: {
                isSubscribe: true, 
                startedSubscribeAt: new Date(), 
                expiredSubscribeAt: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
                subscribePlanId,
                subscribePlanTitle: subscribePlan.title
            }
        })        

        return NextResponse.json({ message: "Successfully buy a plan."})

    } catch (error) {
        console.log("Error : " , error)
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500})
    }
}


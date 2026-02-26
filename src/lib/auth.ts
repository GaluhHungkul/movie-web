import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import { compare } from "bcrypt"

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : { label : "Email", type : "email" },
                password : { label : "Password", type : "password" }
            },
            async authorize(credentials) {
                try {
                    if(!credentials) return null
                    const { email, password } = credentials
                    const currUser = await prisma.user.findUnique({ 
                        where : { email },
                        // include : {
                        //     favoritesMovie : true
                        // }
                    })
                    if(!currUser || !currUser.password) return null

                    const isValidPassword = await compare(password, currUser.password)
                    if(!isValidPassword) return null

                    return {
                        id : currUser.id,
                        name : currUser.name,
                        email : currUser.email,
                        image : currUser.image,
                        isSubscribe: currUser.isSubscribe,
                        subscribePlanTitle: currUser.subscribePlanTitle
                        // favoritesMovie : currUser.favoritesMovie
                    }

                } catch (error) {
                    console.log("Error : " , error)
                    return null
                }
            }
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    session : {
        strategy : "jwt"
    },
    // pages : {
    //     signIn : "/login"
    // },
    callbacks : {
        async signIn({ account, user }) {
            const { name, email } = user
            if(!(name && email )) return false
            if(account?.provider === "google") {
                const currUser = await prisma.user.findUnique({ where : { email } })
                if(!currUser) {
                    await prisma.user.create({ data : { 
                        name, email, 
                        oauthProvider : "google",
                        favoritesMovie : {
                            create: []
                        }
                    }})
                }
            }
            return true
        },
        async jwt({ token, user }) {
            if(token.email) {
                const currUser = await prisma.user.findUnique({ 
                    where : { email : token.email ?? "" },
                    // include : {
                    //     favoritesMovie : true
                    // }
                }) 
                if(currUser) {
                    const { id, name, email, image, isSubscribe, subscribePlanTitle }  = currUser
                    token.id = id
                    token.name = name
                    token.email= email
                    token.image = image
                    token.isSubscribe = isSubscribe
                    token.subscribePlanTitle = subscribePlanTitle
                    // token.favoritesMovie = favoritesMovie
                }
            }
            if(user) {
                // token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
                token.isSubscribe = user.isSubscribe
                token.subscribePlanTitle = user.subscribePlanTitle
                // token.favoritesMovie = user.favoritesMovie
            }
            return token
        },
        async session({ session, token : { id, name, email, image, isSubscribe, subscribePlanTitle } }) {
            if(session.user) {
                session.user.id = id!
                session.user.name = name!
                session.user.email = email!
                session.user.image = image!
                session.user.isSubscribe = isSubscribe
                session.user.subscribePlanTitle = subscribePlanTitle
                // session.user.favoritesMovie = favoritesMovie
            }
            return session
        }
    }
}
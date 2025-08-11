import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProviders from "next-auth/providers/google"
import { prisma } from "./prisma"
import { compare } from "bcrypt"

export const authOptions : NextAuthOptions = {
    providers : [
        GoogleProviders({
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
                    console.log({email, password})
                    const currUser = await prisma.user.findFirst({ where : { email } })
                    if(!currUser) return null
                    
                    const isValidPassword = await compare(password, currUser.password!)
                    if(!isValidPassword) return null

                    return {
                        id : currUser.id,
                        name : currUser.name,
                        email : currUser.email,
                        image : currUser.image,
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
    pages : {
        signIn : "/login"
    },
    callbacks : {
        async signIn({ account, user }) {
            const { name, email } = user
            if(!(name && email )) return false
            if(account?.provider === "google") {
                const currUser = await prisma.user.findFirst({ where : { email } })
                if(!currUser) {
                    await prisma.user.create({ data : { 
                        name, email, oauthProvider : "google",
                    }})
                }
            }
            return true
        },
        async jwt({ token, user }) {

            if(user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.image = user.image
            }

            return token
        },
        async session({ session, token : { id, name, email, image } }) {
            if(session.user) {
                session.user.id = id!
                session.user.name = name!
                session.user.email = email!
                session.user.image = image!
            }
            return session
        }
    }
}
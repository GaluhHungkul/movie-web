"use client"
import React from 'react'
import PhotoProfile from './PhotoProfile'
import { User } from '@prisma/client'

const HeaderProfile = ({ data } : { data : User | null }) => {

  return (
    <header>
        <h1 className="font-semibold text-xl text-center lg:mt-0 ">My Profile</h1>
        <div>
            <PhotoProfile image={data?.image}/>
            <section className='text-center text-white/70 font-semibold md:text-lg lg:text-xl'>
                <p>ID : {data?.id}</p>
                <p>Name : {data?.name}</p>
                <p>Email : {data?.email}</p>
            </section>
        </div>
    </header>
  )
}

export default HeaderProfile
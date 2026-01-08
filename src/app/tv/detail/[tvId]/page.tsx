import DetailMovie from '@/components/detailMoviePage/DetailMovie'
import React, { FC } from 'react'

type Props = {
  params : Promise<{
    tvId : string
  }>
}

const DetailTvPage : FC<Props>= async ({ params }) => {

  return <DetailMovie movieId={(await params).tvId} tv/>
}

export default DetailTvPage
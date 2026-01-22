import DetailMovie from "@/components/detailMoviePage/DetailMovie"

export async function generateMetadata(props:{
  params: Promise<{ movieId: string }>
}) {
  const { movieId } = await props.params

  const res = await fetch(`${process.env.TMDB_API_BASE_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`)

  const data = await res.json()

  return {
    title: data.title ?? `Detail Movie ${movieId}`,
    description: data.title ?? `Detail Movie ${movieId}`
  }
}

const DetailMoviePage = async ({ params } : { params : Promise<{ movieId : string }> }) => {    


  return <DetailMovie movieId={(await params).movieId}/>
}

export default DetailMoviePage
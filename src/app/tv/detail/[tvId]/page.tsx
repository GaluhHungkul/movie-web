import DetailMovie from '@/components/detailMoviePage/DetailMovie'

type Props = {
  params : Promise<{
    tvId : string
  }>
}

export async function generateMetadata(props:{
  params: Promise<{ tvId: string }>
}) {
  const { tvId } = await props.params

  const res = await fetch(`${process.env.TMDB_API_BASE_URL}/tv/${tvId}?api_key=${process.env.TMDB_API_KEY}`)

  const data = await res.json()
  console.log(data)
  return {
    title: data.name ? `TV | ${data.name}` : `Detail TV`,
    description: data.name ? `TV | ${data.name}` : `Detail TV`
  }
}

const DetailTvPage = async ({ params }: Props) => {

  return <DetailMovie movieId={(await params).tvId} tv/>
}

export default DetailTvPage
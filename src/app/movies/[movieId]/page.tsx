import DetailMovie from "@/components/detailMoviePage/DetailMovie"

const DetailMoviePage = async (props : { params : Promise<{ movieId : string }> }) => {    

  const params = await props.params

  return <DetailMovie movieId={params.movieId}/>
}

export default DetailMoviePage
import DetailMovie from "@/components/detailMoviePage/DetailMovie"

const DetailMoviePage = async ({ params } : { params : Promise<{ movieId : string }> }) => {    


  return <DetailMovie movieId={(await params).movieId}/>
}

export default DetailMoviePage
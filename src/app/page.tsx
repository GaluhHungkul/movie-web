import Banner from "@/components/common/Banner";
import SwiperMovieList from "@/components/homePage/SwiperMovieList";

const MOVIES_IN_DASHBOARD = [
  {
    title : "Populer Movies",
    href : "/",
    endpoint : {
      type : "movie",
      category : "popular"
    }
  },
  {
    title : "Top Rated Movies",
    href : "/",
    endpoint : {
      type : "movie",
      category : "top_rated"
    }
  },
  {
    title : "Upcoming Movies",
    href : "/",
    endpoint : {
      type : "movie",
      category : "upcoming"
    }
  },
]

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="mt-10">
        {MOVIES_IN_DASHBOARD.map(({ title, href, endpoint }, i) => (
          <SwiperMovieList title={title} href={href} endpoint={endpoint} key={i}/>
        ))}
      </div>
    </div>
  );
}

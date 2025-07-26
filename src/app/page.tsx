import Banner from "@/components/homePage/Banner";
import SwiperMovieList from "@/components/homePage/SwiperMovieList";

const MOVIES_IN_DASHBOARD = [
  {
    title : "Populer Movies",
    href : "/",
    endpoint : "/movie/popular",
  },
  {
    title : "Top Rated Movies",
    href : "/",
    endpoint : "/movie/top_rated",
  },
  {
    title : "Upcoming Movies",
    href : "/",
    endpoint : "/movie/upcoming",
  },
]

export default function Home() {
  return (
    <div>
      <Banner />
      <div className="mt-10">
        {MOVIES_IN_DASHBOARD.map(({ title, href, endpoint }, i) => (
          <SwiperMovieList title={title} href={href} endpoint={endpoint} key={i} isReverse={i % 2 === 0}/>
        ))}
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";

export const useMovieBannerQuery = () => {
  return useQuery({
    queryKey: ["movie_banner"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
};

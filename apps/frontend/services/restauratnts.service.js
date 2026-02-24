import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function getAll() {
    return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`, fetcher);
}

function getOnline(position) {
    const key = position
        ? `${process.env.NEXT_PUBLIC_API_URL}/restaurants/online?lat=${position.lat}&lng=${position.lng}`
        : null; // 👈 SWR ne fetch pas si null
    
      return useSWR(key, fetcher);
}
function getOne(slug) {
    return useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${slug}`,
        fetcher,
    );
}

export const RestaurantService = { getAll, getOne, getOnline };

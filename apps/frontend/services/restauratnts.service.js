import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function getAll() {
    return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`, fetcher);
}

function getOne(slug) {
    return useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${slug}`,
        fetcher
    );
}

export const RestaurantService = { getAll, getOne };


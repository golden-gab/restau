import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function getAll() {
    return useSWR(`${process.env.NEXT_PUBLIC_API_URL}/specialities`, fetcher);
}

function getOne(id) {
    return useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/specialities/${id}`,
        fetcher
    );
}

export const SpecialityService = { getAll, getOne };


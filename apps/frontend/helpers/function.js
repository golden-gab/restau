export function haversineDistance(coord1, coord2) {
    const R = 6371; // Rayon de la Terre en km
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];

    // Conversion en radians
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en km
}

export function kFormatter(num, digits = 1) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast((item) => num >= item.value);
    return item
        ? (num / item.value)
              .toFixed(digits)
              .replace(regexp, "")
              .concat(item.symbol)
        : "0";
}

export function handleChange(e, data, setData) {
    const val = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: val });
}

export function formatNombre(nbr) {
    if (typeof nbr === "number") nbr = nbr.toString();
    // Sépare la partie entière et la partie décimale
    const [entier, decimal] = nbr.split(".");
    let retour = "";
    let count = 0;
    for (let i = entier.length - 1; i >= 0; i--) {
        if (count !== 0 && count % 3 === 0) retour = entier[i] + " " + retour;
        else retour = entier[i] + retour;
        count++;
    }
    // Ajoute la partie décimale si elle existe
    return decimal ? `${retour}.${decimal}` : retour;
}
export function tarif(nbr) {
    var res = formatNombre(nbr) + " FCFA";

    return res;
}

export function seeMore(description, maxLength = 120) {
    if (!description) return "";
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + "…";
}

export const fetcher = (url) => fetch(url).then((res) => res.json());

export async function sendRequest(url, { arg }) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
            'Accept': "application/ld+json",
        },
        body: JSON.stringify(arg),
    }).then((res) => res.json());
}

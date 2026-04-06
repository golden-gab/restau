import RestoClient from "./RestoClient";
import { formatOpeningHours } from "@/helpers/formatHours";

async function getRestaurant(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants/${slug}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const restaurant = await getRestaurant(slug);
    if (!restaurant) return { title: "Restaurant introuvable" };

    return {
        title: `${restaurant.name} - Restaurant ${restaurant.ville ?? "Cameroun"} | Menu & Commande`,
        description: `Commandez chez ${restaurant.name} à ${restaurant.ville ?? "Cameroun"}. ${restaurant.description ?? ""}. Livraison disponible.`,
        openGraph: {
            title: `${restaurant.name} - ${restaurant.ville ?? "Cameroun"}`,
            images: restaurant.logoPath
                ? [`${process.env.NEXT_PUBLIC_STORAGE_URL}/${restaurant.logoPath}`]
                : [],
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/restaurants/${slug}`,
        },
    };
}

const Page = async ({ params }) => {
    const { slug } = await params; 
    const restaurant = await getRestaurant(slug);

    const jsonLd = restaurant ? {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": restaurant.name,
        "description": restaurant.description ?? undefined,
        "url": `${process.env.NEXT_PUBLIC_APP_URL}/restaurants/${slug}`,
        "telephone": restaurant.phone ?? undefined,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": restaurant.address ?? undefined,
            "addressLocality": restaurant.ville ?? undefined,
            "addressCountry": "CM"
        },
        ...(restaurant.latitude && restaurant.longitude && {
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": restaurant.latitude,
                "longitude": restaurant.longitude
            }
        }),
        "openingHours": formatOpeningHours(restaurant.openingHours),
        "hasMenu": {
            "@type": "Menu",
            "name": "Menu digital",
            "url": `${process.env.NEXT_PUBLIC_APP_URL}/restaurants/${slug}`
        },
        "servesCuisine": restaurant.specialities?.map(s => s.designation) ?? "Camerounaise",
        ...(restaurant.logoPath && {
            "image": `${process.env.NEXT_PUBLIC_STORAGE_URL}/${restaurant.logoPath}`
        }),
    } : null;

    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <RestoClient slug={slug} />
        </>
    );
};

export default Page;
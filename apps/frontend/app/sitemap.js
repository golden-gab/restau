export default async function sitemap() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/restaurants`, {
        next: { revalidate: 3600 },
    });
    const data = res.ok ? await res.json() : { member: [] };
    const restaurants = data.member ?? [];
    
    const staticPages = [
        {
            url: "https://mealop.com",
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1.0,
        },
        {
            url: "https://mealop.com/register",
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: "https://mealop.com/about",
            changeFrequency: "monthly",
            priority: 0.5,
        },
        {
            url: "https://mealop.com/conditions",
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: "https://mealop.com/politique",
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    const restaurantPages = restaurants.map((r) => ({
        url: `https://mealop.com/restaurants/${r.slug}`,
        lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...staticPages, ...restaurantPages];
}

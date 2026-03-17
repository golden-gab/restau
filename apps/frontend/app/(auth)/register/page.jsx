import Register from "./register";

export const metadata = {
    title: "Inscription - Créez votre restaurant en ligne | Mealop",
    description:
        "Rejoignez Mealop et créez votre restaurant en ligne en quelques minutes. Gérez votre menu, recevez des commandes via WhatsApp et développez votre activité au Cameroun.",
    openGraph: {
        title: "Créez votre restaurant en ligne | Mealop",
        description:
            "Rejoignez des centaines de restaurants camerounais sur Mealop.",
        images: ["/logo1.png"],
    },
    alternates: {
        canonical: "https://mealop.com/register",
    },
    robots: {
        index: false,
        follow: false,
    },
};

const Page = () => {
    return <Register />;
};

export default Page;

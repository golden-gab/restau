import { Geist, Geist_Mono, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// import "@flaticon/flaticon-uicons/css/regular/rounded.css";
// import "@flaticon/flaticon-uicons/css/brands/all.css";
// import "@flaticon/flaticon-uicons/css/solid/rounded.css";
import IconsLoader from "@/components/shared/iconsLoader/iconsLoader";

const fontTitle = Montserrat({
    variable: "--font1",
    subsets: ["latin"],
    display: "swap", // ← ajouter
    preload: true,
});
const fontText = Roboto({
    variable: "--font2",
    subsets: ["latin"],
    display: "swap",
});

export const metadata = {
    title: "Mealop",
    description:
        "Une solution simple et efficace pour digitaliser vos menus, gérer vos commandes via WhatsApp et suivre vos commandes en toute sérénité.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossOrigin=""
                /> */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-6QFGRW5ML0"
                ></script>
                <script>
                    window.dataLayer = window.dataLayer || []; function gtag()
                    {dataLayer.push(arguments)}
                    gtag('js', new Date()); gtag('config', 'G-6QFGRW5ML0');
                </script>
            </head>
            <body className={`${fontTitle.variable} ${fontText.variable}`}>
                <IconsLoader />
                <Toaster position="top-right" richColors expand={true} />
                {children}
            </body>
        </html>
    );
}

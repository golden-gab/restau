import React from "react";
import "./horaires.css";

const Horaires = () => {
    const week = [
        { day: "Lundi", open_at: "08:00", close_at: "22:00" },
        { day: "Mardi", open_at: "08:00", close_at: "22:00" },
        { day: "Mercredi", open_at: "08:00", close_at: "22:00" },
        { day: "Jeudi", open_at: "08:00", close_at: "22:00" },
        { day: "Vendredi", open_at: "08:00", close_at: "23:00" },
        { day: "Samedi", open_at: "09:00", close_at: "23:00" },
        { day: "Dimanche", open_at: "09:00", close_at: "21:00" },
    ];
    let date = new Date();
    return (
        <section id="horaires">
            <h3 className="main-color">- Horaires du restaurant</h3>
            <div className="horaires-grid">
                {week.map((item, idx) => (
                    <HoraireCard key={idx} data={item} index={idx + 1} />
                ))}
            </div>
        </section>
    );
};

export default Horaires;

function HoraireCard({ data, index }) {
    let date = new Date();
    // Conversion des heures en minutes pour comparaison
    const now = date.getHours() * 60 + date.getMinutes();
    const open =
        parseInt(data.open_at.split(":")[0], 10) * 60 +
        parseInt(data.open_at.split(":")[1], 10);
    const close =
        parseInt(data.close_at.split(":")[0], 10) * 60 +
        parseInt(data.close_at.split(":")[1], 10);

    // Vérifie si c'est le jour courant
    const isToday = date.getDay() === index;

    // Statut ouvert/fermé
    const isOpen = isToday && now >= open && now < close;

    return (
        <div className={`${isToday ? "horaire-card active" : "horaire-card"}`}>
            {isToday && (
                <span
                    className={`horaire-statut ${isOpen ? "open" : "closed"}`}
                >
                    {isOpen ? "Ouvert" : "Fermé"}
                </span>
            )}

            <h3 className="horaire-day">{data.day}</h3>
            <p className="horaire-hour">
                {data.open_at} - {data.close_at}
            </p>
        </div>
    );
}

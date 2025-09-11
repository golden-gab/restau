import React from "react";
import "./horaires.css";

const Horaires = ({ week }) => {
    console.log(week);
    // const week = [
    //     { day: "Lundi", opens_at: "08:00", closes_at: "22:00" },
    //     { day: "Mardi", opens_at: "08:00", closes_at: "22:00" },
    //     { day: "Mercredi", opens_at: "08:00", closes_at: "22:00" },
    //     { day: "Jeudi", opens_at: "08:00", closes_at: "22:00" },
    //     { day: "Vendredi", opens_at: "08:00", closes_at: "23:00" },
    //     { day: "Samedi", opens_at: "09:00", closes_at: "23:00" },
    //     { day: "Dimanche", opens_at: "09:00", closes_at: "21:00" },
    // ];
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

    // Vérifie si c'est le jour courant
    const open =
        data.opens_at && data.closes_at
            ? parseInt(data.opens_at.split(":")[0], 10) * 60 +
              parseInt(data.opens_at.split(":")[1], 10)
            : "";
    const close =
        data.opens_at && data.closes_at
            ? parseInt(data.closes_at.split(":")[0], 10) * 60 +
              parseInt(data.closes_at.split(":")[1], 10)
            : "";
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
            {data.opens_at && data.closes_at ? (
                <p className="horaire-hour">
                    {data.opens_at} - {data.closes_at}
                </p>
            ) : (
                <span className={``}></span>
            )}
        </div>
    );
}

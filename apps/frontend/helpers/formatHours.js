// helpers/formatHours.js
export function formatOpeningHours(openingHours) {
    if (!openingHours) return [];
    
    const days = {
        monday: "Mo", tuesday: "Tu", wednesday: "We",
        thursday: "Th", friday: "Fr", saturday: "Sa", sunday: "Su"
    };

    return Object.entries(openingHours)
        .filter(([_, hours]) => hours?.open && hours?.close)
        .map(([day, hours]) => `${days[day]} ${hours.open}-${hours.close}`)
    // → ["Mo 08:00-22:00", "Tu 08:00-22:00", ...]
}
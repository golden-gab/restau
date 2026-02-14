import { create } from "zustand";

export const useMapFilterStore = create((set, get) => ({
    isOpen: false,
    selectedSpecialities: [],

    openFilter: () => set({ isOpen: true }),
    closeFilter: () => set({ isOpen: false }),
    toggleFilter: () => set(state => ({ isOpen: !state.isOpen })),

    toggleSpeciality: (specialityId) =>
        set(state => {
            const exists = state.selectedSpecialities.includes(specialityId);

            return {
                selectedSpecialities: exists
                    ? state.selectedSpecialities.filter(id => id !== specialityId)
                    : [...state.selectedSpecialities, specialityId],
            };
        }),

    resetFilters: () =>
        set({
            selectedSpecialities: [],
        }),
    
   
}))
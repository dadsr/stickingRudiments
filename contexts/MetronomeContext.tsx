import React, { createContext, useContext } from "react";
import { useMetronome } from "../hooks/useMetronome";

export const MetronomeContext = createContext<ReturnType<typeof useMetronome> | undefined>(undefined);

export const MetronomeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const metronome = useMetronome();

    return (
        <MetronomeContext.Provider value={metronome}>
            {children}
        </MetronomeContext.Provider>
    );
};

export const useMetronomeContext = () => {
    const context = useContext(MetronomeContext);
    if (!context) {
        throw new Error('useMetronomeContext must be used within a MetronomeProvider');
    }
    return context;
};

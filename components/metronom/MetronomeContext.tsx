import React, {createContext, ReactNode, useContext} from "react";
import {useMetronome} from "../../hooks/useMetronome";
import {PatternNote} from "../../modals/types";

type MetronomeContextType = ReturnType<typeof useMetronome>;

 interface MetronomeProviderProps{
     children: ReactNode;
     pattern: PatternNote[];
     initialTempo: number;
 }

const MetronomeContext = createContext<MetronomeContextType | undefined>(undefined);

export const MetronomeProvider = ({ children, pattern, initialTempo }: MetronomeProviderProps) => {
    const metronome = useMetronome(pattern, initialTempo);
    return (
        <MetronomeContext.Provider value={metronome}>
            {children}
        </MetronomeContext.Provider>
    );
};

export const useMetronomeContext = () => {
    const context = useContext(MetronomeContext);
    if (!context) {
        throw new Error("useMetronomeContext must be used within a MetronomeProvider");
    }
    return context;
};

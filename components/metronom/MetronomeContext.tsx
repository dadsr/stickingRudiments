import React, {createContext, useContext, ReactNode, JSX} from "react";
import { useMetronome } from "../../hooks/useMetronome";
import {Limb} from "../../modals/types";

type MetronomeContextType = ReturnType<typeof useMetronome>;

 interface metronomeProps{
     children: ReactNode;
     pattern: Limb[];
 }

const MetronomeContext = createContext<MetronomeContextType | undefined>(undefined);

export const MetronomeProvider = ({ children, pattern }: metronomeProps) => {
    console.log("MetronomeProvider()");

    const metronome = useMetronome(pattern);
    return (
        <MetronomeContext.Provider value={metronome}>
            {children}
        </MetronomeContext.Provider>
    );
};

export const useMetronomeContext = () => {
    console.log("useMetronomeContext()");

    const context = useContext(MetronomeContext);
    if (!context) {
        throw new Error("useMetronomeContext must be used within a MetronomeProvider");
    }
    return context;
};

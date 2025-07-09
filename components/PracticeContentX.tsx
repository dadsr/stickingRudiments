import { useMetronomeContext } from "./metronom/MetronomeContext";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { StickingPattern } from "../modals/StickingPattern";
import { Text } from "react-native-paper";

export default function PracticeContentX() {
    const metronomeContext = useMetronomeContext();
    const [currentPattern, setCurrentPattern] = useState<StickingPattern | null>(null);
    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.pattern) {
            try {
                const selectedPattern: StickingPattern = JSON.parse(params.pattern as string);
                setCurrentPattern(selectedPattern);
                metronomeContext.reset();
                metronomeContext.changeTempo(selectedPattern.tempo);
                metronomeContext.setPatternLength(selectedPattern.pattern.length);
            } catch (error) {
                console.error('Error parsing pattern:', error);
            }
        }
    }, [params.pattern, metronomeContext]);

    const handlePatternSelect = (pattern: StickingPattern) => {
        setCurrentPattern(pattern);
        metronomeContext.reset();
        metronomeContext.changeTempo(pattern.tempo);
        metronomeContext.setPatternLength(pattern.pattern.length);
    };

    return (
        <>
            {currentPattern?.name && <Text>Current Pattern: {currentPattern.name}</Text>}
        </>
    );
}

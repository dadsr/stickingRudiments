import {useMetronomeContext} from "../contexts/MetronomeContext";
import {useEffect, useState} from "react";
import MetronomeControl from "./MetronomeControl";
import {useLocalSearchParams} from "expo-router";
import {StickingPattern} from "../modals/StickingPattern";
import {Text} from "react-native-paper";


export default function PracticeContent() {
    const metronomeContext = useMetronomeContext();
    const [currentPattern, setCurrentPattern] = useState<StickingPattern|null>(null);
    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.pattern){
            try {
                const selectedPattern = JSON.parse(params.pattern as string);
                setCurrentPattern(selectedPattern);
                metronomeContext.reset();
                metronomeContext.initialPattern(selectedPattern.tempo, selectedPattern.pattern.length);
            } catch (error) {
                console.error('Error parsing pattern:', error);
            }
        }
    },[params.pattern, metronomeContext]);

    const handlePatternSelect = (pattern: StickingPattern) => {
        setCurrentPattern(pattern);
        metronomeContext.reset();
        metronomeContext.initialPattern(pattern.tempo, pattern.pattern.length);
    };


    return (
        <>
            {currentPattern?.name && <Text>Current Pattern: {currentPattern.name}</Text>}
            <MetronomeControl />
        </>
    );
}

import { useEffect, useRef, useState } from 'react';
import { Limb } from "../modals/types";

export const useMetronome = (pattern: Limb[]) => {
    const [isPlaying, setIsPlaying] = useState<'play' | 'pause'>('pause');
    const [tempo, setTempo] = useState(0);
    const [patternLength, setPatternLength] = useState(0);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [currentLimb, setCurrentLimb] = useState<Limb | null>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Update currentLimb when pattern or currentBeat changes
    useEffect(() => {
        if (pattern.length > 0) {
            setCurrentLimb(pattern[currentBeat]);
        } else {
            setCurrentLimb(null);
        }
    }, [pattern, currentBeat]);

    // Reset currentBeat and currentLimb when pattern changes
    useEffect(() => {
        setCurrentBeat(0);
        setCurrentLimb(pattern.length ? pattern[0] : null);
    }, [pattern]);

    // Metronome interval
    useEffect(() => {
        if (isPlaying === 'play' && tempo > 0 && pattern.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentBeat(prev => (prev + 1) % pattern.length);
            }, (60 / tempo) * 1000);

            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [isPlaying, tempo, pattern]);

    const start = () => setIsPlaying('play');
    const stop = () => setIsPlaying('pause');
    const togglePlay = () => setIsPlaying(prev => (prev === 'play' ? 'pause' : 'play'));
    const changeTempo = (newTempo: number) => setTempo(newTempo);

    const reset = () => {
        setIsPlaying('pause');
        setTempo(0);
        setPatternLength(0);
        setCurrentBeat(0);
        setCurrentLimb(pattern.length ? pattern[0] : null);
    };

    return {
        isPlaying,
        start,
        stop,
        togglePlay,
        tempo,
        changeTempo,
        patternLength,
        setPatternLength,
        currentBeat,
        currentLimb,
        reset,

    };
};

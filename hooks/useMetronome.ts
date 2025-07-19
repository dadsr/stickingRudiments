import {useCallback, useEffect, useRef, useState} from 'react';
import {Limb, PatternNote} from "../modals/types";

export const useMetronome = (pattern: PatternNote[], initialTempo: number = 0) => {
    const [isPlaying, setIsPlaying] = useState<'play' | 'pause'>('pause');
    const [tempo, setTempo] = useState(initialTempo);
    const [patternLength, setPatternLength] = useState(0);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [currentNote, setCurrentNote] = useState<PatternNote | null>(null);
    const [currentLimb, setCurrentLimb] = useState<Limb | null>(null);
    const [currentAccent, setCurrentAccent] = useState<boolean | null>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTempo(initialTempo);
    }, [initialTempo]);

    useEffect(() => {
        if (pattern.length > 0 && currentBeat < pattern.length) {
            setCurrentNote(pattern[currentBeat]);
            setPatternLength(pattern.length);
            setCurrentLimb(pattern[currentBeat].limb);
            setCurrentAccent(pattern[currentBeat].accent);
        } else {
            setCurrentNote(null);
            setPatternLength(0);
            setCurrentLimb(null);
            setCurrentAccent(null);
        }
    }, [pattern, currentBeat]);

    useEffect(() => {
        if (isPlaying === 'play' && tempo > 0 && pattern.length > 0) {
            intervalRef.current = setInterval(() => {
                setCurrentBeat(prev => (prev + 1) % pattern.length);
            }, (60 / tempo) * 1000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [isPlaying, tempo, pattern.length]);

    const start = () => setIsPlaying('play');

    const stop = () => {
        setIsPlaying('pause');
        setCurrentBeat(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const togglePlay = () => setIsPlaying(prev => (prev === 'play' ? 'pause' : 'play'));

    const changeTempo = useCallback((newTempo: number) => {
        setTempo(newTempo);
    }, []);

    const reset = () => {
        setIsPlaying('pause');
        setTempo(0);
        setPatternLength(0);
        setCurrentBeat(0);
        setCurrentNote(null);
        setCurrentLimb(null);
        setCurrentAccent(null);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
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
        currentNote,
        currentLimb,
        currentAccent,
        reset,
    };
};

import { useEffect, useRef, useState } from 'react';
import {Limb, PatternNote} from "../modals/types";

export const useMetronome = (pattern: PatternNote[]) => {
    const [isPlaying, setIsPlaying] = useState<'play' | 'pause'>('pause');
    const [tempo, setTempo] = useState(0);
    const [patternLength, setPatternLength] = useState(0);
    const [currentBeat, setCurrentBeat] = useState(0);
    const [currentNote, setCurrentNote] = useState<PatternNote | null>(null);
    const [currentLimb, setCurrentLimb] = useState<Limb | null>(null);
    const [currentAccent, setCurrentAccent] = useState<boolean | null>(null);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Update currentLimb when pattern or currentBeat changes
    useEffect(() => {
        if (pattern.length > 0) {
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

    // Reset currentBeat and currentLimb when pattern changes
    // useEffect(() => {
    //     setCurrentBeat(0);
    //     setCurrentNote(pattern.length ? pattern[0] : null);
    // }, [pattern]);

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
    const stop = () => {
        setIsPlaying('pause');
        setCurrentBeat(0);
        setCurrentNote(null);
        setCurrentLimb(null);
        setCurrentAccent(null);
    }
    const togglePlay = () => setIsPlaying(prev => (prev === 'play' ? 'pause' : 'play'));
    const changeTempo = (newTempo: number) => setTempo(newTempo);

    const reset = () => {
        setIsPlaying('pause');
        setTempo(0);
        setPatternLength(0);
        setCurrentBeat(0);
        setCurrentNote(null);
        setCurrentLimb(null);
        setCurrentAccent(null);
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

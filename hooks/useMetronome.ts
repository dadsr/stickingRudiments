import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

export const useMetronome = () => {
    console.log("useMetronome()");

    const [isPlaying, setIsPlaying] = useState<'play' | 'pause'>('pause');

    const [tempo, setTempo] = useState(0);
    const [patternLength, setPatternLength] = useState(0);

    const [currentBeat, setCurrentBeat] = useState(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const beatRef = useRef(0);


    const initialPattern = useCallback((tempo: number, patternLength: number) => {
        console.log("useMetronome - initialPattern");

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        setTempo(tempo);
        setPatternLength(patternLength);
        setIsPlaying('pause');
        beatRef.current = 0;
        console.log(`tempo: ${tempo}, patternLength: ${patternLength}`,`isPlaying: ${isPlaying}, currentBeat: ${currentBeat}`);
    }, []);

    const stopMetronome = useCallback(() => {
        console.log("useMetronome - stopMetronome");
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsPlaying('pause');
    }, []);

    const startMetronome = useCallback(() => {
        console.log("useMetronome - startMetronome");
        if (intervalRef.current || tempo <= 0) return;

        const interval = (60 / tempo) * 1000;

        intervalRef.current = setInterval(() => {
            beatRef.current = (beatRef.current + 1) % patternLength;
            setCurrentBeat(beatRef.current);
        }, interval);

        setIsPlaying('play');
    }, [tempo, patternLength]);

    const togglePlay = useCallback(() => {
        console.log("useMetronome - togglePlay");
        if (isPlaying === 'play') {
            stopMetronome();
        } else {
            startMetronome();
        }
    }, [isPlaying, startMetronome, stopMetronome]);

    const changeTempo = useCallback((newTempo: number) => {
        console.log("useMetronome - changeTempo");
        setTempo(newTempo);

        setIsPlaying(current => {
            if (current === 'play') {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
            return current;
        });
    }, []);

    const reset = useCallback(() => {
        console.log("useMetronome - reset");

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // Reset all state to initial values
        setIsPlaying('pause');
        setTempo(0);
        setPatternLength(0);
        setCurrentBeat(0);
        beatRef.current = 0;
    }, []);

    useEffect(() => {
        if (isPlaying === 'play' && tempo > 0) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            const interval = (60 / tempo) * 1000;
            intervalRef.current = setInterval(() => {
                beatRef.current = (beatRef.current + 1) % patternLength;
                setCurrentBeat(beatRef.current);
            }, interval);
        }
    }, [tempo, isPlaying, patternLength]);

    return useMemo(() => ({
        isPlaying,
        togglePlay,
        tempo,
        changeTempo,
        currentBeat,
        start: startMetronome,
        stop: stopMetronome,
        initialPattern,
        reset,
    }), [
        isPlaying,
        togglePlay,
        tempo,
        changeTempo,
        currentBeat,
        startMetronome,
        stopMetronome,
        initialPattern,
        reset,
    ]);
};

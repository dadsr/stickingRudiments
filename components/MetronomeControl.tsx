import {JSX, useCallback, useEffect, useMemo, useRef} from "react";
import {Card, IconButton} from "react-native-paper";
import Slider from '@react-native-community/slider';
import debounce from 'lodash/debounce';
import {useMetronomeContext} from "../contexts/MetronomeContext";

export default function MetronomeControl(): JSX.Element {
    console.log("MetronomeControl()");
    const metronomeContext = useMetronomeContext();

    const contextRef = useRef(metronomeContext);
    contextRef.current = metronomeContext;

    // Fix: Use the ref inside the debounced function
    const debouncedOnTempoChange = useMemo(
        () => debounce((newTempo: number) => {
            contextRef.current.changeTempo(newTempo);
        }, 100),
        []
    );

    const handlePlayPause = useCallback(() => {
        console.log("MetronomeControl - handlePlayPause");
        if (contextRef.current.isPlaying === "play") {
            contextRef.current.stop();
        } else {
            contextRef.current.start();
        }
    }, []);

    useEffect(() => {
        console.log("MetronomeControl - useEffect");
        return () => {
            debouncedOnTempoChange.cancel();
        };
    }, []);

    return (
        <Card>
            <Card.Title title="MetronomeControl" subtitle={`${metronomeContext.tempo} BPM`} />
            <Card.Content>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={240}
                    step={1}
                    value={metronomeContext.tempo}
                    onValueChange={value => debouncedOnTempoChange(Math.round(value))}
                    minimumTrackTintColor="#6200ee"
                    maximumTrackTintColor="#bdbdbd"
                    thumbTintColor="#6200ee"
                />
            </Card.Content>
            <Card.Actions>
                {(metronomeContext.tempo > 0) && (
                    <IconButton
                        icon={metronomeContext.isPlaying === "play" ? "pause" : "play"}
                        size={28}
                        onPress={handlePlayPause}
                        mode="contained"
                        accessibilityLabel={metronomeContext.isPlaying === "play" ? "pause" : "play"}
                    />
                )}
            </Card.Actions>
        </Card>
    );
}

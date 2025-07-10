import React, { useEffect, useMemo, useRef } from "react";
import Slider from '@react-native-community/slider';
import debounce from "lodash/debounce";
import { useMetronomeContext } from "./MetronomeContext";
import { Card, IconButton } from "react-native-paper";

export default function MetronomeControl() {
    const metronomeContext = useMetronomeContext();
    const contextRef = useRef(metronomeContext);

    // Keep the latest context in ref for use inside debounce
    useEffect(() => {
        contextRef.current = metronomeContext;
        contextRef
    }, [metronomeContext]);

    // Debounced function only created once
    const debouncedOnTempoChange = useMemo(
        () =>
            debounce((newTempo: number) => {
                contextRef.current.changeTempo(newTempo);
            }, 150),
        []
    );

    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedOnTempoChange.cancel();
        };
    }, [debouncedOnTempoChange]);

    // Play/Pause handler
    const handlePlayPause = () => {
        if (metronomeContext.isPlaying === 'play') {
            metronomeContext.stop();
        } else {
            metronomeContext.start();
        }
    };

    return (
        <Card style={{ margin: 12 }}>
            <Card.Title
                title="Metronome"
                subtitle={`${metronomeContext.tempo} BPM`}
            />
            <Card.Content>
                <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={300}
                    step={1}
                    value={metronomeContext.tempo}
                    onValueChange={value => debouncedOnTempoChange(Math.round(value))}
                    minimumTrackTintColor="#6200ee"
                    maximumTrackTintColor="#bdbdbd"
                    thumbTintColor="#6200ee"
                />
            </Card.Content>
            <Card.Actions>
                {metronomeContext.tempo > 0 && (
                    <IconButton
                        icon={metronomeContext.isPlaying === "play" ? "pause" : "play"}
                        size={28}
                        onPress={handlePlayPause}
                        mode="contained"
                        accessibilityLabel={metronomeContext.isPlaying === "play" ? "pause" : "play"}
                        testID="play-pause-button"
                    />
                )}
            </Card.Actions>
        </Card>
    );
}

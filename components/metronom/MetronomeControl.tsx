import React, {useEffect, useState} from "react";
import {useMetronomeContext} from "./MetronomeContext";
import {Card, IconButton, Text} from "react-native-paper";
import Slider from "@react-native-community/slider";

interface metronomeProps {
    initTempo: number;
}

export default function MetronomeControl({ initTempo }: metronomeProps) {
    const metronomeContext = useMetronomeContext();
    const [sliderValue, setSliderValue] = useState(initTempo);

    useEffect(() => {
        if (initTempo > 0) {
            metronomeContext.changeTempo(initTempo);
        }
    }, [initTempo]);

    useEffect(() => {
        setSliderValue(metronomeContext.tempo);
    }, [metronomeContext.tempo]);

    const handleSlidingComplete = (value: number) => {
        metronomeContext.changeTempo(Math.round(value));
    };

    const handlePlayPause = () => {
        if (metronomeContext.isPlaying === 'play') {
            metronomeContext.stop();
        } else {
            metronomeContext.start();
        }
    };

    return (
        <Card>
            <Card.Content>
                {sliderValue > 0 && (
                    <>
                        <Text>Tempo: {Math.round(sliderValue)} BPM</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={40}
                            maximumValue={240}
                            step={1}
                            value={sliderValue}
                            onValueChange={setSliderValue}
                            onSlidingComplete={handleSlidingComplete}
                        />
                    </>
                )}
                <IconButton
                    icon={metronomeContext.isPlaying === 'play' ? 'pause' : 'play'}
                    size={40}
                    iconColor={"#1976d2"}
                    onPress={handlePlayPause}
                />
            </Card.Content>
        </Card>
    );
}

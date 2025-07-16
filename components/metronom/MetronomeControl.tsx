import React, { useEffect, useState, useRef } from "react";
import { useMetronomeContext } from "./MetronomeContext";
import { Card, IconButton, Text } from "react-native-paper";
import { Modal, View, StyleSheet,FlatList, TouchableOpacity } from "react-native";
import BpmRoller from "./BpmRoller";
import {globalStyles} from "../../styles/styles";

interface metronomeProps {
    initTempo: number;
}

export default function MetronomeControl({ initTempo }: metronomeProps) {
    const metronomeContext = useMetronomeContext();
    const [tempoValue, setTempoValue] = useState(initTempo);

    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (initTempo > 0) {
            metronomeContext.changeTempo(initTempo);
        }
    }, [initTempo]);

    useEffect(() => {
        setTempoValue(metronomeContext.tempo);
    }, [metronomeContext.tempo]);


    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const startCountdown = () => {
        setIsCountingDown(true);
        setCountdown(3);

        intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                const nextValue = prevCountdown - 1;
                if (nextValue === 0) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    setIsCountingDown(false);

                    metronomeContext.start();
                }
                return nextValue;
            });
        }, 1000);
    };

    const handleSlidingComplete = (value: number) => {
        metronomeContext.changeTempo(Math.round(value));
    };

    const handlePlayPause = () => {
        if (metronomeContext.isPlaying === 'play' || isCountingDown) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            setIsCountingDown(false);
            metronomeContext.stop();
        } else {
            startCountdown();
        }
    };

    return (
        <Card style={globalStyles.card}>
            <Card.Title titleStyle={globalStyles.title} title="Tempo" />

            <View>
                {/* Countdown Modal */}
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isCountingDown}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.countdownText}>{countdown}</Text>
                        </View>
                    </View>
                </Modal>

                {/* Metronome Controls */}
                {tempoValue > 0 && (
                    <>
                        <BpmRoller
                            selected={tempoValue}
                            onSelect={(value) => {
                                setTempoValue(value);
                                metronomeContext.changeTempo(value);
                            }}
                        />

                    </>
                )}
                <View style={styles.buttonContainer}>
                    <Text>Tempo: {Math.round(tempoValue)} BPM</Text>
                    <IconButton
                        icon={metronomeContext.isPlaying === 'play' ? 'pause' : 'play'}
                        containerColor="#DBD7D2"
                        size={40}
                        iconColor={"#1976d2"}
                        onPress={handlePlayPause}
                    />
                </View>

            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        padding: 50,
        borderRadius: 10,
    },
    countdownText: {
        fontSize: 96,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

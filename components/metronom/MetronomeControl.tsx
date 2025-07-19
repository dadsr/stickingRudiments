import React, {useEffect, useRef, useState} from "react";
import {useMetronomeContext} from "./MetronomeContext";
import {Card, IconButton, Text} from "react-native-paper";
import {ImageBackground, Modal, StyleSheet, View} from "react-native";
import BpmRoller from "./BpmRoller";
import {globalStyles, imageStyles} from "../../styles/styles";
import {theme} from "../../styles/theme";
import {containerImg, metronome} from "../../assets";

interface MetronomeControlProps {
    initTempo: number;
}

export default function MetronomeControl({ initTempo }: MetronomeControlProps) {
    const metronomeContext = useMetronomeContext();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdown, setCountdown] = useState(3);


    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    const startCountdown = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsCountingDown(true);
        setCountdown(3);
        intervalRef.current = setInterval(() => {
            setCountdown((prevCountdown) => {
                const nextValue = prevCountdown - 1;
                if (nextValue === 0) {
                    if (intervalRef.current){
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setIsCountingDown(false);
                    setTimeout(() => {
                        metronomeContext.start();
                    }, 5);
                }
                return nextValue;
            });
        }, 1000);
    };

    const handlePlayPause = () => {
        if (metronomeContext.isPlaying === 'play' || isCountingDown) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            setIsCountingDown(false);
            metronomeContext.stop();
        } else {
            startCountdown();
        }
    };

    return (
        <>
            {/*Countdown Modal*/}
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
            <ImageBackground  source={metronome}  style={imageStyles.background}    resizeMode="stretch" >
                <View>
                    {/* Metronome Controls */}
                    <View style={styles.buttonContainer}>
                        <BpmRoller />

                        <Text>Tempo: {Math.round(metronomeContext.tempo)} BPM</Text>

                        <IconButton
                            icon={metronomeContext.isPlaying === 'play' ? 'pause' : 'play'}
                            containerColor="#DBD7D2"
                            size={40}
                            iconColor={theme.colors.primaryContainer}
                            onPress={handlePlayPause}
                        />
                    </View>
                </View>

                </ImageBackground>

        </>
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

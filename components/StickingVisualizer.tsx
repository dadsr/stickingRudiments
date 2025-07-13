import React, {JSX, useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Card, Surface, Switch, Text} from "react-native-paper";
import {useMetronomeContext} from "./metronom/MetronomeContext";
import {useAudio} from "../hooks/useAudio";
import {Limb, PatternNote} from "../modals/types";

// Define a type for our flash objects to manage visual state
interface Flash {
    id: number; // The beat number ensures each flash is unique
    limb: Limb;
}

// The component now takes the pattern as a prop
interface VisualizerProps {
    pattern: PatternNote[];
}

export default function StickingVisualizer({ pattern }: VisualizerProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const audioContext = useAudio();
    const [flashes, setFlashes] = useState<Flash[]>([]);
    const isKicks = pattern.some(note => note.limb === 'LK' || note.limb === 'RK');
    const [playSounds,setPlaySounds] = useState<boolean>(true);

    useEffect(() => {
        if (metronomeContext.isPlaying === 'pause' || playSounds === false) return;
        switch (metronomeContext.currentLimb) {
            case 'R': audioContext.playRightHandClick(); break;
            case 'L': audioContext.playLeftHandClick(); break;
            case 'RL': audioContext.playBothHandsClick(); break;
            case 'RK': audioContext.playRightKick(); break;
            case 'LK': audioContext.playLeftKick(); break;
            case ' ': audioContext.playNoHandsClick(); break;
            default: break;
        }
    }, [metronomeContext.currentBeat, metronomeContext.isPlaying]);

    // This effect manages the visual "flash" for each beat.
    useEffect(() => {
        if (!metronomeContext.isPlaying || !metronomeContext.currentLimb) {
            setFlashes([]);
            return;
        }

        const currentBeat = metronomeContext.currentBeat;
        const newFlash: Flash = { id: currentBeat, limb: metronomeContext.currentLimb };

        // Add a new flash for the current beat
        setFlashes(prev => [...prev, newFlash]);

        // Schedule the removal of this specific flash to create a timed pulse
        const timer = setTimeout(() => {
            setFlashes(prev => prev.filter(flash => flash.id !== currentBeat));
        }, 150); // The flash will last for 150ms

        // Clean up the timer if the effect re-runs or the component unmounts
        return () => clearTimeout(timer);

    }, [metronomeContext.currentBeat, metronomeContext.isPlaying]);

    const getStatus = (limb: Limb): { active: boolean; accented: boolean } => {
        const flash = flashes.find(flash =>
            flash.limb === limb ||
            (flash.limb === 'RL' && (limb === 'R' || limb === 'L'))
        );
        if (!flash) {
            return { active: false, accented: false };
        }

        const currentNote = pattern[flash.id];
        const accented =
            !!currentNote &&
            (currentNote.limb === limb ||
                (currentNote.limb === 'RL' && (limb === 'R' || limb === 'L'))) &&
            !!currentNote.accent;

        return { active: true, accented };
    };

    const onSoundsToggleSwitch=() => {
        setPlaySounds(!playSounds);
    }
    const renderLimbCard = (limb: Limb, label: string) => {
        const { active, accented } = getStatus(limb);
        return (
            <Card style={active ? styles.activeCard : styles.inactiveCard}>
                <Card.Title title={label} />
                <Card.Content>
                    <Surface style={[styles.surface, active && styles.activeSurface]}>
                        {accented && <Text style={styles.accentMark}>›</Text>}
                        <Text style={[styles.limbText, accented && styles.accentText]}>{limb}</Text>
                    </Surface>
                </Card.Content>
            </Card>
        );
    };

    return (
        <Card style={styles.container}>
            <Card.Title titleStyle={styles.title} title="Visual" />
            <Card.Content style={styles.content}>
                <Switch value={playSounds} onValueChange={onSoundsToggleSwitch} />
                <View style={styles.row}>
                    {renderLimbCard('R', 'Right Hand')}
                    {renderLimbCard('L', 'Left Hand')}
                </View>
                {isKicks && (
                    <View style={styles.row}>
                        {renderLimbCard('RK', 'Right Kick')}
                        {renderLimbCard('LK', 'Left Kick')}
                    </View>
                )}
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2",
    },
    content: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        marginVertical: 12,
    },
    activeCard: {
        width: "48%",
        marginHorizontal: 6,
        borderWidth: 3,
        borderColor: "#1976d2",
        backgroundColor: "rgb(236,242,0)",
    },
    inactiveCard: {
        width: "48%",
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#fff",
    },
    surface: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        marginBottom: 4,
        elevation: 2,
        backgroundColor: "#fff",
        borderRadius: 50,
    },
    activeSurface: {
        elevation: 6,
        backgroundColor: "#fabbfb",
        borderRadius: 25,
    },
    limbText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#1976d2",
    },
    accentText: {
        color: "#e53935",
        textShadowColor: "#fbc02d",
        textShadowRadius: 4,
    },
    accentMark: {
        position: "absolute",
        top: -10,
        left: "50%",
        transform: [{ translateX: -8 }],
        fontSize: 18,
        color: "#e53935",
        fontWeight: "bold",
        zIndex: 2,
    },

});

import React, { useState, useEffect, JSX } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Surface, Text } from "react-native-paper";
import { useMetronomeContext } from "./metronom/MetronomeContext";
import { useAudio } from "../hooks/useAudio";
import { Limb } from "../modals/types";

// Define a type for our flash objects to manage visual state
interface Flash {
    id: number; // The beat number ensures each flash is unique
    limb: Limb;
}

// The component now takes the pattern as a prop
interface VisualizerProps {
    pattern: Limb[];
}

export default function StickingVisualizer({ pattern }: VisualizerProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const audioContext = useAudio();
    const [flashes, setFlashes] = useState<Flash[]>([]);
    const isKicks = pattern.some(limb => limb === 'LK' || limb === 'RK');

    useEffect(() => {
        if (!metronomeContext.isPlaying) return;
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
            setFlashes([]); // Clear flashes when the metronome stops
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

    // `isActive` now checks if there's an active flash for a given limb.
    const isActive = (limb: Limb): boolean => {
        return flashes.some(flash =>
            flash.limb === limb ||
            (flash.limb === 'RL' && (limb === 'R' || limb === 'L'))
        );
    };

    return (
        <Card style={styles.container}>
            <Card.Title titleStyle={styles.title} title="Visual" />
            <Card.Content style={styles.content}>
                <View style={styles.row}>
                    {/* Right Hand */}
                    <Card style={isActive('R') ? styles.activeCard : styles.inactiveCard}>
                        <Card.Title title="Right Hand" />
                        <Card.Content>
                            <Surface style={[styles.surface, isActive("R") && styles.activeSurface]}>
                                <Text style={styles.limbText}>R</Text>
                            </Surface>
                        </Card.Content>
                    </Card>

                    {/* Left Hand */}
                    <Card style={isActive("L") ? styles.activeCard : styles.inactiveCard}>
                        <Card.Title title="Left Hand" />
                        <Card.Content>
                            <Surface style={[styles.surface, isActive("L") && styles.activeSurface]}>
                                <Text style={styles.limbText}>L</Text>
                            </Surface>
                        </Card.Content>
                    </Card>
                </View>

                {/* Kicks */}
                {isKicks && (
                    <View style={styles.row}>
                        {/* Right Kick */}
                        <Card style={isActive('RK') ? styles.activeCard : styles.inactiveCard}>
                            <Card.Title title="Right Kick" />
                            <Card.Content>
                                <Surface style={[styles.surface, isActive("RK") && styles.activeSurface]}>
                                    <Text style={styles.limbText}>RK</Text>
                                </Surface>
                            </Card.Content>
                        </Card>

                        {/* Left Kick */}
                        <Card style={isActive('LK') ? styles.activeCard : styles.inactiveCard}>
                            <Card.Title title="Left Kick" />
                            <Card.Content>
                                <Surface style={[styles.surface, isActive("LK") && styles.activeSurface]}>
                                    <Text style={styles.limbText}>LK</Text>
                                </Surface>
                            </Card.Content>
                        </Card>
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
});

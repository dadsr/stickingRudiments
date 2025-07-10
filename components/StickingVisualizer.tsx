import React, {JSX, useRef} from "react";
import {StyleSheet, View} from "react-native";
import {Card, Surface, Text} from "react-native-paper";
import {useMetronomeContext} from "./metronom/MetronomeContext";
import {useAudio} from "../hooks/useAudio";
import {Limb} from "../modals/types";

interface VisualizerProps{
    isKicks: boolean;
}

export default function StickingVisualizer({ isKicks }: VisualizerProps): JSX.Element {
    console.log("StickingVisualizer()");
    const metronomeContext = useMetronomeContext();
    const audioContext = useAudio();

    const isActive = (limb: Limb) =>
        metronomeContext.isPlaying && (
            metronomeContext.currentLimb === limb ||
            (
                metronomeContext.currentLimb === 'RL' &&
                (
                    limb === 'R' ||
                    limb === 'L'
                )
            )
        );

    React.useEffect(() => {
        if (!metronomeContext.isPlaying) return;
        switch (metronomeContext.currentLimb) {
            case 'R':
                audioContext.playRightHandClick();
                break;
            case 'L':
                audioContext.playLeftHandClick();
                break;
            case 'RL':
                audioContext.playBothHandsClick();
                break;
            case 'RK':
                audioContext.playRightKick();
                break;
            case 'LK':
                audioContext.playLeftKick();
                break;
            default ://' '
                audioContext.playBothHandsClick();
                break;
        }
    }, [metronomeContext.currentLimb, metronomeContext.isPlaying]);

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
                                audioContext.playRightHandClick();
                            </Surface>
                        </Card.Content>
                    </Card>

                    {/* Left Hand */}
                    <Card style={isActive("L") ? styles.activeCard : styles.inactiveCard}>
                        <Card.Title title="Left Hand" />
                        <Card.Content>
                            <Surface style={[styles.surface, isActive("L") && styles.activeSurface]}>
                                <Text style={styles.limbText}>L</Text>
                                audioContext.playLeftHandClick();
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
                                    audioContext.playRightKick();
                                </Surface>
                            </Card.Content>
                        </Card>

                        {/* Left Kick */}
                        <Card style={isActive('LK') ? styles.activeCard : styles.inactiveCard}>
                            <Card.Title title="Left Kick" />
                            <Card.Content>
                                <Surface style={[styles.surface, isActive("LK") && styles.activeSurface]}>
                                    <Text style={styles.limbText}>LK</Text>
                                    audioContext.playLeftKick();
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
        //backgroundColor: "#e3f2fd",
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
        //backgroundColor: "#bbdefb",
    },
    limbText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#1976d2",
    },


});

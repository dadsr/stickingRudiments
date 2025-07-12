import React, { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from 'react-native-paper';
import { Limb } from "../modals/types";
import { useMetronomeContext } from "./metronom/MetronomeContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NotationProps {
    pattern: Limb[];
}

// A constant to define how many notes appear on a single line
const NOTES_PER_LINE = 8;

// Helper function to determine the correct note icon based on pattern length
const getNoteIconName = (patternLength: number): string => {
    if (patternLength <= 4) return 'music-note-quarter';
    if (patternLength <= 8) return 'music-note-eighth';
    return 'music-note-sixteenth';
};

// The Note sub-component remains the same
const Note = ({ limb, beatNumber, isActive, iconName }: { limb: Limb, beatNumber: number, isActive: boolean, iconName: string }) => (
    <View style={styles.noteContainer}>
        <Text style={[styles.stickingText, isActive && styles.activeText]}>
            {limb}
        </Text>
        <Icon
            name={iconName}
            size={36}
            color={isActive ? "#1976d2" : "black"}
            style={[isActive && styles.activeIcon]}
        />
        <Text style={[styles.beatNumberText, isActive && styles.activeText]}>
            {beatNumber}
        </Text>
    </View>
);

export default function StickingNotation({ pattern }: NotationProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const noteIconName = getNoteIconName(pattern.length);

    // --- NEW LOGIC: Chunk the pattern into multiple lines ---
    const chunkedPattern: Limb[][] = [];
    for (let i = 0; i < pattern.length; i += NOTES_PER_LINE) {
        chunkedPattern.push(pattern.slice(i, i + NOTES_PER_LINE));
    }

    return (
        <Card style={styles.card}>
            <Card.Title title="Sticking" titleStyle={styles.title} />
            <Card.Content>
                {/* The main container is now a column for the rows */}
                <View style={styles.notationContainer}>
                    {/* Outer loop: iterates over each line (chunk) */}
                    {chunkedPattern.map((line, lineIndex) => (
                        <View key={lineIndex} style={styles.notationLine}>
                            {/* Inner loop: iterates over notes within the line */}
                            {line.map((limb, noteIndex) => {
                                // Calculate the original index of the note in the full pattern
                                const originalIndex = (lineIndex * NOTES_PER_LINE) + noteIndex;
                                const isActive = metronomeContext.isPlaying && metronomeContext.currentBeat === originalIndex;

                                return (
                                    <Note
                                        key={originalIndex}
                                        limb={limb}
                                        beatNumber={originalIndex + 1}
                                        isActive={isActive}
                                        iconName={noteIconName}
                                    />
                                );
                            })}
                        </View>
                    ))}
                </View>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 2,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2",
    },
    // Main container is now a column
    notationContainer: {
        flexDirection: "column",
        paddingVertical: 2,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    // A new style for each row of notes
    notationLine: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        paddingVertical: 10, // Spacing between lines
        paddingHorizontal: 10,
        minHeight: 100,
    },
    noteContainer: {
        alignItems: "center",
        marginHorizontal: 1,
    },
    activeIcon: {
        transform: [{ scale: 1.2 }],
    },
    stickingText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 8,
    },
    beatNumberText: {
        fontSize: 14,
        color: 'gray',
    },
    activeText: {
        color: "#1976d2",
        fontWeight: 'bold',
    },
});

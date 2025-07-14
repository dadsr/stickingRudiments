import React, { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from 'react-native-paper';
import { PatternNote } from "../modals/types";
import { useMetronomeContext } from "./metronom/MetronomeContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface NotationProps {
    pattern: PatternNote[];
}

const getNoteIconName = (patternLength: number): string => {
    if (patternLength <= 4) return 'music-note-quarter';
    if (patternLength <= 8) return 'music-note-eighth';
    return 'music-note-sixteenth';
};

const Note = ({ note, beatNumber, isActive, iconName}: { note: PatternNote, beatNumber: number, isActive: boolean, iconName: string }) => (
    <View style={styles.noteContainer}>
        {note.accent && (
            <Text style={styles.accentMark}>›</Text>
        )}
        <Text style={[
            styles.stickingText,
            note.accent && styles.accentText,
            isActive && styles.activeText
        ]}>
            {note.limb}
        </Text>
        <Icon
            name={iconName}
            size={note.accent ? 30 : 25}
            color={note.accent ? "blue" : isActive ? "blue" : "black"}
            style={[
                isActive && styles.activeIcon,
                note.accent && styles.accentIcon
            ]}
        />
        <Text style={[
            styles.beatNumberText,
            note.accent && { fontWeight: "bold", fontSize: 20},
            isActive && styles.activeText
        ]}>
            {beatNumber}
        </Text>
    </View>
);

export default function StickingNotation({ pattern }: NotationProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const noteIconName = getNoteIconName(pattern.length);

    const NOTES_PER_LINE = 8;

    // Chunk pattern into lines of PatternNote[]
    const chunkedPattern: PatternNote[][] = [];
    for (let i = 0; i < pattern.length; i += NOTES_PER_LINE) {
        chunkedPattern.push(pattern.slice(i, i + NOTES_PER_LINE));
    }

    return (
        <Card style={styles.card}>
            <Card.Title title="Sticking" titleStyle={styles.title} />
            <Card.Content>
                <View style={styles.notationContainer}>
                    {chunkedPattern.map((line, lineIndex) => (
                        <View key={lineIndex} style={styles.notationLine}>
                            {line.map((note, noteIndex) => {
                                const originalIndex = (lineIndex * NOTES_PER_LINE) + noteIndex;
                                const isActive = metronomeContext.isPlaying && metronomeContext.currentBeat === originalIndex;

                                return (
                                    <Note
                                        key={originalIndex}
                                        note={note}
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
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1a73e8",
        marginBottom: 5
    },
    notationContainer: {
        flexDirection: "column",
        alignItems: "center", // Ensures all lines are centered
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0"
    },
    notationLine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Center notes in the row
        paddingVertical: 2,       // Smaller vertical gap
        paddingHorizontal: 2,
        minHeight: 60,            // Smaller line height
        marginBottom: 2           // Small gap between lines
    },
    noteContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 2,      // Small horizontal gap between notes
        minWidth: 24,
        maxWidth: 48,
        flexShrink: 1
    },
    stickingText: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2d3748",
        marginBottom: 5,
        textAlign: "center"
    },
    accentMark: {
        position: "absolute",
        top: -20,
        left: "50%",
        transform: [{ translateX: -8 }],
        fontSize: 16,
        color: "black",
        fontWeight: "900",
        textShadowColor: "#e53e3e",
        textShadowRadius: 3
    },
    beatNumberText: {
        fontSize: 10,
        color: "#718096",
        marginTop: 3,
        textAlign: "center"
    },
    activeText: {
        color: "#2563eb",
        fontWeight: "900",
        textShadowColor: "#2563eb",
        textShadowRadius: 2
    },
    activeIcon: {
        transform: [{ scale: 0.9 }],
        shadowColor: "#2563eb",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    accentIcon: {
        shadowColor: "#e53e3e",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10
    },
    accentText: {
        color: "#e53e3e",
        textShadowColor: "#f8d7da",
        textShadowRadius: 4
    }
});

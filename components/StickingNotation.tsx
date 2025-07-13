import React, { JSX } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text } from 'react-native-paper';
import { PatternNote } from "../modals/types";
import { useMetronomeContext } from "./metronom/MetronomeContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface NotationProps {
    pattern: PatternNote[];
}

// Helper function to determine the correct note icon based on pattern length
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
            size={note.accent ? 38 : 36}
            color={note.accent ? "#e53935" : isActive ? "#1976d2" : "black"}
            style={[
                isActive && styles.activeIcon,
                note.accent && styles.accentIcon
            ]}
        />
        <Text style={[
            styles.beatNumberText,
            note.accent && { fontWeight: "bold", fontSize: 22 },
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
        margin: 2,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2",
    },
    notationContainer: {
        flexDirection: "column",
        paddingVertical: 2,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    notationLine: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        paddingVertical: 10,
        paddingHorizontal: 10,
        minHeight: 100,
    },
    noteContainer: {
        alignItems: "center",
        marginHorizontal: 1,
        minWidth: 40,
    },
    stickingText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginBottom: 8,
    },
    accentText: {
        color: "#e53935",
        textShadowColor: "#fbc02d",
        textShadowRadius: 4,
    },
    accentIcon: {
        shadowColor: "#e53935",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    },
    accentMark: {
        position: "absolute",
        top: -12,
        fontSize: 16,
        color: "#e53935",
        fontWeight: "bold",
        alignSelf: "center",
    },
    beatNumberText: {
        fontSize: 14,
        color: 'gray',
    },
    activeText: {
        color: "#1976d2",
        fontWeight: 'bold',
    },
    activeIcon: {
        transform: [{ scale: 1.2 }],
    },
});

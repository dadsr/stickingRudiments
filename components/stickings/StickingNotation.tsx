import React, {JSX} from "react";
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'react-native-paper';
import {PatternNote} from "../../modals/types";
import {useMetronomeContext} from "../metronom/MetronomeContext";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from "../../styles/styles";
import {theme} from "../../styles/theme";

interface NotationProps {
    pattern: PatternNote[];
}

const getNoteIconName = (patternLength: number): string => {
    if (patternLength <= 4) return 'music-note-quarter';
    if (patternLength <= 8) return 'music-note-eighth';
    return 'music-note-sixteenth';
};

const Note = ({ note, beatNumber, isActive, iconName}: {
    note: PatternNote,
    beatNumber: number,
    isActive: boolean,
    iconName: string
}) => (
    <View style={styles.noteContainer}>
        {note.accent && (
            <Text style={styles.accentMark}>{'>'}</Text>
        )}
        <Text style={[styles.stickingText, isActive && styles.activeText]}>
            {note.limb}
        </Text>
        <Icon
            name={iconName}
            size={20}
            color={isActive ? "#2563eb" : "#2d3748"}
            style={isActive ? styles.activeIcon : {}}
        />
        <View style={isActive ? styles.currentBeatContainer : {}}>
            <Text style={[styles.beatNumberText, isActive && styles.activeText]}>
                {beatNumber}
            </Text>
        </View>
    </View>
);

export default function StickingNotation({ pattern }: NotationProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const noteIconName = getNoteIconName(pattern.length);
    const NOTES_PER_LINE = 8;

    const chunkedPattern: PatternNote[][] = [];
    for (let i = 0; i < pattern.length; i += NOTES_PER_LINE) {
        chunkedPattern.push(pattern.slice(i, i + NOTES_PER_LINE));
    }

    return (
        <Card style={globalStyles.card}>
            <Card.Title titleStyle={globalStyles.title} title="Sticking" />

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

        </Card>
    );
}

const styles = StyleSheet.create({

    notationContainer: {
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    notationLine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 2,
        paddingHorizontal: 2,
        minHeight: 140,
        marginBottom: 2
    },
    noteContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginHorizontal: 2,
        width: 40,
        height: 100,
        flexShrink: 1
    },
    currentBeatContainer: {
        borderWidth: 2,
        borderColor: "#2563eb",
        borderRadius: 4,
        padding: 2,
    },
    stickingText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#2d3748",
        marginBottom: 5,
        textAlign: "center"
    },
    accentMark: {
        position: "absolute",
        top: -25,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 20,
        color: "black",
        fontWeight: "900",
    },

    beatNumberText: {
        fontSize: 15,
        color: "#718096",
        marginTop: 3,
        textAlign: "center"
    },
    accentIcon: {
        shadowColor: '#640D5F',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10
    },
    accentText: {
        color: theme.colors.onPrimaryContainer,
        textShadowRadius: 4,
    },
    activeText: {
        color: theme.colors.primary,
        fontWeight: "900",
        textShadowColor: "#2563eb",
        textShadowRadius: 2,
    },
    activeIcon: {
        transform: [{ scale: 0.9 }],
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
});

import React, { JSX } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from 'react-native-paper';
import { useMetronomeContext } from "../metronom/MetronomeContext";
import {globalStyles, imageStyles} from "../../styles/styles";
import {containerImg} from "../../assets";
import {theme} from "../../styles/theme";

interface beatCount{
    totalBeats: number;
}

export default function BeatCounter({totalBeats}:beatCount): JSX.Element {
    const metronomeContext = useMetronomeContext();

    const beatToShow = metronomeContext.isPlaying ? metronomeContext.currentBeat + 1 : 1;


    return (
        <Card style={globalStyles.card}>
            <Card.Title title="Beat" titleStyle={globalStyles.title} />
            <Card.Content style={globalStyles.content}>
                <Text style={styles.beatText}>
                    {beatToShow}
                    <Text style={styles.totalBeatsText}>
                        /{totalBeats}
                    </Text>
                </Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({

    beatText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        lineHeight: 80,
    },
    totalBeatsText: {
        fontSize: 40,
        fontWeight: 'normal',
        color: '#757575',
    },
});

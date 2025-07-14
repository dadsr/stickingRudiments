import React, {JSX, useEffect, useState} from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from 'react-native-paper';
import { useMetronomeContext } from "./metronom/MetronomeContext";



export default function BarsCounter(): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const [bars, setBars] = useState<number>(0);
    const [prevBeat, setPrevBeat] = useState<number>(-1);


    useEffect(() => {
        if (metronomeContext.isPlaying === 'play') {
            setBars(0);
            setPrevBeat(-1);
        }
    },[metronomeContext.isPlaying]);

    useEffect(() => {
        if (metronomeContext.isPlaying === 'play' &&
            metronomeContext.currentBeat === 0 &&
            prevBeat !== 0) {
            setBars(bars => bars + 1);
        }
        setPrevBeat(metronomeContext.currentBeat);
    },[metronomeContext.currentBeat, metronomeContext.isPlaying]);



    return (
        <Card style={styles.card}>
            <Card.Title title="Bars played" titleStyle={styles.title} />
            <Card.Content style={styles.content}>
                <Text style={styles.barText}>
                    {bars}
                </Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1976d2",
        textAlign: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
    },
    barText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#1976d2',
        textAlign: 'center',
        lineHeight: 80,
    },

});

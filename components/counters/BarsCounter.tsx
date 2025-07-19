import React, {JSX, useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {Card, Text} from 'react-native-paper';
import {useMetronomeContext} from "../metronom/MetronomeContext";
import {globalStyles} from "../../styles/styles";
import {theme} from "../../styles/theme";


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
        <Card style={globalStyles.card}>
            <Card.Title title="Bars played" titleStyle={globalStyles.title} />
            <Card.Content style={globalStyles.content}>
                <Text style={styles.barText}>
                    {bars}
                </Text>
            </Card.Content>
        </Card>
    );
}

const styles = StyleSheet.create({

    barText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: theme.colors.primary,
        textAlign: 'center',
        lineHeight: 80,
    },

});

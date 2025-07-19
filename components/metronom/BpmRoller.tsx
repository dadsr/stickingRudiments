import React, {useEffect, useState} from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {runOnJS, useSharedValue} from "react-native-reanimated";
import {roller} from "../../assets";
import {imageStyles} from "../../styles/styles";
import {useMetronomeContext} from "./MetronomeContext";
import {theme} from "../../styles/theme";

const tempoValues = Array.from({ length: 221 }, (_, i) => i + 30);
const MIN_TEMPO = tempoValues[0];
const MAX_TEMPO = tempoValues[tempoValues.length - 1];

// Tune this so that you need to drag e.g. 20px to change by 1 BPM
const PIXELS_PER_BPM = 18;

export default function BpmRoller() {
    const metronomeContext = useMetronomeContext();
    const [currentValue, setCurrentValue] = useState(metronomeContext.tempo || MIN_TEMPO);
    const startValue = useSharedValue(metronomeContext.tempo || MIN_TEMPO);

    useEffect(() => {
        if (metronomeContext.tempo !== currentValue) {
            setCurrentValue(metronomeContext.tempo);
            startValue.value = metronomeContext.tempo;
        }
    }, [metronomeContext.tempo]);

    const getDisplayValues = (centerValue: number) => {
        const displayValues = [];
        const windowSize = 2;
        for (let i = centerValue - windowSize; i <= centerValue + windowSize; i++) {
            displayValues.push({
                value: i,
                isCenter: i === centerValue,
            });
        }
        return displayValues;
    };

    const displayValues = getDisplayValues(currentValue);

    const lastDeltaX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onBegin(() => {
            startValue.value = currentValue;
            lastDeltaX.value = 0;
        })
        .onUpdate((event) => {
            // Use the total translation, not incremental changes
            const deltaValue = Math.round(-event.translationX / PIXELS_PER_BPM);
            let newValue = startValue.value + deltaValue;
            newValue = Math.max(MIN_TEMPO, Math.min(MAX_TEMPO, newValue));
            runOnJS(setCurrentValue)(newValue);
        })
        .onEnd(() => {
            runOnJS(metronomeContext.changeTempo)(currentValue);
        });

    return (
        <View style={styles.rollerContainer}>
            <ImageBackground source={roller} style={imageStyles.background} resizeMode="cover">
                <GestureDetector gesture={panGesture}>
                    <Animated.View style={styles.valuesContainer}>
                        {displayValues.map((item) => (
                            <View key={item.value} style={styles.valueItem}>
                                <Text
                                    style={[
                                        styles.text,
                                        item.isCenter && styles.selectedText,
                                        { opacity: item.isCenter ? 1 : 0.4 },
                                    ]}
                                >
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                        <View style={styles.centerIndicator} />
                    </Animated.View>
                </GestureDetector>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    rollerContainer: {
        width: 350,
        height: 100,
        overflow: "visible",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
        position: "relative",
        borderWidth:3,
        borderRadius: theme.roundness,
        borderColor: theme.colors.onPrimaryContainer,
        backgroundColor: theme.colors.secondary,
    },
    centerIndicator: {
        position: "absolute",
        top: 20,
        bottom: 20,
        left: "50%",
        marginLeft: -1,
        width: 2,
        backgroundColor: "#fff",
        opacity: 0.5,
        zIndex: 1,
    },
    valuesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    valueItem: {
        width: 70,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    text: {
        fontSize: 18,
        color: "#8E8E93",
    },
    selectedText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "bold",
    },
});

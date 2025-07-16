import React, {useState} from "react";
import {Dimensions, ImageBackground, StyleSheet, Text, View} from "react-native";
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {runOnJS, useAnimatedGestureHandler, useSharedValue} from 'react-native-reanimated';
import {roller} from "../../assets";
import {imageStyles} from "../../styles/styles";

const tempoValues = Array.from({ length: 250 }, (_, i) => i + 30);
const { width: screenWidth } = Dimensions.get('window');

interface BpmRollerProps {
    selected: number;
    onSelect: (value: number) => void;
}

export default function BpmRoller({ selected, onSelect }: BpmRollerProps) {
    const [currentValue, setCurrentValue] = useState(selected);
    const startValue = useSharedValue(selected);

    const getDisplayValues = (centerValue: number) => {
        const centerIndex = tempoValues.indexOf(centerValue);
        const displayValues = [];

        // Handle edge cases with buffer
        const start = Math.max(0, centerIndex - 2);
        const end = Math.min(tempoValues.length - 1, centerIndex + 2);

        for (let i = start; i <= end; i++) {
            const relativeIndex = i - centerIndex;
            displayValues.push({
                value: tempoValues[i],
                position: relativeIndex,
                isCenter: i === centerIndex
            });
        }
        return displayValues;
    };

    const displayValues = getDisplayValues(currentValue);

    // Gesture handler with clear directional logic
    const gestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            startValue.value = currentValue;
        },
        onActive: (event) => {
            const sensitivity = 0.2;
            const deltaValue = Math.round(event.translationX * sensitivity);
            let newValue = Math.max(40, Math.min(250, startValue.value - deltaValue));
            newValue = Math.min(Math.max(newValue, 40), 250);

            runOnJS(setCurrentValue)(newValue);
        },
        onEnd: () => {
            runOnJS(onSelect)(currentValue);
        },
    });

    return (
        <View style={styles.rollerContainer}>
            <ImageBackground
                source={roller}
                style={imageStyles.background}
                resizeMode="cover"
            >
                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={styles.gestureContainer}>
                        <View style={styles.valuesContainer}>
                            {displayValues.map((item, index) => (
                                <View key={item.value} style={styles.valueItem}>
                                    <Text
                                        style={[
                                            styles.text,
                                            item.isCenter && styles.selectedText,
                                            { opacity: item.isCenter ? 1 : 0.4 }
                                        ]}
                                    >
                                        {item.value}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.centerIndicator} />
                    </Animated.View>
                </PanGestureHandler>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    rollerContainer: {
        width: 350,
        height: 100,
        borderRadius: 16,
        borderWidth:2,
        borderColor:'black',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
        position: "relative",
    },
    gestureContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    valuesContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        height: "100%",
    },
    valueItem: {
        width: 60,
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    text: {
        fontSize: 16,
        color: "#666",
        fontWeight: "normal",
    },
    selectedText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    centerIndicator: {
        position: "absolute",
        top: 20,
        bottom: 20,
        left: "50%",
        marginLeft: '-1%',
        width: 2,
        backgroundColor: "#fff",
        opacity: 0.5,
        zIndex: 1,
    },
});

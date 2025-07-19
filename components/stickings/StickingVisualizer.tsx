import React, {JSX, useEffect, useRef, useState} from "react";
import {Animated, StyleSheet, View} from "react-native";
import {Card, Surface, Switch, Text} from "react-native-paper";
import {useMetronomeContext} from "../metronom/MetronomeContext";
import {useAudio} from "../../hooks/useAudio";
import {Limb, PatternNote} from "../../modals/types";
import {globalStyles} from "../../styles/styles";
import {theme} from "../../styles/theme";


interface Flash {
    id: number; // The beat number ensures each flash is unique
    limb: Limb;
}

interface VisualizerProps {
    pattern: PatternNote[];
}

export default function StickingVisualizer({ pattern }: VisualizerProps): JSX.Element {
    const metronomeContext = useMetronomeContext();
    const audioContext = useAudio();
    const [flashes, setFlashes] = useState<Flash[]>([]);
    const footWork: boolean = pattern.some(note => note.limb === 'LF' || note.limb === 'RF');
    const [playSounds,setPlaySounds] = useState<boolean>(true);

    // Sound effect
    useEffect(() => {
        if (metronomeContext.isPlaying === 'pause' || playSounds === false) return;
        if (metronomeContext.currentAccent){
            audioContext.playAccent();
        }else{
            switch (metronomeContext.currentLimb) {
                case 'R': audioContext.playRightHandClick(); break;
                case 'L': audioContext.playLeftHandClick(); break;
                case 'LR': audioContext.playBothHandsClick(); break;
                case 'RF': audioContext.playRightFoot(); break;
                case 'LF': audioContext.playLeftFoot(); break;
                case ' ': audioContext.playNoHandsClick(); break;
                default: break;
            }
        }

    }, [metronomeContext.currentBeat, metronomeContext.isPlaying]);

    // This effect manages the visual "flash" for each beat.
    useEffect(() => {
        if (!metronomeContext.isPlaying || !metronomeContext.currentLimb) {
            setFlashes([]);
            return;
        }

        const currentBeat = metronomeContext.currentBeat;
        const newFlash: Flash = { id: currentBeat, limb: metronomeContext.currentLimb };

        setFlashes(prev => [...prev, newFlash]);


        const timer = setTimeout(() => {
            setFlashes(prev => prev.filter(flash => flash.id !== currentBeat));
        }, 200);


        return () => clearTimeout(timer);

    }, [metronomeContext.currentBeat, metronomeContext.isPlaying]);

    const getStatus = (limb: Limb): { active: boolean; accented: boolean } => {
        const flash = flashes.find(flash =>
            flash.limb === limb ||
            (flash.limb === 'LR' && (limb === 'R' || limb === 'L'))
        );

        if (!flash) {
            return { active: false, accented: false };
        }

        const matchedLimb =
            flash.limb === limb ||
            (flash.limb === 'LR' && (limb === 'R' || limb === 'L'));

        const accented = matchedLimb && metronomeContext.currentAccent === true;

        return { active: true, accented };
    };

    const onSoundsToggleSwitch=() => {
        setPlaySounds(!playSounds);
    }
    const renderLimbCard = (limb: Limb, label: string) => {
        const { active, accented } = getStatus(limb);
        const scaleAnim = useRef(new Animated.Value(1)).current;

        useEffect(() => {
            if (active) {
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.10,
                        duration: 80,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 60,
                        useNativeDriver: true,
                    }),
                ]).start();
            }
        }, [active, scaleAnim]);

        return (
            <Animated.View
                style={[
                    styles.cardBase,
                    active && styles.popShadow,
                    { transform: [{ scale: scaleAnim }] }
                ]}
            >
                <Card style={[
                    styles.innerCard,
                    active && accented
                        ? styles.activeAccentCard
                        : active
                            ? styles.activeCard
                            : styles.inactiveCard
                ]}>
                    <Card.Title title={label} />
                    <Card.Content>
                        <View style={[styles.surface, active && styles.activeSurface]}>
                            {accented && <Text style={styles.accentMark}>{'  >'}</Text>}
                            <Text style={[styles.limbText, accented && styles.accentText]}>{limb}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </Animated.View>
        );
    };

    return (

        <Card style={globalStyles.card}>

            <Card.Title titleStyle={globalStyles.title} title="Visual" />

            <Card.Content>
                <View style={styles.row}>
                    <Text>Play Sounds:</Text>
                    <Switch value={playSounds} onValueChange={onSoundsToggleSwitch} />
                </View>
                <View style={styles.row}>
                    {renderLimbCard('L', 'Left Hand')}
                    {renderLimbCard('R', 'Right Hand')}
                </View>
                {footWork && (
                    <View style={styles.row}>
                        {renderLimbCard('LF', 'Left Foot')}
                        {renderLimbCard('RF', 'Right Foot')}
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

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        marginVertical: 12,
    },

    cardBase: {
        width: "48%",
        marginHorizontal: 6,
        borderRadius: 15,
    },

    innerCard: {
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 15,
        overflow: "hidden",
    },
    popShadow: {
        elevation: 14,
    },

    activeCard: {
        backgroundColor: '#FFB200',
        borderColor: '#640D5F',
    },

    activeAccentCard: {
        backgroundColor: '#EB5B00',
        borderColor: '#640D5F',
    },


    inactiveCard: {
        backgroundColor: '#EFEFEF',
        borderColor: "#ccc",
    },


    surface: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        marginBottom: 4,
        elevation: 2,
        backgroundColor: '#EFEFEF',
        borderRadius: 50,
    },
    activeSurface: {
        elevation: 6,
        backgroundColor: '#D91656',
        borderRadius: 25,
    },
    limbText: {
        fontSize: 25,
        fontWeight: "bold",
        color: '#640D5F',
    },
    accentText: {
        color: '#EB5B00',
        textShadowColor: '#FFB200',
        textShadowRadius: 4,
    },

    accentMark: {
        position: "absolute",
        top: -10,
        left: "50%",
        transform: [{ translateX: -8 }],
        fontSize: 25,
        color: '#640D5F',
        fontWeight: "bold",
        zIndex: 2,
    },

});

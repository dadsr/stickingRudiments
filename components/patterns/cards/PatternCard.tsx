import React, {JSX} from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import {Button, Card, Divider, Text} from "react-native-paper";
import {useRouter} from "expo-router";
import {StickingPattern} from "../../../modals/StickingPattern";
import {usePattern} from "../../../hooks/usePattern";
import {imageMap, PatternNote} from "../../../modals/types";
import {globalStyles} from "../../../styles/styles";


interface patternProps {
    patternContext: ReturnType<typeof usePattern>;
    router: ReturnType<typeof useRouter>;
    pattern: StickingPattern;
    onSelect: (pattern: StickingPattern) => void;
    onDelete: (pattern: StickingPattern) => void;
}

const PatternCard = React.memo( function PatternCard ({patternContext, router, pattern, onSelect, onDelete}:patternProps):JSX.Element {
        console.log("PatternCard() id:"+pattern.id);

        const handleEdit = ()=>{
            console.log("PatternCard - handleEdit");
            router.push(`/edit/${pattern.id}`);
        }


        return (
            <Card >
                <Card.Title
                    title={`${pattern.name} (${pattern.id})`}
                    subtitle={`Importance: ${pattern.importance} - Difficulty: ${pattern.difficulty}`}
                    titleStyle={{
                        color: 'blue',
                        fontWeight: 'bold',
                        fontSize: 18,
                        textAlign: 'center'
                    }}
                    subtitleStyle={{
                        color: 'gray',
                        fontStyle: 'italic',
                        fontSize: 12,
                        textAlign: 'center'
                    }}
                />

                <Card.Content style={styles.content}>

                    <Text>{pattern.description}</Text>
                    <Divider style={globalStyles.divider}/>
                    <ImageBackground
                        source={imageMap[pattern.backgroundImage]}
                        style={styles.background}
                        imageStyle={{borderRadius: 8, overflow: "hidden"}}
                        importantForAccessibility={"no"}
                    >
                        <View style={styles.overlay}>
                            <View style={styles.container}>
                                <Text style={styles.limbList}>
                                    {pattern.notes.map((n:PatternNote, idx:number) => (
                                        <Text   key={idx} style={n.accent ? styles.accentedNote : styles.normalNote}>
                                            {n.limb}{idx < pattern.notes.length - 1 ? ', ' : ''}
                                        </Text>
                                    ))}
                                </Text>
                            </View>

                            <Divider/>
                            <Text variant="bodySmall">{pattern.tempo}</Text>
                        </View>
                    </ImageBackground>
                </Card.Content>

                <Card.Actions style={styles.actions}>
                    <Button onPress={handleEdit}>Edit</Button>
                    <Button onPress={() => onSelect(pattern)}>Select</Button>
                    <Button onPress={() => onDelete(pattern)} >Delete</Button>
                </Card.Actions>

            </Card>
        );
    }
);
export default PatternCard;

const styles = StyleSheet.create({
    content: {
        flex:1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 8,
        padding: 8,
        backgroundColor: "rgba(255,255,255,0.7)",
    },
    actions:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    background: {
        width: "100%",
        minHeight: 150,
        justifyContent: "center",
    },
    overlay: {
        backgroundColor: 'rgba(255,255,255,0.51)',
        borderRadius: 8,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center the content
        alignItems: 'center',
        width: '100%',
        marginVertical: 4,
        paddingHorizontal: 8,
    },
    normalNote: {
        fontWeight: "normal",
        fontStyle: "normal",
        fontSize:16,
        color: "black",
    },
    accentedNote: {
        fontWeight: "bold",
        fontSize:18,
        color: "black",
    },

    limbList: {
        color: 'black',
        marginVertical: 4,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },

    tempoText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
        textShadowRadius: 2,
    },

})

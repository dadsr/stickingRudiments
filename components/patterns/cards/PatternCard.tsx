import React, {JSX} from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {Button, Card, Divider, Text} from "react-native-paper";
import {useRouter} from "expo-router";
import {StickingPattern} from "../../../modals/StickingPattern";
import {usePattern} from "../../../hooks/usePattern";
import {imageMap} from "../../../modals/types";


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
            <Card>
                <ImageBackground
                    source={imageMap[pattern.backgroundImage]}
                    style={styles.background}
                    imageStyle={{borderRadius: 8, overflow: "hidden"}}
                    importantForAccessibility={"no"}
                >
                    <Card.Title
                        title={`${pattern.name} (${pattern.id})`}
                        subtitle={pattern.difficulty}
                    />

                    <Card.Content style={styles.content}>
                        <Text variant="bodyMedium">{pattern.description}</Text>
                        <Divider/>
                        <Text variant="bodySmall">{pattern.pattern.join(", ") }</Text>
                        <Divider/>
                        <Text variant="bodyMedium">{pattern.tempo}</Text>
                    </Card.Content>
                </ImageBackground>
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
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius: 8,
        padding: 8,
    },
    actions:{
        flex: 3,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    background: {
        width: "100%",
        // Adjust height as needed
        minHeight: 150,
        justifyContent: "center",
    },

})

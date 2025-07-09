import {JSX, useRef} from "react";
import {Card, Text} from 'react-native-paper';
import {StyleSheet} from "react-native";
import {Limb} from "../modals/types";
import {useMetronomeContext} from "./metronom/MetronomeContext";

interface notationProps{
    pattern: Limb[];
}
export default function StickingNotation({pattern}:notationProps):JSX.Element{
    console.log("StickingNotation()");

    const metronomeContext = useMetronomeContext();
    const contextRef = useRef(metronomeContext);

    return (
        <Card >
            <Card.Title title="Notation" />
            <Card.Content>
                <Text>XXXXXXXXXXXXXX</Text>
                {/*{pattern.map((limb:Limb, index:number) => (*/}
                {/*    <Surface key={index} style={[styles.surface,{elevation:isPlaying && currentBeat === index ? 5:2}]} >*/}
                {/*        <Icon name="music-note" size={metronomeContext.tempo && currentBeat === index ? 24:28} color="black" />*/}
                {/*        <Text style={[styles.limbText,{fontSize:isPlaying && currentBeat === index ? 16:18}]}>{limb}</Text>*/}
                {/*        <Text style={[styles.indexText,{fontSize:isPlaying && currentBeat === index ? 12:14}]}>{index+1}</Text>*/}
                {/*    </Surface>*/}
                {/*))}*/}
            </Card.Content>
        </Card>
    );

}

const styles = StyleSheet.create({
    surface: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        marginBottom: 4,
        // elevation: 2,
    },
    limbText: {
        marginLeft: 8,
        // fontSize: 16,
        fontWeight: "bold",
    },
    indexText: {
        marginLeft: 8,
        // fontSize: 14,
        color: "gray",
    },
});

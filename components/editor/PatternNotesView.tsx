import {PatternNote} from "../../modals/types";
import {JSX} from "react";
import {Text} from "react-native-paper";
import {ScrollView, StyleSheet, View} from "react-native";
import React from "react";
import {theme} from "../../styles/theme";


interface notesViewProps{
    pattern: PatternNote[];
}
export default function PatternNotesView({pattern}:notesViewProps):JSX.Element {

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.patternRow} >
            {pattern.map((note, noteIndex) => (
                    <View style={styles.cell} key={noteIndex}>
                        {note.accent && (<Text style={styles.accentMark}>{'>'}</Text>)}
                        <Text style={styles.cellText}>{note.limb}</Text>
                        <Text style={styles.cellText}>{noteIndex + 1}</Text>
                    </View>
                )
            )}
        </ScrollView>
    );
}


const styles = StyleSheet.create(
    {
        patternRow: {
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        cell: {
            alignItems: "center",
            justifyContent: "flex-end",

            marginHorizontal: 2,
            minWidth: 15,
            position: "relative",

        },
        accentMark: {
            position: "absolute",
            top: -20,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 10,
            color: "black",
            fontWeight: "900",
        },
        cellText: {
            textAlign: "center",
            fontSize: 12,
        },


    }
)

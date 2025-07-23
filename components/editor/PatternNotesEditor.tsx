import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {Button, IconButton} from "react-native-paper";
import {limbOptions, PatternNote} from "../../modals/types";
import NoteColumn from "./NoteColumn";
import {theme} from "../../styles/theme";
import PatternNotesView from "./PatternNotesView";


interface NoteEditorProps {
    notes: PatternNote[];
    setNotes: React.Dispatch<React.SetStateAction<PatternNote[]>>;
    close: () => void;
}

export default function PatternNotesEditor({ notes, setNotes, close }: NoteEditorProps) {
    const [menuIdx, setMenuIdx] = useState<number | null>(null);

    const addNote = () => setNotes([...notes, { limb: "R", accent: false }]);

    const updateNote = (idx: number, field: string, value: string | boolean) => {
        setNotes(notes.map((n, i) => (i === idx ? { ...n, [field]: value } : n)));
    };

    const removeNote = (idx: number) => setNotes(notes.filter((_, i) => i !== idx));

    return (
        <View style={styles.outerContainer}>

            <View style={styles.top}>
                <IconButton
                    icon="backspace"
                    onPress={close}
                    size={30}
                    accessibilityLabel="back to edit pattern"
                />
            </View>
            <View style={styles.middle}>
                <View style={styles.mainTable}>

                    <View style={styles.headerColumn}>
                        {["Limb", "Accent", "Beat", "Remove"].map((label) => (
                            <View key={label} style={styles.cell}>
                                <Text style={styles.headerText}>{label}</Text>
                            </View>
                        ))}
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={{ alignItems: "flex-start" }}
                    >
                        {notes.map((note, idx) => (
                            <NoteColumn
                                key={idx}
                                idx={idx}
                                note={note}
                                menuIdx={menuIdx}
                                setMenuIdx={setMenuIdx}
                                limbOptions={limbOptions}
                                updateNote={updateNote}
                                removeNote={removeNote}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
            <Button mode="contained" icon="plus" onPress={addNote} style={styles.addBtn}>
                Add Note
            </Button>
            <View style={styles.bottom}>


                <PatternNotesView pattern={notes} />
            </View>
        </View>
    );
}

const CELL_HEIGHT = 48;
const CELL_WIDTH = 70;

const styles = StyleSheet.create({
    outerContainer: {
        maxWidth:'97%',
        padding:1,
        backgroundColor: theme.colors.onPrimary,
    },
    top: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    middle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottom: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        maxHeight:'15%',
        backgroundColor:'rgba(39,84,138,0.5)',
        borderWidth:2,
        borderColor:theme.colors.onPrimaryContainer,
    },
    mainTable: {
paddingVertical:10,
        flexDirection: "row",
        alignSelf:'center',
        backgroundColor:'rgba(255,255,255,0.28)',
    },

    container: {
        flexDirection: "row",
        flex: 1,
    },
    notesContainer: {
        flexDirection: "row",
        minHeight: CELL_HEIGHT * 6,
    },
    headerColumn: {
        flexDirection: "column",
        justifyContent: "flex-start",
        marginRight: 8,
        borderRadius: 5,
        minWidth: CELL_WIDTH + 2,
        maxHeight: CELL_HEIGHT*4,
        borderWidth: 1,
        borderColor: theme.colors.onPrimaryContainer,
        backgroundColor: theme.colors.primaryContainer,
    },
    headerText: {
        fontWeight: "bold",
        textAlign: "justify",
        height: CELL_HEIGHT,
        lineHeight: CELL_HEIGHT,
        color: theme.colors.onPrimary,
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        paddingHorizontal: 6,
    },
    addBtn: {
        flexDirection: "row",
        alignSelf: "center",
        marginBottom: 10,
    },
});

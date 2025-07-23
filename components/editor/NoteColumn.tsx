import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Checkbox, IconButton, Menu } from "react-native-paper";
import { Limb, PatternNote } from "../../modals/types";

interface NoteColumnProps {
    idx: number;
    note: PatternNote;
    menuIdx: number | null;
    setMenuIdx: React.Dispatch<React.SetStateAction<number | null>>;
    limbOptions: Limb[];
    updateNote: (idx: number, field: string, value: string | boolean) => void;
    removeNote: (idx: number) => void;
}

export default function NoteColumn({
                                       idx,
                                       note,
                                       menuIdx,
                                       setMenuIdx,
                                       limbOptions,
                                       updateNote,
                                       removeNote,
                                   }: NoteColumnProps) {
    return (
        <View style={styles.column}>
            <Menu
                visible={menuIdx === idx}
                onDismiss={() => setMenuIdx(null)}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={() => setMenuIdx(idx)}
                        style={styles.dropdown}
                        contentStyle={{ height: 48 }}
                    >
                        {note.limb}
                    </Button>
                }
            >
                {limbOptions.map((opt) => (
                    <Menu.Item
                        key={opt}
                        title={opt}
                        onPress={() => {
                            updateNote(idx, "limb", opt);
                            setMenuIdx(null);
                        }}
                    />
                ))}
            </Menu>

            <Checkbox
                status={note.accent ? "checked" : "unchecked"}
                onPress={() => updateNote(idx, "accent", !note.accent)}
            />

            <View style={styles.cell}>
                <Text>{idx + 1}</Text>
            </View>

            <IconButton
                icon="delete"
                onPress={() => removeNote(idx)}
                size={24}
                accessibilityLabel="Delete this note"
            />
        </View>
    );
}

const CELL_HEIGHT = 48;
const CELL_WIDTH = 70;

const styles = StyleSheet.create({
    column: {
        flexDirection: "column",
        alignItems: "center",
        marginRight: 8,
        minWidth: CELL_WIDTH,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    dropdown: {
        height: CELL_HEIGHT,
        paddingHorizontal: 6,
        alignSelf: "stretch",
        justifyContent: "center",
    },
    cell: {
        justifyContent: "center",
        alignItems: "center",
        height: CELL_HEIGHT,
        width: CELL_WIDTH,
        paddingHorizontal: 6,
    },
});

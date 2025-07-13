import React, {JSX} from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";

const tempoValues = Array.from({ length: 300 }, (_, i) => i + 40);

interface BpmRollerProps {
    selected: number;
    onSelect: (value: number) => void;
}

export default function BpmRoller({ selected, onSelect }: BpmRollerProps): JSX.Element {
    return (
        <FlatList
            horizontal
            data={tempoValues}
            keyExtractor={(item) => item.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            snapToInterval={60} // width of each item + margin
            decelerationRate="fast"
            renderItem={({ item }) => {
                const isSelected = item === selected;
                return (
                    <TouchableOpacity
                        onPress={() => onSelect(item)}
                        style={[
                            {
                                width: 50,
                                marginHorizontal: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: isSelected ? "#1976d2" : "#ccc",
                                backgroundColor: isSelected ? "#1976d2" : "#f0f0f0",
                            },
                        ]}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: isSelected ? "white" : "#333",
                                fontWeight: isSelected ? "bold" : "normal",
                            }}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

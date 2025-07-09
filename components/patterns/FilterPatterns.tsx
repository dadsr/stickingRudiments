import {Difficulty} from "../../modals/types";
import {Animated} from "react-native";
import {Button} from "react-native-paper";
import {JSX} from "react";
import ScrollView = Animated.ScrollView;

interface filtersProps{
    filter: string | null;
    setFilter: (filter: Difficulty | null) => void;
}
export default function FilterPatterns({filter, setFilter}:filtersProps):JSX.Element{
    console.log("FilterPatterns()");

    const difficulties: Difficulty[] = ['very easy', 'easy', 'intermediate', 'difficult', 'crazy'];
    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row", justifyContent: "center", margin: 8 }}
        >
            {difficulties.map(d => (
                <Button
                    key={d}
                    mode={filter === d ? "contained" : "outlined"}
                    onPress={() => setFilter(filter === d ? null : d)}
                    style={{ marginHorizontal: 4 }}
                    accessibilityLabel={`Filter by ${d}`}
                >
                    {d}
                </Button>
            ))}
        </ScrollView>
    );
}

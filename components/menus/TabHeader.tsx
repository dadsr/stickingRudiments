import {View} from "react-native";
import {globalStyles} from "../../styles/styles";
import {Text} from "react-native-paper";
import React, {JSX} from "react";

type TabHeaderProps = {
    patternName: string;
    id: string | number;
};

export default function TabHeader ({patternName, id}: TabHeaderProps): JSX.Element {

    return (
        <View style={globalStyles.header}>
            <Text style={[globalStyles.heading, ]}>{`${patternName} (${id})`}</Text>
        </View>
    );
};

import {StickingPattern} from "../modals/StickingPattern";
import {useEffect, useState} from "react";


export const usePattern = (initialPattern: StickingPattern|null = null) =>{

    const [pattern, setPattern] = useState<StickingPattern|null>(initialPattern);
    const [patternLength,setPatternLength] = useState<number>(0);

    useEffect(() => {
        if(pattern) {
            setPatternLength(pattern.notes.length);
        }
    }, [pattern]);

    return { pattern, patternLength, setPattern };
};

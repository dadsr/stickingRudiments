import {StickingPattern} from "../modals/StickingPattern";
import {useEffect, useState} from "react";


export const usePattern = (initialPattern: StickingPattern|null = null) =>{
    console.log("usePattern()");

    const [pattern, setPattern] = useState<StickingPattern|null>(initialPattern);
    const [patternLength,setPatternLength] = useState<number>(0);

    useEffect(() => {
        console.log("usePattern - useEffect");
        if(pattern) {
            setPatternLength(pattern.pattern.length);
        }
        console.log(`pattern: ${pattern}, patternLength: ${patternLength} `)
    }, [pattern]);

    return { pattern, patternLength, setPattern };
};

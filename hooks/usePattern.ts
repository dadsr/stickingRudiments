import {StickingPattern} from "../modals/StickingPattern";
import {useEffect, useState} from "react";


export const usePattern = (initialPattern: StickingPattern|null = null) =>{
    console.log("usePattern()");

    const [pattern, setPattern] = useState<StickingPattern|null>(initialPattern);
    const [patternLength,setPatternLength] = useState<number>(0);
    const [isKicks,setIsKicks] = useState<boolean>(false);

    useEffect(() => {
        console.log("usePattern - useEffect");
        if(pattern) {
            setPatternLength(pattern.pattern.length);
            setIsKicks(pattern.pattern.includes('RK') || pattern.pattern.includes('LK'));
        }
        console.log(`pattern: ${pattern}, patternLength: ${patternLength} `)
    }, [pattern]);

    return { pattern, patternLength, isKicks, setPattern };
};

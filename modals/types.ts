
export type Limb = " "|"R" | "L" | "LR" | "RF" | "LF" ;
export type Importance = 'low' | 'medium' | 'high';
export const importanceOptions: Importance[] = ["low", "medium", "high"];

export type Difficulty = 'very easy' | 'easy' | 'intermediate' | 'difficult' | 'crazy';
export const difficultyOptions: Difficulty[] = ["very easy", "easy", "intermediate", "difficult", "crazy"];

export type ImageKey = '1.png' | '2.png' | '3.png' | '4.png' | '5.png';
export const imageOptions: ImageKey[] = ["1.png", "2.png", "3.png", "4.png", "5.png"];

export const imageMap :Record<ImageKey,any>  = {
    '1.png': require('../assets/images/patterns/1.png'),
    '2.png': require('../assets/images/patterns/2.png'),
    '3.png': require('../assets/images/patterns/3.png'),
    '4.png': require('../assets/images/patterns/4.png'),
    '5.png': require('../assets/images/patterns/5.png'),
}

export interface PatternNote {
    limb: Limb;
    accent: boolean;
}

export interface SerializedPattern {
    id: string;
    name: string;
    description: string;
    importance: Importance;
    difficulty: Difficulty;
    backgroundImage: string;
    notes: PatternNote[];
    tempo: number;
}




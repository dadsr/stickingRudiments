
export type Limb = " "|"R" | "L" | "RL" | "RK" | "LK" ;
export type Difficulty = 'very easy' | 'easy' | 'intermediate' | 'difficult' | 'crazy';

export type ImageKey = '1.png' | '2.png' | '3.png' | '4.png';

export const imageMap :Record<ImageKey,any>  = {
    '1.png': require('../assets/images/patterns/1.png'),
    '2.png': require('../assets/images/patterns/2.png'),
    '3.png': require('../assets/images/patterns/3.png'),
    '4.png': require('../assets/images/patterns/4.png'),
}

export interface SerializedPattern {
    id: string;
    name: string;
    description: string;
    difficulty: Difficulty;
    backgroundImage: string;
    pattern: Limb[];
    tempo: number;
}




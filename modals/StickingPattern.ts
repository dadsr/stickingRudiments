import {Difficulty, ImageKey, Limb} from "./types";

export class StickingPattern{
    id: string;
    name: string;
    description: string;
    difficulty: Difficulty;
    backgroundImage: ImageKey;
    pattern: Limb[];
    tempo: number;


    constructor(id: string, name: string, description: string, difficulty: Difficulty, backgroundImage: ImageKey, pattern: Limb[], tempo: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.difficulty = difficulty;
        this.backgroundImage = backgroundImage;
        this.pattern = pattern;
        this.tempo = tempo;
    }
}

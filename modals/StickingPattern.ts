import {Difficulty, ImageKey, Importance, PatternNote} from "./types";

export class StickingPattern{
    id: string;
    name: string;
    description: string;
    importance: Importance;
    difficulty: Difficulty;
    backgroundImage: ImageKey;
    notes: PatternNote[];
    tempo: number;


    constructor( id: string, name: string, description: string, importance: Importance, difficulty: Difficulty, backgroundImage: ImageKey, notes: PatternNote[], tempo: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.importance = importance;
        this.difficulty = difficulty;
        this.backgroundImage = backgroundImage;
        this.notes = notes;
        this.tempo = tempo;
    }
}

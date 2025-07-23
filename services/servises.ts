import AsyncStorage from "@react-native-async-storage/async-storage";
import defaultPatterns from "../assets/data/patterns.json";
import {StickingPattern} from "../modals/StickingPattern";
import {ImageKey, SerializedPattern} from "../modals/types";



export class Services {

    constructor() {
        // this.clearPatterns();
        this.initDefaultsIfNeeded();
    }

    async initDefaultsIfNeeded(): Promise<void> {
        const existing = await this.getPatterns();
        if (!existing || existing.length === 0) {
            await AsyncStorage.setItem("stickingPatterns", JSON.stringify(defaultPatterns)
            );
        }
    }

    async getPatterns(): Promise<StickingPattern[]>{
        try{
            const storedPatterns = await AsyncStorage.getItem("stickingPatterns");

            return storedPatterns ?
                (JSON.parse(storedPatterns) as SerializedPattern[]).map(pattern => this.parsePattern(pattern))
                :[];
        } catch (error) {
            console.error('Error retrieving patterns:', error);
            return [];
        }
    }

    async addPattern (addedPattern:StickingPattern):Promise<void>{
        await this.modifyPatterns((patterns:StickingPattern[]) =>
            [...patterns,{...addedPattern, id: this.getNextId(patterns)},]
        );
    }

    async updatePattern (updatedPattern:StickingPattern):Promise<void> {
        await this.modifyPatterns((patterns:StickingPattern[])=> {
            const index = patterns.findIndex((p) => p.id === updatedPattern.id);
            if (index !== -1) {
                const newPatterns = [...patterns];
                newPatterns[index] = updatedPattern;
                return newPatterns;
            }
            return patterns;
        });
    }

    async deletePattern (deletedPattern:StickingPattern):Promise<void>{
        await this.modifyPatterns((patterns:StickingPattern[]) =>
            patterns.filter((p) => p.id !== deletedPattern.id)
        );
    }

    async clearPatterns(): Promise<void> {
        await AsyncStorage.removeItem("stickingPatterns");
    }




    private async modifyPatterns(modifier: (patterns: StickingPattern[]) => StickingPattern[]): Promise<void> {
        try {
            const patterns = await this.getPatterns();
            const updated = modifier(patterns);
            await AsyncStorage.setItem( "stickingPatterns",JSON.stringify(updated.map(this.serializedPattern))
            );
        } catch (error) {
            console.error(`Error modifying patterns:`, error);
            throw error;
        }
    }

    private getNextId(patterns: StickingPattern[]): string {
        const maxId = patterns.reduce((max, p) => {
            const id =parseInt(p.id,10);
            return !isNaN(id) && id > max ? id : max;
        }, 0);
        return (maxId + 1).toString();
    }

    private parsePattern(serialized:SerializedPattern ):StickingPattern{
        return  new StickingPattern(
            serialized.id,
            serialized.name,
            serialized.description,
            serialized.importance,
            serialized.difficulty,
            serialized.backgroundImage as ImageKey,
            serialized.notes,
            serialized.tempo,
        );
    }

    private serializedPattern(pattern:StickingPattern):SerializedPattern{
        return {
            id: pattern.id,
            name: pattern.name,
            description: pattern.description,
            importance: pattern.importance,
            difficulty: pattern.difficulty,
            backgroundImage: pattern.backgroundImage,
            notes: pattern.notes,
            tempo: pattern.tempo
        };
    }

    //
}
export const services = new Services();

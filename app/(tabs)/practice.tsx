import MetronomeControl from "../../components/MetronomeControl";
import {MetronomeProvider} from "../../contexts/MetronomeContext";
import PracticeContent from "../../components/PracticeContent";


export default function Practice(){
    console.log("Practice()");

    return(
        <MetronomeProvider>
            <PracticeContent />
        </MetronomeProvider>
    );
}

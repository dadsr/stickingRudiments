import {AudioPlayer, useAudioPlayer} from 'expo-audio';
import { useCallback } from 'react';
import {bothHandsSound, leftHandSound, leftKickSound, rightHandSound, rightKickSound} from "../assets";


export const useAudio = () => {
    console.log("useAudio()");

    const rightHandPlayer = useAudioPlayer(rightHandSound);
    const leftHandPlayer = useAudioPlayer(leftHandSound);
    const bothHandsPlayer = useAudioPlayer(bothHandsSound);
    const rightKickPlayer = useAudioPlayer(rightKickSound);
    const leftKickPlayer = useAudioPlayer(leftKickSound);


    const playAndReset = useCallback(async (player:AudioPlayer) => {
        console.log("useAudio - playAndReset");
        await player.seekTo(0);
        await player.play();
    }, []);

    const playRightHandClick = useCallback(() => {
        console.log("useAudio - playRightHandClick");
        playAndReset(rightHandPlayer);
    }, [rightHandPlayer, playAndReset]);

    const playLeftHandClick = useCallback(() => {
        console.log("useAudio - playLeftHandClick");
        playAndReset(leftHandPlayer);
    }, [leftHandPlayer, playAndReset]);

    const playBothHandsClick = useCallback(() => {
        console.log("useAudio - playBothHandsClick");
        playAndReset(bothHandsPlayer);
    }, [bothHandsPlayer, playAndReset]);

    const playRightKick = useCallback(() => {
        console.log("useAudio - playRightKick");
        playAndReset(rightKickPlayer);
    }, [rightKickPlayer, playAndReset]);

    const playLeftKick = useCallback(() => {
        console.log("useAudio - playLeftKick");
        playAndReset(leftKickPlayer);
    }, [leftKickPlayer, playAndReset]);

    return {
        playRightHandClick,
        playLeftHandClick,
        playBothHandsClick,
        playRightKick,
        playLeftKick,
    };
};

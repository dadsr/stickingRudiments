import {AudioPlayer, useAudioPlayer} from 'expo-audio';
import { useCallback } from 'react';
import {bothHandsSound, leftHandSound, leftFootSound, noHandsSound, rightHandSound, rightFootSound} from "../assets";


export const useAudio = () => {
    console.log("useAudio()");

    const rightHandPlayer = useAudioPlayer(rightHandSound);
    const leftHandPlayer = useAudioPlayer(leftHandSound);
    const bothHandsPlayer = useAudioPlayer(bothHandsSound);
    const noHandsPlayer = useAudioPlayer(noHandsSound);
    const rightFootPlayer = useAudioPlayer(rightFootSound);
    const leftFootPlayer = useAudioPlayer(leftFootSound);


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

    const playNoHandsClick = useCallback(() => {
        console.log("useAudio - playNoHandsClick");
        playAndReset(noHandsPlayer);
    }, [noHandsPlayer, playAndReset]);

    const playRightFoot = useCallback(() => {
        console.log("useAudio - playRightKick");
        playAndReset(rightFootPlayer);
    }, [rightFootPlayer, playAndReset]);

    const playLeftFoot = useCallback(() => {
        console.log("useAudio - playLeftKick");
        playAndReset(leftFootPlayer);
    }, [leftFootPlayer, playAndReset]);

    return {
        playRightHandClick,
        playLeftHandClick,
        playBothHandsClick,
        playNoHandsClick,
        playRightFoot,
        playLeftFoot,
    };
};

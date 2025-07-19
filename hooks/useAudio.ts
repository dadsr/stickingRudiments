import {AudioPlayer, useAudioPlayer} from 'expo-audio';
import { useCallback } from 'react';
import {accentSound, bothHandsSound, leftHandSound, leftFootSound, noHandsSound, rightHandSound, rightFootSound} from "../assets";


export const useAudio = () => {

    const accentPlayer = useAudioPlayer(accentSound);
    const rightHandPlayer = useAudioPlayer(rightHandSound);
    const leftHandPlayer = useAudioPlayer(leftHandSound);
    const bothHandsPlayer = useAudioPlayer(bothHandsSound);
    const noHandsPlayer = useAudioPlayer(noHandsSound);
    const rightFootPlayer = useAudioPlayer(rightFootSound);
    const leftFootPlayer = useAudioPlayer(leftFootSound);


    const playAndReset = useCallback(async (player:AudioPlayer) => {
        await player.seekTo(0);
        await player.play();
    }, []);

    const playAccent = useCallback(() => {
        playAndReset(accentPlayer);
    }, [leftHandPlayer, playAndReset]);

    const playRightHandClick = useCallback(() => {
        playAndReset(rightHandPlayer);
    }, [rightHandPlayer, playAndReset]);

    const playLeftHandClick = useCallback(() => {
        playAndReset(leftHandPlayer);
    }, [leftHandPlayer, playAndReset]);

    const playBothHandsClick = useCallback(() => {
        playAndReset(bothHandsPlayer);
    }, [bothHandsPlayer, playAndReset]);

    const playNoHandsClick = useCallback(() => {
        playAndReset(noHandsPlayer);
    }, [noHandsPlayer, playAndReset]);

    const playRightFoot = useCallback(() => {
        playAndReset(rightFootPlayer);
    }, [rightFootPlayer, playAndReset]);

    const playLeftFoot = useCallback(() => {
        playAndReset(leftFootPlayer);
    }, [leftFootPlayer, playAndReset]);

    return {
        playRightHandClick,
        playLeftHandClick,
        playBothHandsClick,
        playNoHandsClick,
        playRightFoot,
        playLeftFoot,
        playAccent,
    };
};

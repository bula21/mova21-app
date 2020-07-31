import React, {useEffect} from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";
import {SafeAreaView} from "react-native-safe-area-context";
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';
import {Text, TouchableOpacity} from "react-native";
import MovaIcon from "../generic/MovaIcon";

const radioImage = require('../../../assets/radio_cover.png');

const MainContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;

export default function RadioMain() {
	const playbackState = usePlaybackState();

	useEffect(() => {
		TrackPlayer.setupPlayer();
		TrackPlayer.updateOptions({
			stopWithApp: false,
			capabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE,
				TrackPlayer.CAPABILITY_STOP
			],
			compactCapabilities: [
				TrackPlayer.CAPABILITY_PLAY,
				TrackPlayer.CAPABILITY_PAUSE
			]
		});
	}, []);

	async function togglePlayback() {
		const currentTrack = await TrackPlayer.getCurrentTrack();
		if (currentTrack == null) {
			await TrackPlayer.reset();
			await TrackPlayer.add({
				id: "mova-stream",
				url: "http://stream.srg-ssr.ch/m/drs3/mp3_128",
				title: "mova-Radio",
				artist: "aka DRS3",
				artwork: radioImage,
				duration: 60
			});
			await TrackPlayer.play();
		} else {
			if (playbackState === TrackPlayer.STATE_PAUSED) {
				await TrackPlayer.play();
			} else {
				await TrackPlayer.pause();
			}
		}
	}

	return (
		<MainContainer>
			<SafeAreaView>
				<MovaHeadingText>Radio</MovaHeadingText>
				<TouchableOpacity onPress={() => togglePlayback()}>
					{
						playbackState == TrackPlayer.STATE_PLAYING || playbackState === TrackPlayer.STATE_BUFFERING
						? <MovaIcon name={'pause'} size={100}/>
						: <MovaIcon name={'play'} size={100}/>
					}
				</TouchableOpacity>
			</SafeAreaView>
		</MainContainer>
	);
}

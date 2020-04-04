import React from 'react';
import MapView from 'react-native-maps';
import styled from "styled-components/native";
import {Dimensions} from "react-native";

const MainContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;


export default function MapMain() {
	return (
		<MainContainer>
			<MapView
				style={{
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
				}}
				initialRegion={{
					latitude: 46.5021646,
					longitude: 8.2962415,
					latitudeDelta: 0.065,
					longitudeDelta: 0.04,
				}}
				minZoomLevel={8}
				mapType="hybrid"
				//provider="google"
			/>
		</MainContainer>
	);
}

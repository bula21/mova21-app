import React from 'react';
import {Text} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import styled from 'styled-components/native';

const MapContainer = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 20px;
`;

interface IMapScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class MapScreen extends React.Component<IMapScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Karte'
		};
	};

	render() {
		return (
			<MapContainer>
				<Text>Hier kommt die Karte hin</Text>
			</MapContainer>
		);
	}
}

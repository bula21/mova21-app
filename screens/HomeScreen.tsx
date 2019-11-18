import React from 'react';
import {Button, Image, Text} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import styled from 'styled-components/native';
import HomeMenuItem from "../components/HomeMenuItem";

const HomeContainer = styled.View`
	flex: 1;
	background-color: #fff;
`;

const HomeImage = styled.Image`
	width: 100%;
	height: 240px;
`;

const HomeMenu = styled.View`
	padding-top: 10px;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;
`;

interface IHomeScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class HomeScreen extends React.Component<IHomeScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Home'
		};
	};

	render() {
		return (
			<HomeContainer>
				<HomeImage source={require('../assets/home_placeholder.jpg')}/>
				<HomeMenu>
					<HomeMenuItem
						navigateTo={'News'}
						title={'News'}
						icon={'ios-paper'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'Map'}
						title={'Karte'}
						icon={'ios-map'}
						navigation={this.props.navigation}
					/>
				</HomeMenu>
			</HomeContainer>
		);
	}
}

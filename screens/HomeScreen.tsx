import React from 'react';
import {Button, Text} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import styled from 'styled-components/native';

const HomeContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
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
				<Text>Welcome Home!</Text>
				<Button
					title="See the News"
					onPress={() => this.props.navigation.navigate('News')}
				/>
			</HomeContainer>
		);
	}
}

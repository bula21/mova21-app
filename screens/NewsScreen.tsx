import React from 'react';
import {Text} from 'react-native';
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import styled from 'styled-components/native';

const NewsContainer = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 20px;
`;

interface INewsScreenProps {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class NewsScreen extends React.Component<INewsScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'News'
		};
	};

	render() {
		return (
			<NewsContainer>
				<Text>Here are the News</Text>
			</NewsContainer>
		);
	}
}

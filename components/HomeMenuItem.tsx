import React from 'react';
import styled from "styled-components/native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import {Ionicons} from "@expo/vector-icons";
import MovaTheme from "../constants/MovaTheme";

const MenuText = styled.Text`
	font-weight: bold;
	font-size: 18px;
	text-align: center;
`;

const MenuIcon = styled.View`
	padding: 5px;
`;

const HomeMenuItemTouchable = styled.TouchableOpacity`
	padding: 10px 20px;
	background: ${MovaTheme.colorYellow};
	width: 30%;
	height: 100px;
	border-radius: 5px;
	margin: 10px 0;
`;

interface IHomeMenuItemProps {
	navigateTo: string;
	title: string;
	icon: string;
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class HomeMenuItem extends React.Component<IHomeMenuItemProps> {

	public navigate() {
		this.props.navigation.navigate(this.props.navigateTo);
	}

	render() {
		return (
			<HomeMenuItemTouchable
				onPress={() => this.navigate()}
			>
				<MenuIcon>
					<Ionicons
						name={this.props.icon}
						size={32}
						style={{alignSelf:'center'}}
					/>
				</MenuIcon>
				<MenuText>{this.props.title}</MenuText>
			</HomeMenuItemTouchable>
		);
	}
}

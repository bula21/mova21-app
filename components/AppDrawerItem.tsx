import React from 'react';
import styled from "styled-components/native";
import {NavigationParams, NavigationScreenProp, NavigationState} from "react-navigation";
import {Ionicons} from "@expo/vector-icons";
import { DrawerActions } from 'react-navigation-drawer';

const MenuText = styled.Text`
	font-weight: bold;
	font-size: 18px;
	flex: 6;
`;

const AppDrawerItemTouchable = styled.TouchableOpacity`
	padding: 10px 20px;
	flex-direction: row;
	margin-bottom: 1px;
`;

interface IAppDrawerItemProps {
	navigateTo: string;
	title: string;
	icon: string;
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class AppDrawerItem extends React.Component<IAppDrawerItemProps> {

	public navigate() {
		this.props.navigation.navigate(this.props.navigateTo);
		this.props.navigation.dispatch(DrawerActions.closeDrawer());
	}

	render() {
		return (
			<AppDrawerItemTouchable
				onPress={() => this.navigate()}
			>
				<Ionicons
					name={this.props.icon}
					size={22}
					style={{marginBottom: -3, flex: 1}}
				/>
				<MenuText>{this.props.title}</MenuText>
			</AppDrawerItemTouchable>
		);
	}
}

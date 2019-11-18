import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer";
import styled from "styled-components/native";
import MovaTheme from "../constants/MovaTheme";
import AppDrawerItem from "./AppDrawerItem";


const AppTitleText = styled.Text`
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	padding: 20px 10px;
	color: ${MovaTheme.colorOrange};
`;

const DrawerView = styled.View`
	background: ${MovaTheme.colorYellow};
`;


export default class AppDrawer extends React.Component<DrawerContentComponentProps> {
	render() {
		return (
			<ScrollView style={{flex: 1, backgroundColor: MovaTheme.colorYellow}}>
				<SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
					<DrawerView>
						<AppTitleText>MOVA</AppTitleText>
						<AppDrawerItem
							navigateTo={'Home'}
							title={'Home'}
							icon={'ios-home'}
							navigation={this.props.navigation}
						>
						</AppDrawerItem>
						<AppDrawerItem
							navigateTo={'News'}
							title={'News'}
							icon={'ios-paper'}
							navigation={this.props.navigation}
						>
						</AppDrawerItem>
						<AppDrawerItem
							navigateTo={'Map'}
							title={'Karte'}
							icon={'ios-map'}
							navigation={this.props.navigation}
						>
						</AppDrawerItem>
					</DrawerView>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

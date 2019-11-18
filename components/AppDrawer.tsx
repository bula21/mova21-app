import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {ScrollView} from "react-native";
import {DrawerContentComponentProps} from "react-navigation-drawer";
import styled from "styled-components/native";
import MovaTheme from "../constants/MovaTheme";
import AppDrawerItem from "./AppDrawerItem";
import {WithTranslation, withTranslation} from "react-i18next";

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

interface IAppDrawerProps extends WithTranslation, DrawerContentComponentProps {}

class AppDrawer extends React.Component<IAppDrawerProps> {
	render() {
		const t = this.props.t;
		return (
			<ScrollView style={{flex: 1, backgroundColor: MovaTheme.colorYellow}}>
				<SafeAreaView style={{flex: 1}} forceInset={{ top: 'always', horizontal: 'never' }}>
					<DrawerView>
						<AppTitleText>MOVA</AppTitleText>
						<AppDrawerItem
							navigateTo={'home'}
							title={t('home')}
							icon={'ios-home'}
							navigation={this.props.navigation}
						>
						</AppDrawerItem>
						<AppDrawerItem
							navigateTo={'news'}
							title={t('news')}
							icon={'ios-paper'}
							navigation={this.props.navigation}
						>
						</AppDrawerItem>
						<AppDrawerItem
							navigateTo={'map'}
							title={t('map')}
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

export default withTranslation()(AppDrawer);

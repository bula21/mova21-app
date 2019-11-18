import React from 'react';
import styled from 'styled-components/native';
import HomeMenuItem from "../components/HomeMenuItem";
import {withTranslation} from "react-i18next";
import IDefaultScreenProps from "./IDefaultScreenProps";

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
	justify-content: space-evenly;
`;

const EmptyHomeMenuItem = styled.View`
	width: 28%;
`;

class HomeScreen extends React.Component<IDefaultScreenProps> {
	render() {
		const t = this.props.t;
		return (
			<HomeContainer>
				<HomeImage source={require('../assets/home_placeholder.jpg')}/>
				<HomeMenu>
					<HomeMenuItem
						navigateTo={'news'}
						title={t('news')}
						icon={'ios-paper'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('map')}
						icon={'ios-map'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('radio')}
						icon={'ios-play'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('info')}
						icon={'ios-information-circle'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('weather')}
						icon={'ios-sunny'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('help')}
						icon={'ios-help-buoy'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('timetable')}
						icon={'ios-calendar'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('emergency')}
						icon={'ios-notifications'}
						navigation={this.props.navigation}
					/>
					<EmptyHomeMenuItem/>
				</HomeMenu>
			</HomeContainer>
		);
	}
}

export default withTranslation()(HomeScreen);

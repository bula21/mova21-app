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
	justify-content: space-around;
`;

class HomeScreen extends React.Component<IDefaultScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Home'
		};
	};

	render() {
		const t = this.props.t;
		return (
			<HomeContainer>
				<HomeImage source={require('../assets/home_placeholder.jpg')}/>
				<HomeMenu>
					<HomeMenuItem
						navigateTo={'news'}
						title={t('News')}
						icon={'ios-paper'}
						navigation={this.props.navigation}
					/>
					<HomeMenuItem
						navigateTo={'map'}
						title={t('Karte')}
						icon={'ios-map'}
						navigation={this.props.navigation}
					/>
				</HomeMenu>
			</HomeContainer>
		);
	}
}

export default withTranslation()(HomeScreen);

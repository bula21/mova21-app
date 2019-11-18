import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {withTranslation} from "react-i18next";
import IDefaultScreenProps from "./IDefaultScreenProps";

const MapContainer = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 20px;
`;

class MapScreen extends React.Component<IDefaultScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'Karte'
		};
	};

	render() {
		const t = this.props.t;
		return (
			<MapContainer>
				<Text>{t('Hier kommt die Karte hin')}</Text>
			</MapContainer>
		);
	}
}

export default withTranslation()(MapScreen);

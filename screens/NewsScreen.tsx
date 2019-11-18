import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {withTranslation} from "react-i18next";
import IDefaultScreenProps from "./IDefaultScreenProps";

const NewsContainer = styled.View`
	flex: 1;
	background-color: #fff;
	padding: 20px;
`;

class NewsScreen extends React.Component<IDefaultScreenProps> {

	static navigationOptions = ({navigation}: any) => {
		return {
			title: 'News'
		};
	};

	render() {
		const t = this.props.t;
		return (
			<NewsContainer>
				<Text>{t('Here are the News')}</Text>
			</NewsContainer>
		);
	}
}

export default withTranslation()(NewsScreen);

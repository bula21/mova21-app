import React from 'react';
import {Text} from 'react-native';
import {useTranslation} from "react-i18next";
import styled from "styled-components/native";

const NewsItemContainer = styled.View`
	background-color: #eee;
	margin: 10px;
`;

const NewsItemTitle = styled.View`
	padding: 10px;
`;

const NewsImage = styled.Image`
	width: 100%;
	height: 240px;
`;

export default function NewsItem({ data }) {
	const { t } = useTranslation();
	return (
		<NewsItemContainer>
			<NewsImage source={require('../../assets/home_placeholder.jpg')}/>
			<NewsItemTitle>
				<Text>{data.title}</Text>
			</NewsItemTitle>
		</NewsItemContainer>
	);
}


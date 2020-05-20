import React from 'react';
import {useTranslation} from "react-i18next";
import styled from "styled-components/native";
import MovaText from "../generic/MovaText";
import MovaTheme from "../../constants/MovaTheme";

const NewsItemContainer = styled.View`
	padding-bottom: 20px;
`;

const NewsItemTitle = styled.View`
	padding: 10px;
	padding-bottom: 0;
`;

const NewsItemDate = styled.View`
	padding: 10px;
	padding-top: 0;
`;
const NewsItemDateText = styled.Text`
	color: ${MovaTheme.colorGrey};
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
				<MovaText style={{ fontSize: 24}}>{data.title}</MovaText>
			</NewsItemTitle>
			<NewsItemDate>
				<MovaText>
					<NewsItemDateText>
						vor 3 Tagen
					</NewsItemDateText>
				</MovaText>
			</NewsItemDate>
		</NewsItemContainer>
	);
}


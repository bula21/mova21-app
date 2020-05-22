import React from 'react';
import styled from "styled-components/native";
import MovaText from "../generic/MovaText";
import MovaTheme from "../../constants/MovaTheme";
import {TouchableOpacity} from "react-native";
import {INews} from "./INews";
import {StackNavigationProp} from "@react-navigation/stack";

const NewsItemContainer = styled.View<{ color: string }>`
	padding-bottom: 20px;
	background-color: ${props => MovaTheme.getColorByName(props.color)};
	margin-bottom: 10px;
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

type NavigationProp = StackNavigationProp<
	{ newspage: { news: INews } },
	'newspage'
>;

export default function NewsFeedItem({ news, navigation }: { news: INews; navigation: NavigationProp }) {
	return (
		<TouchableOpacity onPress={() => navigation.navigate('newspage', { news: news})}>
			<NewsItemContainer color={news.color}>
				<NewsImage source={require('../../assets/home_placeholder.jpg')}/>
				<NewsItemTitle>
					<MovaText style={{ fontSize: 24}}>{news.title}</MovaText>
				</NewsItemTitle>
				<NewsItemDate>
					<MovaText>
						<NewsItemDateText>
							vor 3 Tagen
						</NewsItemDateText>
					</MovaText>
				</NewsItemDate>
			</NewsItemContainer>
		</TouchableOpacity>
	);
}


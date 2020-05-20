import React from 'react';
import {FlatList} from 'react-native';
import {useTranslation} from "react-i18next";
import styled from "styled-components/native";
import NewsItem from "./NewsItem";
import Constants from 'expo-constants';
import DATA from './example_news.json';
import MovaHeadingText from "../generic/MovaHeadingText";

const MainContainer = styled.SafeAreaView`
	background-color: #fff;
	flex: 1;
	margin-top: ${Constants.statusBarHeight}px;
`;

const NewsHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;

export default function NewsMain() {
	const {t} = useTranslation();
	return (

		<MainContainer>
			<FlatList
				data={DATA}
				renderItem={({item}) => <NewsItem data={item}/>}
				keyExtractor={item => item.id}
				ListHeaderComponent={<NewsHeader><MovaHeadingText>mova-News</MovaHeadingText></NewsHeader>}
			/>
		</MainContainer>
	);
}


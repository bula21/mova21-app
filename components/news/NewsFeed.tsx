import React from 'react';
import {FlatList} from 'react-native';
import styled from "styled-components/native";
import NewsItem from "./NewsItem";
import Constants from 'expo-constants';
import DATA from './example_news.json';
import MovaHeadingText from "../generic/MovaHeadingText";
import {StackNavigationProp} from "@react-navigation/stack";
import {INews} from "./INews";

const MainContainer = styled.SafeAreaView`
	background-color: #fff;
	flex: 1;
	margin-top: ${Constants.statusBarHeight}px;
`;

const NewsHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;

type NavigationProp = StackNavigationProp<
	{ newspage: { news: INews } },
	'newspage'
>;

export default function NewsMain({ navigation }: { navigation: NavigationProp }) {
	return (
		<MainContainer>
			<FlatList
				data={DATA}
				renderItem={({item}) => <NewsItem news={item} navigation={navigation}/>}
				keyExtractor={item => item.id}
				ListHeaderComponent={<NewsHeader><MovaHeadingText>mova-News</MovaHeadingText></NewsHeader>}
			/>
		</MainContainer>
	);
}


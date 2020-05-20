import React from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";
import {FlatList} from "react-native";
import Constants from 'expo-constants';
import {useTranslation} from "react-i18next";
import DATA from './example_pages.json';
import InfosItem from "./InfosItem";

const MainContainer = styled.View`
	background-color: #fff;
	flex: 1;
	margin-top: ${Constants.statusBarHeight}px;
`;

const InfosHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;

export default function InfosMain() {
	const {t} = useTranslation();

	return (
		<MainContainer>
			<FlatList
				data={DATA}
				renderItem={({item, index}) => <InfosItem data={item} alternate={!!(index % 2)}/>}
				keyExtractor={item => item.id}
				ListHeaderComponent={<InfosHeader><MovaHeadingText>{t('info')}</MovaHeadingText></InfosHeader>}
			/>
		</MainContainer>
	);
}

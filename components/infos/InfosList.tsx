import React from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";
import {FlatList, TouchableOpacity} from "react-native";
import Constants from 'expo-constants';
import {useTranslation} from "react-i18next";
import DATA from './example_pages.json';
import MovaTheme from "../../constants/MovaTheme";
import MovaText from "../generic/MovaText";

const MainContainer = styled.View`
	background-color: #fff;
	flex: 1;
	margin-top: ${Constants.statusBarHeight}px;
`;

const InfosItem = styled.View`
	padding: 10px;
`;

const InfosHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;

export default function InfosList({ navigation }) {
	const {t} = useTranslation();

	return (
		<MainContainer>
			<FlatList
				data={DATA}
				renderItem={({item, index}) =>
					<TouchableOpacity onPress={() => navigation.navigate('infopage', { page: item})}>
						<InfosItem style={{backgroundColor: index % 2 ? MovaTheme.colorBlue : MovaTheme.colorYellow}}>
							<MovaText style={{fontSize: 40}}>{item.title}</MovaText>
						</InfosItem>
					</TouchableOpacity>
				}
				keyExtractor={item => item.id}
				ListHeaderComponent={<InfosHeader><MovaHeadingText>{t('info')}</MovaHeadingText></InfosHeader>}
			/>
		</MainContainer>
	);
}

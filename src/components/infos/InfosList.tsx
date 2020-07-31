import React from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";
import {FlatList, TouchableOpacity} from "react-native";
import {useTranslation} from "react-i18next";
import DATA from './example_pages.json';
import MovaTheme from "../../constants/MovaTheme";
import MovaText from "../generic/MovaText";
import {StackNavigationProp} from "@react-navigation/stack";
import {IPage} from "./IPage";
import {SafeAreaView} from "react-native-safe-area-context";

const MainContainer = styled.View`
	background-color: #fff;
	flex: 1;
	
`;

const InfosItem = styled.View`
	padding: 10px;
`;

const InfosHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;

type NavigationProp = StackNavigationProp<
	{ infopage: { page: IPage } },
	'infopage'
>;

export default function InfosList({ navigation }: { navigation: NavigationProp}) {
	const {t} = useTranslation();

	return (
		<MainContainer>
			<SafeAreaView>
				<FlatList
					data={DATA}
					renderItem={({item, index}) =>
						<TouchableOpacity onPress={() => navigation.navigate('infopage', { page: item})}>
							<InfosItem style={{backgroundColor: index % 2 ? MovaTheme.colorBlue : MovaTheme.colorYellow}}>
								<MovaText style={{fontSize: 40}}>{item.title}</MovaText>
							</InfosItem>
						</TouchableOpacity>
					}
					keyExtractor={item => String(item.id)}
					ListHeaderComponent={<InfosHeader><MovaHeadingText>{t('info')}</MovaHeadingText></InfosHeader>}
				/>
			</SafeAreaView>
		</MainContainer>
	);
}

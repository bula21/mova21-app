import React from 'react';
import styled from "styled-components/native";
import Constants from 'expo-constants';
import MovaHeadingText from "../generic/MovaHeadingText";
import {ScrollView, TouchableOpacity} from "react-native";
import IconBack from "../generic/IconBack";
import { StackScreenProps } from '@react-navigation/stack';
import {IPage} from "./IPage";
import MovaWebView from "../generic/MovaWebView";


const PageContainer = styled.View`
	background-color: #fff;
	flex: 1;
	margin-top: ${Constants.statusBarHeight}px;
`;

const PageHeader = styled.View`
	padding: 10px;
	margin-top: 10px;
`;
const PageContent = styled.View`
	padding: 10px;
`;

type RootStackParamList = { infospage: { page: IPage }; };
type Props = StackScreenProps<RootStackParamList, 'infospage'>;

export default function InfosPage({ route, navigation }: Props) {
	const { page } = route.params;
	return (
		<ScrollView>
			<PageContainer>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<PageHeader>
						<MovaHeadingText><IconBack/> {page.title}</MovaHeadingText>
					</PageHeader>
				</TouchableOpacity>
				<PageContent>
					<MovaWebView
						html={page.content}
					/>
				</PageContent>
			</PageContainer>
		</ScrollView>
	);
}


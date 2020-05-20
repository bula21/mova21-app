import React from 'react';
import styled from "styled-components/native";
import Constants from 'expo-constants';
import MovaHeadingText from "../generic/MovaHeadingText";
import {TouchableOpacity} from "react-native";
import MovaText from "../generic/MovaText";

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

export default function InfosPage({ route, navigation }) {
	const { page } = route.params;
	return (
		<PageContainer>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<PageHeader>
					<MovaHeadingText>&lt; {page.title}</MovaHeadingText>
				</PageHeader>
			</TouchableOpacity>
			<PageContent>
				<MovaText>{page.content}</MovaText>
			</PageContent>
		</PageContainer>
	);
}


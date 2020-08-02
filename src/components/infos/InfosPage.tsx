import React from 'react';
import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import MovaHeadingText from "../generic/MovaHeadingText";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import IconBack from "../generic/IconBack";
import { StackScreenProps } from '@react-navigation/stack';
import {IPage} from "./IPage";
import Markdown from 'react-native-markdown-renderer';

const PageContainer = styled.View`
	background-color: #fff;
	flex: 1;
	margin-top: ${getStatusBarHeight()}px;
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

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: 'MessinaSans-Bold'
	}
});

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
					<Markdown style={styles}>{page.content}</Markdown>
				</PageContent>
			</PageContainer>
		</ScrollView>
	);
}


import React from 'react';
import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import MovaHeadingText from "../generic/MovaHeadingText";
import {ScrollView, TouchableOpacity} from "react-native";
import MovaText from "../generic/MovaText";
import MovaTheme from "../../constants/MovaTheme";
import IconBack from "../generic/IconBack";
import {INews} from "./INews";
import {StackScreenProps} from "@react-navigation/stack";
import moment from "moment";
import DateObjectFromDatetime from "../../helpers/DateObjectFromDatetime";
import { useTranslation } from 'react-i18next';

const PageContainer = styled.View`
	flex: 1;
	margin-top: ${getStatusBarHeight()}px;
`;

const PageHeader = styled.View<{ color: string }>`
	padding: 10px;
	padding-top: 20px;
	background-color: ${props => MovaTheme.getColorByName(props.color)};
`;

const NewsTitle = styled.View`
	padding-top: 10px;
	padding-bottom: 10px;
`;

const PageContent = styled.View`
	padding: 10px;
`;

const NewsImage = styled.Image`
	width: 100%;
	height: 240px;
`;

const NewsDate = styled.View`
	padding: 0;
	padding-bottom: 20px;
`;
const NewsDateText = styled.Text`
	color: ${MovaTheme.colorGrey};
`;

type RootStackParamList = { newspage: { news: INews }; };
type Props = StackScreenProps<RootStackParamList, 'newspage'>;

export default function NewsPage({ route, navigation }: Props) {
	const { news } = route.params;
	
	const { t, i18n } = useTranslation();
	return (
		<ScrollView>
			<PageContainer>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<PageHeader color="blue">
						<MovaHeadingText><IconBack/> {t('news')}</MovaHeadingText>
					</PageHeader>
				</TouchableOpacity>
				{
					news.image !== null && news.image.data && news.image.data.full_url
					? <NewsImage source={{uri: news.image.data.full_url}}/>
					: null
				}
				<PageContent>
					<NewsTitle>
						<MovaText style={{ fontSize: 24}}>{news.title}</MovaText>
					</NewsTitle>
					<NewsDate>
						<MovaText>
							<NewsDateText>
								{moment(DateObjectFromDatetime(news.date)).fromNow()}
							</NewsDateText>
						</MovaText>
					</NewsDate>
					<MovaText>{news.content}</MovaText>
				</PageContent>
			</PageContainer>
		</ScrollView>
	);
}


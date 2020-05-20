import React from 'react';
import styled from "styled-components/native";
import MovaText from "../generic/MovaText";
import MovaTheme from "../../constants/MovaTheme";

const InfosItemContainer = styled.View`
	padding: 10px;
`;

export default function InfosItem({ data, alternate }) {
	return (
		<InfosItemContainer style={{backgroundColor: alternate ? MovaTheme.colorBlue : MovaTheme.colorYellow}}>
			<MovaText style={{fontSize: 40}}>{data.title}</MovaText>
		</InfosItemContainer>
	);
}


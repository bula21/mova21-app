import React from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";

const MainContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;

export default function RadioMain() {
	return (
		<MainContainer>
			<MovaHeadingText>Radio</MovaHeadingText>
		</MainContainer>
	);
}

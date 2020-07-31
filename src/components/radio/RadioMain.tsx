import React from 'react';
import styled from "styled-components/native";
import MovaHeadingText from "../generic/MovaHeadingText";
import {SafeAreaView} from "react-native-safe-area-context";

const MainContainer = styled.View`
	flex: 1;
	background-color: #fff;
	align-items: center;
	justify-content: center;
`;

export default function RadioMain() {
	return (
		<MainContainer>
			<SafeAreaView>
				<MovaHeadingText>Radio</MovaHeadingText>
			</SafeAreaView>
		</MainContainer>
	);
}

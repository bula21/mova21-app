import React from 'react';
import styled from "styled-components/native";
import { Platform } from 'react-native';

export default styled.Text`
	font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
	font-size: 40px;
`;

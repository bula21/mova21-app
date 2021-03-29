import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';

export default styled.Text`
  font-size: 16px;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
`;

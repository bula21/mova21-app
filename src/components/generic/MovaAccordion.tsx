import React, { Component, useState } from 'react';
import { TouchableOpacity, View, LayoutAnimation, Platform, UIManager} from 'react-native';
import MovaTheme from '../../constants/MovaTheme';
import styled from 'styled-components/native';
import MovaIcon from './MovaIcon';

type Props = {
    header: string;
    children: React.ReactNode;
};

const AccordionContainer = styled.View`
    padding: 10px;
    background-color: ${MovaTheme.colorOrange};
`;

const AccordionHeader = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const AccordionHeaderText = styled.Text`
    font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
    font-size: 32px;
`;


export default function MovaAccordion(props:Props) {
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const [expanded, setExpanded] = useState(false);
    const onHeaderPress = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };
    return (
        <AccordionContainer>
            <TouchableOpacity onPress={onHeaderPress}>
                <AccordionHeader>
                    <AccordionHeaderText>{props.header}</AccordionHeaderText>
                    <MovaIcon size={40} name={expanded ? 'minus' : 'plus'} />
                </AccordionHeader>
            </TouchableOpacity>
            <View/>
            {
                expanded &&
                <View>
                    {props.children}
                </View>
            }
       </AccordionContainer>
        );
}

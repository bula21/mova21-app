import React, {ReactNode} from 'react';
import Markdown from 'react-native-markdown-display';
import {Platform, StyleSheet} from 'react-native';
import MovaTheme from "../../constants/MovaTheme";

const fontFamily = Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold';

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontFamily: fontFamily,
  },
  heading1: {
    fontSize: 40,
  },
  heading2: {
    fontSize: 30,
  },
  heading3: {
    fontSize: 24,
  },
  heading4: {
    fontSize: 20,
  },
  heading5: {
    fontSize: 18,
  },
  heading6: {
    fontSize: 16,
  },
  blockquote: {
    backgroundColor: MovaTheme.colorOrange,
    borderLeftWidth: 0,
    marginLeft: 0,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  code_block: {
    borderWidth: 0,
    backgroundColor: MovaTheme.colorBlue,
    padding: 0,
    paddingHorizontal: 2,
    paddingVertical: 10,
    ...Platform.select({
      ['ios']: {
        fontFamily: 'MessinaSans-Bold',
      },
      ['android']: {
        fontFamily: 'MS-Bold',
      },
    }),
  },
  // Horizontal Rule
  hr: {
    backgroundColor: '#000000',
    height: 2,
  },
  // Links
  link: {
    textDecorationLine: 'underline',
    color: MovaTheme.colorBlue
  },
  // Tables
  table: {
    borderWidth: 0,
    borderRadius: 0,
    marginTop: 10,
    marginBottom: 10,
  },
  thead: {},
  tbody: {},
  th: {
    flex: 1,
    padding: 10,
    backgroundColor: MovaTheme.colorBlack,
    color: MovaTheme.colorWhite
  },
  tr: {
    borderBottomWidth: 5,
    borderColor: 'transparent',
    flexDirection: 'row',
  },
  td: {
    flex: 1,
    padding: 10,
    paddingVertical: 5,
    backgroundColor: MovaTheme.colorYellow
  },
});

type Props = {
  children: ReactNode;
};

export default function MovaMarkdown(props: Props) {
  return <Markdown style={styles}>{props.children}</Markdown>;
}

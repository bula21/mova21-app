import React, {ReactNode} from 'react';
import Markdown from 'react-native-markdown-display';
import {Platform, StyleSheet} from 'react-native';

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
});

type Props = {
  children: ReactNode;
};

export default function MovaMarkdown(props: Props) {
  return <Markdown style={styles}>{props.children}</Markdown>;
}

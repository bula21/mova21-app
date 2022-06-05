import React, {ReactNode} from 'react';
import Markdown, { MarkdownIt } from 'react-native-markdown-display';
import blockEmbedPlugin from 'markdown-it-block-embed';
import {Platform, StyleSheet} from 'react-native';
import MovaTheme from "../../constants/MovaTheme";
import { StackNavigationProp } from '@react-navigation/stack';
import { IPage } from '../infos/IPage';
import { InfopagesStore } from '../../stores/InfopagesStore';
import YoutubePlayer from "react-native-youtube-iframe";
import { useWindowDimensions } from 'react-native';

const fontFamily = Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold';

const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    fontFamily: fontFamily,
    lineHeight: 22,
  },
  heading1: {
    fontSize: 40,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 50,
  },
  heading2: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 40,
  },
  heading3: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 34,
  },
  heading4: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 30,
  },
  heading5: {
    fontSize: 18,
    marginTop: 10,
    lineHeight: 28,
  },
  heading6: {
    fontSize: 16,
    marginTop: 10,
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

const markdownItInstance =
    MarkdownIt({typographer: true})
      .use(blockEmbedPlugin, {
        containerClassName: "video-embed"
      });

type Props = {
  children: ReactNode;
  navigation: StackNavigationProp<
    {infopage: {page: IPage}},
    'infopage'
  >;
};

export default function MovaMarkdown(props: Props) {

  const { width } = useWindowDimensions();

  const clickMarkdownLink = (url: string): boolean => {
    const id = Number(url);
    if (Number.isNaN(id)) {
      // return true to open URL as usual
      return true
    }
    const page = InfopagesStore.getPage(id);
    if (page) {
      props.navigation.push(
        'infopage', { page }
      );
    }
    // return false to prevent default
    return false;
  }  

  return <Markdown
    style={styles}
    onLinkPress={clickMarkdownLink}
    markdownit={markdownItInstance}
    rules={{
        video: (node) =>{
          return (
              <YoutubePlayer
                key={node.key}
                height={width / 1.78} // 16:9
                videoId={node.sourceInfo.videoID}
              />
          );
        }

      }}
  >
    {props.children}
  </Markdown>;
}

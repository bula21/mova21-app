import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import Markdown, {ASTNode, MarkdownIt} from 'react-native-markdown-display';
import blockEmbedPlugin from 'markdown-it-block-embed';
import containerPlugin from 'markdown-it-container';
import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import MovaTheme from "../../constants/MovaTheme";
import { StackNavigationProp } from '@react-navigation/stack';
import { IPage } from '../infos/IPage';
import { InfopagesStore } from '../../stores/InfopagesStore';
import YoutubePlayer from "react-native-youtube-iframe";
import { useWindowDimensions } from 'react-native';
import MovaText from "./MovaText";

const fontFamily = Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold';

const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  min-height: 50px;
  background: ${MovaTheme.colorBlue};
`;

let styles = {
  body: {
    fontSize: 16,
    fontFamily: fontFamily,
    lineHeight: 21,
  },
  heading1: {
    fontSize: 40,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 40,
  },
  heading2: {
    fontSize: 30,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 30,
  },
  heading3: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 26,
  },
  heading4: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 5,
    lineHeight: 24,
  },
  heading5: {
    fontSize: 18,
    marginTop: 10,
    lineHeight: 22,
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
  image: {
    marginLeft: -10,
    marginRight: -10,
    marginTop: -10,
    borderColor: '#ff0000',
  }
};

const markdownItInstance =
    MarkdownIt({typographer: true})
      .use(blockEmbedPlugin, {
        containerClassName: "video-embed"
      })
      .use(containerPlugin, 'button');

type Props = {
  children: ReactNode;
  coloredLinks?: boolean;
  navigation: StackNavigationProp<
    {infopage: {page: IPage}},
    'infopage'
  >;
};

export default function MovaMarkdown(props: Props) {

  const { width } = useWindowDimensions();

  const clickMarkdownLink = (url: string): boolean => {
    if (url.toLowerCase().startsWith('map:')) {
      props.navigation.navigate('map', { id: url.substring(4).trim() });
      return false;
    }
    const id = Number(url);
    if (Number.isNaN(id)) {
      // open URL as usual
      Linking.openURL(url);
      return false;
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

  let localStyles = styles;
  if (props.coloredLinks === false) {
    localStyles = JSON.parse(JSON.stringify(styles));
    localStyles.link.color = '#00000f'
  }
  let stylesheet = StyleSheet.create(localStyles);

  return <Markdown
    style={stylesheet}
    onLinkPress={clickMarkdownLink}
    markdownit={markdownItInstance}
    rules={{
        video: (node) =>{
          // Syntax:
          //
          // @[youtube](9xvSsiVLWcc)
          return (
              <YoutubePlayer
                webViewStyle={{opacity: 0.99}}
                key={node.key}
                height={width / 1.78} // 16:9
                videoId={node.sourceInfo.videoID}
              />
          );
        },
        container_button: (node) =>{
          // Syntax:
          //
          // ::: button
          // https://mova.ch
          // Open Browser
          // :::
          let url: ASTNode;
          let newline: ASTNode;
          let labels: ASTNode[];
          [url, newline, ...labels] = node.children[0].children[0].children;
          labels = labels.filter(label => label.sourceType === 'text');
          return (
              <TouchableOpacity onPress={() => clickMarkdownLink(url.content)} key={node.key}>
                <ButtonContainer>
                  {
                    labels.map(label => (
                      <MovaText key={label.key}>{label.content}</MovaText>
                    ))
                  }
                </ButtonContainer>
              </TouchableOpacity>
          );
        }

      }}
  >
    {props.children}
  </Markdown>;
}

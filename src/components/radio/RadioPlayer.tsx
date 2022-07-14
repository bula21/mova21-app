import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {SafeAreaView} from 'react-native-safe-area-context';
// https://github.com/tanguyantoine/react-native-music-control
import MusicControl, {Command} from 'react-native-music-control';
// https://www.npmjs.com/package/react-native-video
import Video from 'react-native-video';

import { Platform, TouchableOpacity, View } from 'react-native';
import MovaIcon from '../generic/MovaIcon';
import MovaTheme from '../../constants/MovaTheme';
import {BackendProxy} from "../../helpers/BackendProxy";
import MovaMarkdown from "../generic/MovaMarkdown";
import {useFocusEffect} from "@react-navigation/native";
import MovaText from '../generic/MovaText';
import IconDetailView from '../generic/IconDetailView';
import { InfopagesStore } from '../../stores/InfopagesStore';
import LanguageManager from '../../helpers/LanguageManager';

const radioImage = require('../../../assets/radio_cover.png');

// Create track interface
interface ITrack {
  title: string;
  artwork: any;
  artist: string;
}

const MainContainer = styled.View`
  flex: 1;
  background: white;
`;

const RadioHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  margin-top: 10px;
`;

const RadioStatusIndicator = styled.Text`
  padding: 2px 10px 2px 10px;
  letter-spacing: 1px;
  border-radius: 100px;
  font-weight: 800;
  font-size: 18px;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
  color: ${MovaTheme.colorWhite}
`;

const RadioContainer = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  background: ${MovaTheme.colorBlue};
`;

const RadioCover = styled.Image`
  flex: 1;
  align-self: center;
  justify-content: space-between;
  max-width: 100%;
`;

const RadioPlayerInfoLink = styled.TouchableOpacity`
  height: 50px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  overflow: hidden;
  background-color: ${MovaTheme.colorYellow};
`;

const RadioPlayerRow = styled.View`
  height: 130px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  padding: 0 15px;
  overflow: hidden;
  background-color: #2c2e34;
`;

const RadioPlayerOffline = styled.View`
  height: 130px;
  width: 100%;
  align-items: flex-start;
  flex-direction: row;
  background: ${MovaTheme.colorOrange};
  padding: 20px;
  overflow: hidden;
`;

const RadioPlayerControls = styled.View`
  align-items: center;
  justify-content: center;
`;

const RadioDescription = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: column;
  padding-left: 10px;
`;

const SongTitle = styled.Text`
  font-size: 24px;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
  color: #fff;
  margin-bottom: 8px;
`;

const BandName = styled.Text`
  font-size: 24px;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
  color: #afb0b3;
  margin-top: -5px;
`;

export default function RadioPlayer({navigation}: any) {
  // Reactive state of the music
  const [isLoading, setIsLoading] = React.useState(true);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [offlineText, setOfflineText] = React.useState('');
  const [currentTitle, setCurrentTitle] = React.useState('Sonar');
  const [currentArtist, setCurrentArtist] = React.useState('mova Radio');
  const [pageId, setPageId] = React.useState('');
  const [pageLinkText, setLinkText] = React.useState('...');
  const [streamURL, setStreamURL] = React.useState<string|null>(null);
  const [posterURL, setPosterURL] = React.useState<string>('https://app-backend.mova.ch/assets/54289b46-6c2b-4fb1-98e9-716b89384ed7');
  const [isOnAir, setIsOnAir] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<ITrack>({
    title: currentTitle,
    artwork: radioImage, // URL or RN's image require()
    artist: currentArtist,
  });

  // on mount
  useEffect(() => {
    loadConfig();
  }, []);

  // on tab focus
  useFocusEffect(
    React.useCallback(() => {
      loadConfig()
    }, [])
  );

  const loadConfig = () => {
    BackendProxy.fetchJson('/items/radio', false)
      .then((json) => {
        if (json) {
          //setIsOnAir(json.data.isOnline)
          setOfflineText(json.data.offlineText)
          setCurrentTitle(json.data.currentTitle)
          setCurrentArtist(json.data.currentArtist)
          setStreamURL(json.data.streamUrl)
          switch (LanguageManager.currentLanguage) {
            case 'fr':
                setPageId(json.data.pageId_fr)
                setLinkText(json.data.pageLinkText_fr)
                break;
            case 'it':
                setPageId(json.data.pageId_it)
                setLinkText(json.data.pageLinkText_it)
                break;
            case 'de':
            default:
                setPageId(json.data.pageId_de)
                setLinkText(json.data.pageLinkText_de)
                break;
          }
          if (json.data.posterUrl) {
            setPosterURL(json.data.posterUrl)
          }
          setCurrentTrack({
            title: currentTitle,
            artwork: radioImage, // URL or RN's image require()
            artist: currentArtist,
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  // Declare player reference
  let player: Video | null;

  const turnMusicOn = () => {
    if (!isInitialized) {
      // initialize controls only once
      MusicControl.enableControl('play', true);
      MusicControl.enableControl('pause', true);
      MusicControl.enableControl('nextTrack', false);
      MusicControl.enableBackgroundMode(true);
      MusicControl.enableControl('closeNotification', true, { when: 'paused' })
      // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
      MusicControl.handleAudioInterruptions(true);

      MusicControl.on(Command.play, () => {
        turnMusicOn();
      });

      MusicControl.on(Command.pause, () => {
        turnMusicOff(true);
      });
      setIsInitialized(true);
    }
    setIsPlaying(true);
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
    MusicControl.setNowPlaying({...currentTrack, colorized: true, isLiveStream: true});
  };

  const turnMusicOff = (remote: boolean) => {
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
    setIsPlaying(false);
    if(!remote) {
      MusicControl.resetNowPlaying()
    }
  };


  const handlePlayer = () => {
    isPlaying ? turnMusicOff(false) : turnMusicOn();
  };

  const openRadioPage = () => {
    if (pageId) {
      const page = InfopagesStore.getPage(parseInt(pageId));
      if (page) {
        console.log(navigation)
        navigation.push(
          'infopage', { page }
        );
      }
    }
  }

  const audio = streamURL ? (
    <Video
      source={{uri: streamURL}} // Can be a URL or a local file.
      ref={ref => {
        player = ref;
      }}
      paused={!isPlaying} // Pauses playback entirely.
      playInBackground={true}
      playWhenInactive={true}
      audioOnly={true}
      poster={posterURL}
      ignoreSilentSwitch="ignore"
    />
  ) : null;

  return (
    <MainContainer>
      <SafeAreaView edges={['top']} style={{flex: 1, alignSelf: 'stretch'}}>
        <RadioHeader>
          <MovaHeadingText>Radio</MovaHeadingText>
          {!isLoading
              ?
                <RadioStatusIndicator
                  style={{
                    backgroundColor: isOnAir ? MovaTheme.colorOrange : MovaTheme.colorGrey,
                  }}>
                  {isOnAir ? "On Air" : "Offline"}
                </RadioStatusIndicator>
              : []
          }
        </RadioHeader>
        <RadioContainer>
          <RadioCover source={currentTrack.artwork} />
          { !isLoading
              ? isOnAir
                ?
                  <>
                    {
                      pageId ?
                      <RadioPlayerInfoLink onPress={openRadioPage}>
                        <MovaText>{pageLinkText}</MovaText>
                        <IconDetailView/>
                      </RadioPlayerInfoLink>
                      : null
                    }
                  <RadioPlayerRow>
                    {
                      audio ?
                        <RadioPlayerControls>
                          <TouchableOpacity onPress={handlePlayer}>
                            <MovaIcon name={isPlaying ? 'pause' : 'play'} size={100} style={{color: MovaTheme.colorWhite}} />
                            {audio}
                          </TouchableOpacity>
                        </RadioPlayerControls>
                      : null
                    }
                    <RadioDescription>
                      <SongTitle>{currentTitle}</SongTitle>
                      <BandName>{currentArtist}</BandName>
                    </RadioDescription>
                  </RadioPlayerRow>
                  </>
                  : <RadioPlayerOffline><MovaMarkdown navigation={navigation} >{offlineText}</MovaMarkdown></RadioPlayerOffline>
              : <RadioPlayerRow/>
          }
        </RadioContainer>
      </SafeAreaView>
    </MainContainer>
  );
}

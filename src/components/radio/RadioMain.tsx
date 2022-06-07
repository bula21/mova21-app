import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {SafeAreaView} from 'react-native-safe-area-context';
// https://github.com/tanguyantoine/react-native-music-control
import MusicControl, {Command} from 'react-native-music-control';
// https://www.npmjs.com/package/react-native-video
import Video from 'react-native-video';

import {Platform, TouchableOpacity} from 'react-native';
import MovaIcon from '../generic/MovaIcon';
import MovaTheme from '../../constants/MovaTheme';
import {BackendProxy} from "../../helpers/BackendProxy";
import MovaMarkdown from "../generic/MovaMarkdown";
import {useFocusEffect} from "@react-navigation/native";

const radioImage = require('../../../assets/radio_cover.png');

// Create track interface
interface ITrack {
  title: string;
  artwork: any;
  artist: string;
}

const MainContainer = styled.View`
  flex: 1;
`;

const RadioHeader = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px;
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
  max-width: 100%;
  align-self: center;
  justify-content: space-between;
`;

const RadioPlayerRow = styled.View`
  height: 130px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  padding: 0 20px;
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

const RadioPlayer = styled.View`
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

export default function RadioMain({navigation}: any) {
  // Reactive state of the music
  const [isLoading, setIsLoading] = React.useState(true);
  const [offlineText, setOfflineText] = React.useState('');
  const [currentTitle, setCurrentTitle] = React.useState('Sonar');
  const [currentArtist, setCurrentArtist] = React.useState('mova Radio');
  const [streamURL, setStreamURL] = React.useState<string|null>(null);
  const [posterURL, setPosterURL] = React.useState<string>('https://app-backend.mova.ch/assets/54289b46-6c2b-4fb1-98e9-716b89384ed7');
  const [isOnAir, setIsOnAir] = React.useState(false);
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
    BackendProxy.fetchJson('/items/radio')
      .then((json) => {
        if (json) {
          setIsOnAir(json.data.isOnline)
          setOfflineText(json.data.offlineText)
          setCurrentTitle(json.data.currentTitle)
          setCurrentArtist(json.data.currentArtist)
          setStreamURL(json.data.streamUrl)
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
    setIsPlaying(true);
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
    MusicControl.setNowPlaying({...currentTrack, colorized: true, isLiveStream: true});
    console.log({...currentTrack, colorized: true, isLiveStream: true});
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('nextTrack', false);
    MusicControl.enableBackgroundMode(true);
    // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
    MusicControl.handleAudioInterruptions(true);
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

  useEffect(() => {
    MusicControl.on(Command.play, () => {
      turnMusicOn();
    });

    MusicControl.on(Command.pause, () => {
      turnMusicOff(true);
    });
  
    // MusicControl.resetNowPlaying();
  }, []);

  const handlePlayer = () => {
    isPlaying ? turnMusicOff(false) : turnMusicOn();
  };

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
                  <RadioPlayerRow>
                    {
                      audio ?
                        <RadioPlayer>
                          <TouchableOpacity onPress={handlePlayer}>
                            <MovaIcon name={isPlaying ? 'pause' : 'play'} size={100} style={{color: MovaTheme.colorWhite}} />
                            {audio}
                          </TouchableOpacity>
                        </RadioPlayer>
                      : null
                    }
                    <RadioDescription>
                      <SongTitle>{currentTitle}</SongTitle>
                      <BandName>{currentArtist}</BandName>
                    </RadioDescription>
                  </RadioPlayerRow>
                  : <RadioPlayerOffline><MovaMarkdown navigation={navigation} >{offlineText}</MovaMarkdown></RadioPlayerOffline>
              : []
          }
        </RadioContainer>
      </SafeAreaView>
    </MainContainer>
  );
}

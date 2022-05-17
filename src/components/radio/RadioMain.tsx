import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {SafeAreaView} from 'react-native-safe-area-context';
// https://github.com/tanguyantoine/react-native-music-control
import MusicControl, {Command} from 'react-native-music-control';
import {Platform, TouchableOpacity} from 'react-native';
import MovaIcon from '../generic/MovaIcon';
import MovaTheme from '../../constants/MovaTheme';
import {Slider} from '@miblanchard/react-native-slider';

const radioImage = require('../../../assets/radio_cover.png');

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
`;

const RadioContainer = styled.View`
  flex: 1;
  padding: 15px;
  background-color: #2c2e34;
  align-items: center;
`;

const RadioCover = styled.Image`
  max-width: 100%;
  height: 70%;
`;

const RadioPlayerRow = styled.View`
  height: 30%;
  width: 100%;
  align-items: center;
  flex-direction: row;
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
`;

const BandName = styled.Text`
  font-size: 24px;
  font-family: ${Platform.OS === 'ios' ? 'MessinaSans-Bold' : 'MS-Bold'};
  color: #afb0b3;
  margin-top: -5px;
`;

MusicControl.enableControl('play', true);
MusicControl.enableControl('pause', true);
MusicControl.enableControl('nextTrack', false);

export default function RadioMain() {
  // Reactive state of the music
  const [isOnAir, setIsOnAir] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<any>({
    title: 'mova Radio',
    artwork: radioImage, // URL or RN's image require()
    artist: 'mova crew',
    album: 'Thriller',
    genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
    duration: 294, // (Seconds)
    colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
    date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
    rating: 84, // Android Only (Boolean or Number depending on the type)
    notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
    isLiveStream: true, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
  });

  useEffect(() => {
    MusicControl.enableBackgroundMode(true);

    // on iOS, pause playback during audio interruptions (incoming calls) and resume afterwards.
    MusicControl.handleAudioInterruptions(true);

    MusicControl.on(Command.play, () => {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      });
      setIsPlaying(true);
    });

    MusicControl.on(Command.pause, () => {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
      setIsPlaying(false);
    });

    MusicControl.updatePlayback({
      state: MusicControl.STATE_PAUSED,
    });
  }, []);

  const handlePlayer = () => {
    if (isPlaying) {
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
      setIsPlaying(false);
      return;
    }
    MusicControl.updatePlayback({
      state: MusicControl.STATE_PLAYING,
    });
    MusicControl.setNowPlaying({...currentTrack});
    setIsPlaying(true);
  };

  return (
    <MainContainer>
      <SafeAreaView style={{flex: 1, alignSelf: 'stretch'}}>
        <RadioHeader>
          <MovaHeadingText>Radio</MovaHeadingText>
          <RadioStatusIndicator
            style={{
              backgroundColor: isOnAir ? MovaTheme.colorOrange : MovaTheme.colorGrey,
              color: isOnAir ? MovaTheme.colorWhite : MovaTheme.colorBlack,
            }}>
            On Air
          </RadioStatusIndicator>
        </RadioHeader>
        <RadioContainer>
          <RadioCover source={radioImage} />
          <RadioPlayerRow>
            <RadioPlayer>
              <TouchableOpacity onPress={handlePlayer}>
                <MovaIcon name={isPlaying ? 'pause' : 'play'} size={100} style={{color: MovaTheme.colorWhite}} />
              </TouchableOpacity>
            </RadioPlayer>
            <RadioDescription>
              <Slider
                maximumTrackTintColor={MovaTheme.colorGrey}
                minimumTrackTintColor={MovaTheme.colorOrange}
                thumbTintColor={MovaTheme.colorOrange}
                value={0.2}
                disabled={true}
              />
              <SongTitle>{currentTrack.title}</SongTitle>
              <BandName>{currentTrack.artist}</BandName>
            </RadioDescription>
          </RadioPlayerRow>
        </RadioContainer>
      </SafeAreaView>
    </MainContainer>
  );
}

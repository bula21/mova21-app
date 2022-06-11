import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import MovaHeadingText from '../generic/MovaHeadingText';
import {StackScreenProps} from '@react-navigation/stack';
import {Button, ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import IconBack from '../generic/IconBack';
import MovaText from '../generic/MovaText';
import appConfig from '../../appConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovaLoading from "../generic/MovaLoading";
import MovaTheme from '../../constants/MovaTheme';

let pkg = require('../../../package.json');

const PageContainer = styled.SafeAreaView`
  flex: 1;
  background: ${MovaTheme.colorYellow};
`;

const PageHeader = styled.View`
  padding: 10px;
  padding-top: 20px;
`;

const PageContent = styled.View`
  padding: 10px;
  background: white;
`;

const SettingsSection = styled.View`
  margin-bottom: 40px;
`;

const AnimatedDudeContainer = styled.View`
  background: ${MovaTheme.colorYellow};
  margin-right: -10px;
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: 20px;
  height: 400px;
  display: flex;
  align-content: flex-end;
`;

const AnimatedDude = styled.View`
  top: 100px;
  position: absolute;
  margin-top: 11px;
  margin-left: 30px;
`;

const Scores = styled.View`
  display: flex;
  flex-direction: column;
  text-align: right;
  padding: 10px;
`;

type Props = StackScreenProps<any, 'settings'>;

export default function SettingsMain({route, navigation}: Props) {
  const [newUrl, updateNewUrl] = useState(appConfig.backendUrl);
  const [showDev, setShowDev] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  function applyUrl() {
    appConfig.backendUrl = newUrl;
  }

  let clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  }

  function tapDude() {
    setSpeed(-14 + (position / 100));
  }

  useEffect(() => {
    let intervalId = setInterval(() => {
      console.log(position, speed)
      if (position > 0 || speed !== 0) {
        setPosition(Math.max(position - speed, 0));
        if (position > maxHeight) {
          setMaxHeight(position)
        }
        setSpeed(speed + 1);
      }
      if (position <= 0 && speed > 0) {
        setSpeed(0);
      }
    }, 20)
    return(() => {
      clearInterval(intervalId)
    })
  }, [position, speed, maxHeight]);

  function getEmoij() {
    if (maxHeight > 10000) { return '😡'}
    else if (maxHeight > 1700) { return '🌞' }
    else if (maxHeight > 1600) { return '‍👼' }
    else if (maxHeight > 1500) { return '🧑‍🚀' }
    else if (maxHeight > 1400) { return '🫅' }
    else if (maxHeight > 1350) { return '😻' }
    else if (maxHeight > 1300) { return '🤯' }
    else if (maxHeight > 1250) { return '🤩' }
    else if (maxHeight > 1200) { return '🥳' }
    else if (maxHeight > 1150) { return '🤗' }
    else if (maxHeight > 1100) { return '🤭' }
    else if (maxHeight > 1000) { return '😳' }
    else if (maxHeight > 900) { return '😲' }
    else if (maxHeight > 800) { return '🧐' }
    else if (maxHeight > 700) { return '🤓' }
    else if (maxHeight > 500) { return '😒' }
    else if (maxHeight > 300) { return '😵‍' }
    else if (maxHeight > 200) { return '🙄' }
    else if (maxHeight > 0) { return '🥱' }
    return '🌚';
  }

  return (
    <ScrollView>
      <PageContainer>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <PageHeader>
            <MovaHeadingText>
              <IconBack /> {getEmoij()}
            </MovaHeadingText>
          </PageHeader>
        </TouchableOpacity>
        <PageContent>
          <TouchableOpacity onPress={() => tapDude()} activeOpacity={1}>
            <AnimatedDudeContainer>
              <AnimatedDude style={{ top: 300 - position}}>
                <MovaLoading/>
              </AnimatedDude>
              { maxHeight > 0 ?
                <Scores>
                    <MovaText>{Math.round(position * 2) / 100}m</MovaText>
                    <MovaText>Max: {Math.round(maxHeight * 2) / 100}m</MovaText>
                </Scores>
                : null
              }
            </AnimatedDudeContainer>
          </TouchableOpacity>
          <SettingsSection>
            <MovaText style={{fontSize: 24, marginBottom: 5}}>mova App</MovaText>
            <TouchableOpacity onLongPress={() => setShowDev(!showDev)} activeOpacity={1}>
              <MovaText>Version {pkg.version}</MovaText>
            </TouchableOpacity>
          </SettingsSection>
          { showDev ?
              <View>
                <SettingsSection>
                  <View>
                    <Button onPress={clearAsyncStorage} title="Clear Cache" />
                  </View>
                </SettingsSection>
                <SettingsSection>
                  <MovaText style={{fontSize: 24, marginBottom: 10}}>
                    Development Settings 👷
                  </MovaText>
                  <MovaText style={{marginBottom: 10}}>Backend URL:</MovaText>
                  <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10}}
                    onChangeText={(text) => updateNewUrl(text)}
                    value={newUrl}
                  />
                  <Button onPress={applyUrl} title="Change Backend" />
                </SettingsSection>
              </View>
              : null
          }
        </PageContent>
      </PageContainer>
    </ScrollView>
  );
}

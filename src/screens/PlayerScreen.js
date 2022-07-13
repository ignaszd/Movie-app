import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text,View,ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';


const PlayerScreen = ({route, navigation}) => {
  const {movieKey} = route.params;
  return (
    <ScrollView style={styles.container}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={movieKey}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 150
  },
});

export default PlayerScreen;
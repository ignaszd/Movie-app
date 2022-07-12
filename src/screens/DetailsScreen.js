import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, Dimensions,ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { getMovieId, getPoster } from '../services/MovieServices';
const {height, width} = Dimensions.get('screen');
const setHeight = (h) => (height/100) * h;
const setWidth = (w) => (width/100) * w;
const DetailsScreen = ({route, nvaigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMovieId(movieId).then((response) => setMovie(response?.data));
  }, []);
  return (
    <ScrollView>
      <StatusBar style='auto'/>
      <View style={styles.moviePosterImageContainer}>
        <Image 
          style={styles.moviePosterImage} 
          resizeMode="cover"
          source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>
      <Text>
        {movie.title}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35)
  }
});

export default DetailsScreen;
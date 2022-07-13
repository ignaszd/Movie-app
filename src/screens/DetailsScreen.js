import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, Dimensions,ScrollView,TouchableOpacity, Linking } from 'react-native';
import Colors from '../constants/Colors';
import { getMovieId, getPoster,getVideo } from '../services/MovieServices';
import ItemSeperator from '../components/ItemSeperator';
import Fonts from '../constants/Fonts';
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE } from '../constants/Urls';

const {height, width} = Dimensions.get('screen');
const setHeight = (h) => (height/100) * h;
const setWidth = (w) => (width/100) * w;
const DetailsScreen = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMovieId(movieId, `${APPEND_TO_RESPONSE.VIDEOS}`).then((response) => setMovie(response?.data));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto'/>
      <View style={styles.moviePosterImageContainer}>
        <Image 
          style={styles.moviePosterImage} 
          resizeMode="cover"
          source={{uri: getPoster(movie.backdrop_path)}}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          activeOpacity={0.5} 
          onPress={() => navigation.goBack()}
        >
          <Feather 
            name="chevron-left" 
            size={35}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>
      <ItemSeperator height={setHeight(37)}/>
      <TouchableOpacity 
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
        <Ionicons 
          name="play-circle-outline" 
          size={70} 
          color={Colors.WHITE}
        />
      </TouchableOpacity>


      <View style>
        <View>
          <TouchableOpacity 
            activeOpacity={0.5}
          >
            <Text 
              onPress={() => navigation.navigate("player", 
              {movieKey: movie.videos.results[0].key})}
              style={styles.playerText} 
            >
              Play movie trailer
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={styles.playerText}>Add to library</Text>
        </TouchableOpacity>  

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
    alignItems: "center",
    position: "absolute",
    left: setWidth((100-145)/2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35)
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
  },
  headerText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70/2,
    elevation: 10,
  },
  playerText:{
    fontSize: 18,
    fontFamily: Fonts.REGULAR,
    color: Colors.ACTIVE,
    borderTopWidth: 1,
    borderColor: Colors.BLACK,
    width: 200
  }
});

export default DetailsScreen;
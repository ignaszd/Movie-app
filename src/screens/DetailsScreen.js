import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import Colors from "../constants/Colors";
import {
  getLanguage,
  getMovieId,
  getPoster,
  getVideo,
} from "../services/MovieServices";
import ItemSeperator from "../components/ItemSeperator";
import Fonts from "../constants/Fonts";
import { Feather, Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE } from "../constants/Urls";
import MovieCard from "../components/MovieCard";
const { height, width } = Dimensions.get("screen");
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;
const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    getMovieId(
      movieId,
      `${APPEND_TO_RESPONSE.VIDEOS},${APPEND_TO_RESPONSE.RECOMMENDATIONS},${APPEND_TO_RESPONSE.SIMILAR}`
    ).then((response) => setMovie(response?.data));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode="cover"
          source={{ uri: getPoster(movie.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={35} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Share</Text>
      </View>
      <ItemSeperator height={setHeight(37)} />
      <TouchableOpacity
        style={styles.playButton}
        onPress={() => Linking.openURL(getVideo(movie.videos.results[0].key))}
      >
        <Ionicons name="play-circle-outline" size={70} color={Colors.WHITE} />
      </TouchableOpacity>
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={3}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={22} color={Colors.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) => genre?.name)?.join(", ")}
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movie?.overview}</Text>
      </View>
      <View style={styles.playerContainer}>
        <View>
          <TouchableOpacity activeOpacity={0.5}>
            <Text
              onPress={() =>
                navigation.navigate("player", {
                  movieKey: movie.videos.results[0].key,
                })
              }
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
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeperator width={20} />}
        ItemSeparatorComponent={() => <ItemSeperator width={20} />}
        ListFooterComponent={() => <ItemSeperator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average.toFixed(1)}
            voteCount={item.vote_count}
            poster={item.poster_path}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        data={movie?.similar?.results}
        keyExtractor={(item) => item?.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={() => <ItemSeperator width={20} />}
        ItemSeparatorComponent={() => <ItemSeperator width={20} />}
        ListFooterComponent={() => <ItemSeperator width={20} />}
        renderItem={({ item }) => (
          <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average.toFixed(1)}
            voteCount={item.vote_count}
            poster={item.poster_path}
            onPress={() => navigation.navigate("movie", { movieId: item.id })}
          />
        )}
      />
    </ScrollView>
  );
};

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
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    width: setWidth(145),
    height: setHeight(35),
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
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    color: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
  },
  overviewContainer: {
    backgroundColor: Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overviewTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  overviewText: {
    color: Colors.BLACK,
    paddingVertical: 5,
    fontSize: 13,
    textAlign: "justify",
  },
  playerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  playerText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: Fonts.REGULAR,
    color: Colors.ACTIVE,
    borderTopWidth: 1,
    borderColor: Colors.EXTRA_LIGHT_GRAY,
    width: 200,
    marginVertical: 5,
    paddingVertical: 5,
  },
  extraListTitle: {
    marginLeft: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
  movieListContainer: {},
});

export default DetailsScreen;

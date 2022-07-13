import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSeperator from '../components/ItemSeperator';
import Fonts from '../constants/Fonts';
import MovieCard from '../components/MovieCard';
import { getTopRatedMovies, getAllGenres } from '../services/MovieServices';

const BrowseScreen = ({navigation}) => {
  const [activeGenre, setActiveGenre] = useState("All");
  const [topRatedMovies, setTopRatedMovies] = useState({});
  const [genres, setGenres] = useState([{id: 10110, name: "All"}]);
  useEffect(() => {
    getTopRatedMovies().then((movieResponse) =>
      setTopRatedMovies(movieResponse.data)
    );
    getAllGenres().then((genreResponse) =>
      setGenres([...genres, ...genreResponse.data.genres])
  );
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar 
        style="auto" 
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Rated Movies</Text>
        <Text style={styles.headerSubTitle}>View ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList 
          data={genres}
          horizontal
          showsHorizontalScrollIndicator= {false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />} 
          ListHeaderComponent= {() => <ItemSeperator width={20}/>}
          ListFooterComponent = {() => <ItemSeperator width={20}/>}
          renderItem={({item}) => (
            <GenreCard 
              genreName={item.name} 
              active={item.name === activeGenre ? true : false}
              onPress = {setActiveGenre}
            /> 
            )}
          
        />
      </View>
      <View>
        <FlatList 
          data={topRatedMovies.results}
          horizontal 
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()} 
          ItemSeparatorComponent = { () => <ItemSeperator width={20}/>}
          ListHeaderComponent= {() => <ItemSeperator width={20} />}
          ListFooterComponent = {() => <ItemSeperator width={20} />}
          renderItem={({item}) => 
            <MovieCard 
              title={item.title} 
              language={item.original_language} 
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              onPress={() => navigation.navigate("details", {movieId: item.id})}
            />
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle:{
    fontSize: 28,
    fontFamily: Fonts.REGULAR,
  },
  headerSubTitle: {
    fontSize: 12,
    fontFamily: Fonts.BOLD,
    color: Colors.ACTIVE,
  },
  genreListContainer: {
    paddingVertical: 10
  }
});

export default BrowseScreen;
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSeperator from '../components/ItemSeperator';
import Fonts from '../constants/Fonts';
import MovieCard from '../components/MovieCard';
const Genres = ["All", "Comedy", "Action", "Horror", "Historical", "Silent", "Documentary"]

const BrowseScreen = () => {
  const [activeGenre, setActiveGenre] = useState("All")
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
          data={Genres}
          horizontal
          showsHorizontalScrollIndicator= {false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />} 
          ListHeaderComponent= {() => <ItemSeperator width={20}/>}
          ListFooterComponent = {() => <ItemSeperator width={20}/>}
          renderItem={({item}) => (
            <GenreCard 
              genreName={item} 
              active={item === activeGenre ? true : false}
              onPress = {setActiveGenre}
            /> 
            )}
          
        />
      </View>
      <View>
        <FlatList 
          data={Genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          ItemSeparatorComponent={() => <ItemSeperator width={20} />} 
          ListHeaderComponent= {() => <ItemSeperator width={20}/>}
          ListFooterComponent = {() => <ItemSeperator width={20}/>}
          renderItem={({item}) => <MovieCard /> }
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
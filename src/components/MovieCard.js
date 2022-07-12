import React, {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity,Image, TouchableNativeFeedback, ImageBackground} from "react-native"
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Images from "../constants/Images";
import Ionicons from '@expo/vector-icons/Ionicons';
import { getPoster, getLanguage } from "../services/MovieServices";
const MovieCard = ({title, poster, language, voteAverage, voteCount}) => {
    const [liked, setLiked] = useState(false);

    return(
        <TouchableOpacity activeOpacity={0.5}>
            <ImageBackground 
                style={styles.container}
                imageStyle = {{borderRadius: 12}} 
                source={{uri: getPoster(poster)}}
            >
                <View style={styles.imdbContainer}>
                    <Image 
                        source={Images.IMDB} 
                        resizeMode="cover"
                        style={styles.imdbImage}
                    />
                    <Text style={styles.imdbRating}>{voteAverage}</Text>
                </View>
                <TouchableNativeFeedback onPress={() => setLiked(!liked)}>
                    <Ionicons 
                        name={liked ? "heart" : "heart-outline" }
                        size={25} 
                        color={liked ? Colors.HEART : Colors.WHITE}
                        style={{position: "absolute", bottom:10, left:10}}   
                    />
                </TouchableNativeFeedback>
            </ImageBackground>
            <View>
                <Text style={styles.movieTitle} numberOfLines={1}>{title}</Text>
                <View style={styles.subTitleContainer}>
                    <Text style={styles.subTitle}>{getLanguage(language).english_name}</Text>
                    <View style={styles.rowAndCenter}>
                        <Ionicons 
                            name="heart" 
                            size={17} 
                            color={Colors.HEART}
                            style={{marginRight: 5}}    
                        />
                        <Text style={styles.subTitle}>{voteCount}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.ACTIVE,
        height: 300,
        width: 200,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 5,
    },
    movieTitle:{
        fontFamily: Fonts.EXTRA_BOLD,
        paddingVertical: 2,
        marginTop: 5,
        width: 200,
    },
    subTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    subTitle: {
        fontFamily: Fonts.REGULAR,
        fontSize: 12,
    },
    rowAndCenter: {
        flexDirection: "row",
        alignItems: "center",
    },
    imdbContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: Colors.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3,
    },
    imdbImage: {
        height: 20,
        width: 50,
    },
    imdbRating: {
        marginRight: 5,
        color: Colors.HEART,
        fontSize: 14,
        fontFamily: Fonts.EXTRA_BOLD
    }
});

export default MovieCard;
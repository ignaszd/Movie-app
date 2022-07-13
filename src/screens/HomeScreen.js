import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Fonts from "../constants/Fonts";
import Colors from "../constants/Colors";

const HomeScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Ignas Zdanavičius</Text>
        <Text style={styles.subHeader}>INTERNSHIP ASSIGMENT</Text>
      </View>
      <View style={styles.playerContainer}>
        <TouchableOpacity activeOpacity={0.5}>
          <Text
            onPress={() => navigation.navigate("browse")}
            style={styles.clickableText}
          >
            Browse
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.clickableText}>Register</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>
        ReactSeals internship program assigment app
      </Text>
      <View style={styles.arrow_1_6}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  clickableText: {
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
  headerContainer: {
    position: "absolute",
    top: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 18,
  },
  subHeader: {
    fontSize: 10,
    fontFamily: Fonts.BOLD,
    color: Colors.LIGHT_GRAY,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    fontFamily: Fonts.BOLD,
    fontSize: 12,
  },
});

export default HomeScreen;

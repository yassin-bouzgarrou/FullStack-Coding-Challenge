import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-native-paper";
import { GetFavMovie } from "../APi/MovieApi";

export default function FavScreen() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await GetFavMovie();
      if (data && data.results) setFavorites(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Favorite movie</Text>
        {favorites.length === 0 ? (
          <Text style={styles.noLikesText}>
            You don't have any likes yet &#x1F60A;
          </Text>
        ) : (
          favorites.map((e, i) => (
            <View key={i} style={styles.cardContainer}>
              <Card style={[styles.card, { background: "transparent" }]}>
                <Card.Cover
                  style={styles.coverImage}
                  source={{ uri: 'https://image.tmdb.org/t/p/w500/' + e.poster_path }}
                />
                <View style={styles.cardContent}>
                  <Text style={styles.title}>{e.title}</Text>
                  <Text style={styles.description}>{e.description}</Text>
                </View>
              </Card>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  heading: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
    marginBottom: 70,
    fontWeight: "bold",
  },
  noLikesText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    marginTop: 300,
    fontWeight: "bold",
  },
  cardContainer: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "black",
    elevation: 2,


  },
  cardContent: {
    flex: 1,
    padding: 10,
    marginLeft: 60
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  description: {
    color: "white",
  },
  coverImage: {
    width: 250,
    height: 300,
    borderRadius: 10,
    marginLeft: 60
  },
});

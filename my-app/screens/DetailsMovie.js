import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeartIcon } from 'react-native-heroicons/solid';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import { useState } from 'react';

const ios = Platform.OS === 'ios';
const { width, height } = Dimensions.get('window');

export default function DetailsMovie() {
    const [isFavourite, toggleFavourite] = useState(false);
    const { params: item } = useRoute();
    console.log(item);

    const navigation = useNavigation();

    const handleLike = () => {
        const data = {
            media_type: 'movie',
            media_id: item.id,
            favorite: !isFavourite,
        };
        const url = 'https://api.themoviedb.org/3/account/20111946/favorite'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwN2MxYjg2Zjk2NzBiNjhmZjMzNTY5YzlmODYzYzZiMiIsInN1YiI6IjY0YTU5OTQzZGExMGYwMDBmZmZlYTAyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Xh6wfTJ2yxzvyoi8hmD4d1EQzYygjy4B1kkW5-mQN4E',
            },
            data: JSON.stringify(data),
        };

        axios(url, options)
            .then((response) => {
                console.log(response.data);
                toggleFavourite(!isFavourite);
            })
            .catch((error) => {
                console.error('error:', error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.wrapper}>
                <SafeAreaView style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLike}>
                        <HeartIcon size="35" color={isFavourite ? '#eab308' : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View>
                    <Image source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }} style={styles.image} />
                </View>
            </View>

            <View style={styles.detailsWrapper}>
                <Text style={styles.title}>{item?.title}</Text>

                {item?.id ? (
                    <Text style={styles.detailsText}>
                        {item?.original_language} • {item?.release_date?.split('-')[0] || 'N/A'} • 45 min . Rating: {item.vote_average}
                    </Text>
                ) : null}

                <View style={styles.genresWrapper}>
                    {item?.genres?.map((genre, index) => {
                        return (
                            <Text key={index} style={styles.genreText}>
                                {genre?.name}
                            </Text>
                        );
                    })}
                </View>

                <Text style={styles.overview}>{item?.overview}</Text>
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        flex: 1,
        backgroundColor: 'black',
    },
    wrapper: {
        width: '100%',
    },
    header: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,

    },
    backButton: {
        borderRadius: 30,
        padding: 10,

        backgroundColor: '#1F2937',
    },
    image: {
        width: '100%',
        height: height * 0.55,
    },
    detailsWrapper: {
        marginTop: -(height * 0.09),
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 10,
    },
    detailsText: {
        borderRadius: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
        backgroundColor: "grey",
        padding: 2,
        opacity: 0.8,

    },
    genresWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    genreText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5,
    },
    overview: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
    },
});

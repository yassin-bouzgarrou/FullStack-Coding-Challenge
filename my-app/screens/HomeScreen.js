import { View, Text, TouchableOpacity, ScrollView, Platform, TextInput } from 'react-native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import { GetTopMovie, FavMovie } from '../APi/MovieApi';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import ToMovie from "../components/ToMovie";


const ios = Platform.OS === 'ios';

export default function HomeScreen() {

    const navigation = useNavigation();
    const [TopMovie, setTopMovie] = useState([]);
    const [search, Setsearched] = useState()

    useEffect(() => {
        FetchTopMovie();


    }, []);

    const FetchTopMovie = async () => {
        const data = await GetTopMovie();

        if (data && data.results) setTopMovie(data.results);
    };
    console.log(search);

    const navigateToFavorites = () => {
        navigation.navigate('Fav');
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <SafeAreaView style={ios ? { marginBottom: -2 } : { marginBottom: 3 }}>
                <StatusBar />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16 }}>
                    <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>
                        <Text style={{ color: "red" }}>M</Text>ovieni

                    </Text>
                    <TouchableOpacity style={{ marginRight: 58 }} >

                        <TextInput
                            style={{
                                height: 32,
                                width: 230,
                                borderColor: 'grey',
                                borderWidth: 1,
                                borderRadius: 15,
                                color: 'white',
                                paddingLeft: 16,
                                fontSize: 16,

                            }}
                            placeholderTextColor="#888"
                            placeholder="Enter Movie..."
                            underlineColorAndroid="transparent"
                            value={search}
                            onChangeText={Setsearched}
                        />

                        <MagnifyingGlassIcon size={20} color="white" style={{ position: 'absolute', top: 8, left: 200 }} />
                    </TouchableOpacity>
                    <Text style={{ color: "white", marginLeft: -55, backgroundColor: "red", padding: 5, borderRadius: 50, fontSize: 14 }} onPress={navigateToFavorites}>LIKES</Text>
                </View>
            </SafeAreaView >

            <ScrollView>
                {TopMovie.length > 0 && <ToMovie data={TopMovie} search={search} />}
            </ScrollView>
        </View >
    );
}

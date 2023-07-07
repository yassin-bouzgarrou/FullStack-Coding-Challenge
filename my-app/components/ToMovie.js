import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ToMovie({ data, search }) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    };

    const renderMovieCard = ({ item, index }) => {
        if (index % 2 === 1) {
            return null;
        }

        const nextItem = data[index + 1];

        if (search && !item.title.toLowerCase().includes(search.toLowerCase())) {
            return null;
        }
        console.log(item);

        return (
            <View style={{ flexDirection: 'row', marginBottom: 0, marginLeft: -5 }}>
                <TouchableWithoutFeedback onPress={() => handleClick(item)}>
                    <View style={{ flex: 1, alignItems: 'center', marginRight: 5 }}>
                        <Image
                            source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}
                            style={{
                                width: width * 0.45,
                                height: height * 0.3,
                                borderRadius: 8,
                            }}
                        />
                        <Text style={{ color: 'white', textAlign: 'center', marginTop: 8, minWidth: 100, fontWeight: "bold", fontSize: 16, marginBottom: 50 }}>{item.title}</Text>
                    </View>
                </TouchableWithoutFeedback>

                {nextItem && (
                    <TouchableWithoutFeedback onPress={() => handleClick(nextItem)}>
                        <View style={{ flex: 1, alignItems: 'center', marginLeft: 5 }}>
                            <Image
                                source={{ uri: 'https://image.tmdb.org/t/p/w500/' + nextItem.poster_path }}
                                style={{
                                    width: width * 0.45,
                                    height: height * 0.3,
                                    borderRadius: 8,
                                }}
                            />
                            <Text style={{ color: 'white', textAlign: 'center', marginTop: 8, minWidth: 100, fontWeight: "bold", fontSize: 16 }}>{nextItem.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        );
    };

    return (
        <View style={{ marginBottom: 5 }}>
            <Text style={{ color: 'white', fontSize: 30, marginLeft: 10, marginBottom: 18 }}>Top Movie</Text>
            <FlatList
                data={data}
                renderItem={renderMovieCard}
                keyExtractor={(item) => item.id.toString()}
                horizontal={false}
            />


        </View>
    );
}

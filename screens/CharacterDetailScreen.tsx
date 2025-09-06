import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, Dimensions, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DetailRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

interface Character {
    id: number;
    name: string;
    img: string;
    age: string;
    race: string;
    gender: string;
    description: string;
    quote: string;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function CharacterDetailScreen() {
    const route = useRoute<DetailRouteProp>();
    const { id } = route.params;
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.demonslayer-api.com/api/v1/characters?id=${id}`)
            .then(res => res.json())
            .then(data => setCharacter(data.content[0]))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#d32f2f" style={{ flex: 1 }} />;
    }

    if (!character) {
        return <Text style={{ flex: 1, textAlign: 'center', marginTop: 40 }}>Personagem não encontrado.</Text>;
    }

    const background =
        character.race === 'Demon'
            ? require('../assets/background-demon.png')
            : require('../assets/background-human.png');

    return (
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
            <View style={styles.container}>
                <View style={styles.card}>
                    {/* Imagem sobreposta */}
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: character.img }} style={styles.img} />
                    </View>
                    <Text style={styles.name}>{character.name}</Text>
                    <View style={styles.chipRow}>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Idade: </Text>
                            <Text style={styles.chipValue}>{character.age}</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Raça: </Text>
                            <Text style={[styles.chipValue, { color: '#d32f2f' }]}>{character.race}</Text>
                        </View>
                        <View style={styles.chip}>
                            <Text style={styles.chipLabel}>Gênero: </Text>
                            <Text style={styles.chipValue}>{character.gender}</Text>
                        </View>
                    </View>
                    <Text style={styles.description}>{character.description}</Text>
                    {/* Quote */}
                    <View style={styles.quoteBox}>
                        <Text style={styles.quote}>{character.quote}</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const cardHorizontalMargin = 16;
const cardWidth = windowWidth - cardHorizontalMargin * 2;

const styles = StyleSheet.create({
    background: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    card: {
        width: cardWidth,
        backgroundColor: '#fff',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 32,
        paddingHorizontal: 16,
        minHeight: windowHeight * 0.72,
        marginBottom: Platform.OS === 'ios' ? 36 : 22,
        position: 'relative',
        flexShrink: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    imageWrapper: {
        position: 'absolute',
        top: -90,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 2,
    },
    img: {
        width: 200,
        height: 240,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 8,
        marginBottom: 14,
        textAlign: 'center',
        zIndex: 1,
    },
    chipRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
        width: '100%',
        flexWrap: 'nowrap',
        zIndex: 1,
    },
    chip: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginHorizontal: 2,
        marginVertical: 2,
    },
    chipLabel: { fontSize: 13, fontWeight: '500', color: '#444' },
    chipValue: { fontSize: 13, fontWeight: 'bold', color: '#222' },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 14,
        color: '#222',
        zIndex: 1,
    },
    quoteBox: {
        backgroundColor: '#111',
        padding: 12,
        borderRadius: 10,
        marginTop: 6,
        width: '100%',
        zIndex: 1,
    },
    quote: { color: '#fff', fontStyle: 'italic', textAlign: 'center', fontSize: 15 },
});

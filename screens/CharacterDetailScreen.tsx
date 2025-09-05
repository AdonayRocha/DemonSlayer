import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type DetailRouteProp = RouteProp<RootStackParamList, 'CharacterDetail'>;

interface Character {
    id: string;
    name: string;
    img: string;
    age: string;
    race: string;
    gender: string;
    description: string;
    quote: string;
}

export default function CharacterDetailScreen() {
    const route = useRoute<DetailRouteProp>();
    const { id } = route.params;
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.demonslayer-api.com/api/v1/characters?id=${id}`)
            .then(res => res.json())
            .then(data => setCharacter(data[0]))
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.card}>
                    <Image source={{ uri: character.img }} style={styles.img} />
                    <Text style={styles.name}>{character.name}</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>
                            Idade: <Text style={styles.infoValue}>{character.age}</Text>
                        </Text>
                        <Text style={styles.infoLabel}>
                            Raça: <Text style={[styles.infoValue, { color: '#d32f2f' }]}>{character.race}</Text>
                        </Text>
                        <Text style={styles.infoLabel}>
                            Gênero: <Text style={styles.infoValue}>{character.gender}</Text>
                        </Text>
                    </View>
                    <Text style={styles.description}>{character.description}</Text>
                    <View style={styles.quoteBox}>
                        <Text style={styles.quote}>{character.quote}</Text>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    card: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        opacity: 0.98,
        width: '90%',
    },
    img: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 12 },
    name: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    infoRow: { flexDirection: 'row', gap: 12, marginBottom: 10, justifyContent: 'center' },
    infoLabel: { fontWeight: 'bold', fontSize: 16, marginHorizontal: 4 },
    infoValue: { fontWeight: 'bold', fontSize: 16 },
    description: { fontSize: 16, textAlign: 'center', marginVertical: 12 },
    quoteBox: {
        backgroundColor: '#111',
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
        width: '100%',
    },
    quote: { color: '#fff', fontStyle: 'italic', textAlign: 'center', fontSize: 15 },
});
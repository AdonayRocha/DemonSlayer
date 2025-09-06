import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { COLORS } from '../colors';

interface Character {
    id: number;
    name: string;
    img: string;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'CharacterList'>;

export default function CharacterListScreen() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        fetch('https://www.demonslayer-api.com/api/v1/characters?limit=45')
            .then(res => res.json())
            .then((data) => {
                setCharacters(data.content);
            })
            .catch(() => setCharacters([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Escolha seu personagem abaixo</Text>
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 30 }} />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={item => String(item.id)}
                    style={{ width: '100%' }}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigation.navigate('CharacterDetail', { id: String(item.id) })}
                        >
                            <Image source={{ uri: item.img }} style={styles.img} />
                            <Text style={styles.name}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.primaryBranco, alignItems: 'center' },
    logo: { width: 200, height: 200, resizeMode: 'contain', marginTop: 18 },
    title: { fontSize: 18, marginBottom: 8 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.cardListBg,
        borderRadius: 12,
        marginVertical: 8,
        padding: 16,
        marginHorizontal: 18,
    },
    img: { width: 64, height: 64, marginRight: 20, resizeMode: 'contain' },
    name: { fontSize: 20, fontWeight: 'bold' },
});
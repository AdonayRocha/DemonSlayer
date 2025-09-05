import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';
import CharacterCard from '../components/CharacterCard';

interface Character {
    id: string;
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
            .then(data => setCharacters(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Escolha seu personagem abaixo</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#d32f2f" />
            ) : (
                <FlatList
                    data={characters}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CharacterCard
                            name={item.name}
                            img={item.img}
                            onPress={() => navigation.navigate('CharacterDetail', { id: item.id })}
                        />
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
    logo: { width: 200, height: 200, resizeMode: 'contain', marginTop: 18 },
    title: { fontSize: 18, marginBottom: 8 },
});
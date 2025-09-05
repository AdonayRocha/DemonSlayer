import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

interface CharacterCardProps {
    name: string;
    img: string;
    onPress: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, img, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={{ uri: img }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 12,
        marginVertical: 8,
        padding: 16,
        marginHorizontal: 18,
    },
    image: {
        width: 64,
        height: 64,
        marginRight: 20,
        resizeMode: 'contain',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default CharacterCard;
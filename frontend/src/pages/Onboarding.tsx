import {
    FlatList,
    View,
    Text,
    useWindowDimensions,
    StyleSheet,
} from 'react-native';
import React from 'react';

const screens = [
    { id: 1, name: 'One' },
    { id: 2, name: 'Two' },
    { id: 3, name: 'Three' },
];

const Item = ({ name }: any) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{ width }}>
            <Text>{name}</Text>
        </View>
    );
};

export const Onboarding = () => {
    const renderItem = ({ item }: any) => <Item name={item.name} />;

    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                data={screens}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                getItemLayout={(_data, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                pagingEnabled={true}
                scrollEnabled={false}
            />
            <View style={styles.bar}>
                <Text>Bar</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: '100%',
    },
    container: {
        flex: 0.95,
    },
    bar: {
        backgroundColor: 'white',
    },
});

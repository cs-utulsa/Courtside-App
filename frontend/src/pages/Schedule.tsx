// external imports
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

//custom components
import { Seperator, DaySchedule } from '@components/index';

export const Schedule = () => {
    const [days, setDays] = useState<number>(7);

    return (
        <View style={styles.container}>
            <FlatList
                data={Array.from(Array(days), (_e, idx) => idx)}
                renderItem={({ item, index }) => {
                    return <DaySchedule key={`date-${index}`} ahead={item} />;
                }}
                ItemSeparatorComponent={Seperator}
                onEndReached={() => setDays(days + 7)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
});

import { FC, useState } from 'react';
import AntIcon from '@expo/vector-icons/AntDesign';
import { Text, StyleSheet, FlatList, View, Pressable } from 'react-native';

import { STATS } from './../constants';
import { ToggleButton } from '../components/atoms';

type StatSectionProps = {
    title: string;
    data: string[];
};

const StatSection: FC<StatSectionProps> = ({ title, data }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <View style={sectionStyles.section}>
            <Pressable
                style={sectionStyles.sectionHeader}
                onPress={() => setOpen(!open)}
            >
                <Text style={sectionStyles.sectionHeading}>{title}</Text>
                <AntIcon
                    name="caretdown"
                    style={open && { transform: [{ rotate: '180deg' }] }}
                />
            </Pressable>

            {open && (
                <View style={sectionStyles.stats}>
                    {data.map((stat, index) => (
                        <ToggleButton
                            text={stat}
                            key={`${title}-stat-${index}`}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export const StatSelection = () => {
    return (
        <FlatList
            style={styles.container}
            data={STATS}
            renderItem={({ item, index }) => (
                <StatSection
                    title={item.title}
                    data={item.data}
                    key={`stat-section-${index}`}
                />
            )}
            ListHeaderComponent={() => (
                <View style={styles.headerContainer}>
                    <Text style={styles.heading}>Follow Stats</Text>
                </View>
            )}
        />
    );
};

export const sectionStyles = StyleSheet.create({
    section: {
        marginLeft: 10,
    },
    sectionHeading: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
        marginRight: 5,
    },
    stats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsOpen: {},
    statsClose: {
        height: 0,
        display: 'none',
    },
});

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

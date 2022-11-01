import { useNavigation } from '@react-navigation/native';
import React, { FC, useState } from 'react';
import AntIcon from '@expo/vector-icons/AntDesign';
import { Text, StyleSheet, FlatList, View, Pressable } from 'react-native';

import { OnboardingNavigationProp } from '../navigation/types';
import { STATS } from './../constants';
import { ToggleButton, LeftButton, RightButton } from '../components/atoms';

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
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={[styles.container]}>
            <FlatList
                style={styles.list}
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
                        <Text style={styles.header}>
                            Customize Your Stats Dashboard
                        </Text>
                    </View>
                )}
            />
            <View style={[styles.footer]}>
                <LeftButton
                    onPress={() => navigate('FavoritePlayers')}
                    text="Back"
                />
                <RightButton
                    onPress={() => navigate('Auth', { register: true })}
                    text="Finish"
                />
            </View>
        </View>
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
        marginTop: 60,
        flex: 1,
    },
    headerContainer: {
        alignItems: 'center',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 20,
    },
    list: {
        flex: 0.9,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -10,
        backgroundColor: 'white',
    },
});

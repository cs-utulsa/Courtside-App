import React, { FC, useState, useEffect } from 'react';
import AntIcon from '@expo/vector-icons/AntDesign';
import { Text, StyleSheet, FlatList, View, Pressable } from 'react-native';

import { STATS } from './../constants';
import { ToggleButton } from '../components/buttons';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { StatsNavigationProp } from './../types/Navigation';
import { ORANGE } from '../styles/colors';

type StatSectionProps = {
    title: string;
    data: { id: string; name: string }[];
    selectedStats: string[];
    addStat: (stat: string) => void;
    removeStat: (stat: string) => void;
};

const StatSection: FC<StatSectionProps> = ({
    title,
    data,
    selectedStats,
    addStat,
    removeStat,
}) => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (title === 'Currently Following') setOpen(true);
    }, [title]);

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
                            initial={selectedStats.includes(stat.id)}
                            text={stat.name}
                            key={`${title}-stat-${index}`}
                            onToggle={(on: boolean) => {
                                if (on) addStat(stat.id);
                                else removeStat(stat.id);
                            }}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

type StatSectionHeaderProps = {
    handlePress: () => void;
};

const StatSelectionHeader: FC<StatSectionHeaderProps> = ({ handlePress }) => {
    return (
        <View style={styles.headerContainer}>
            <Pressable style={styles.followBtn} onPress={handlePress}>
                <Text style={styles.followBtnText}>Update</Text>
            </Pressable>
        </View>
    );
};

export const StatSelection = () => {
    const { navigate } = useNavigation<StatsNavigationProp>();
    const { authData, updateStats } = useAuth();
    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData!.stats!
    );

    const onSubmit = async () => {
        await updateStats(selectedStats);
        navigate('Dashboard');
    };

    const addStat = (stat: string) => {
        setSelectedStats([...selectedStats, stat]);
    };

    const removeStat = (stat: string) => {
        setSelectedStats(
            selectedStats.filter((selectedItem) => selectedItem !== stat)
        );
    };

    return (
        <FlatList
            data={STATS}
            ListHeaderComponent={<StatSelectionHeader handlePress={onSubmit} />}
            renderItem={({ item, index }) => (
                <StatSection
                    title={item.title}
                    data={item.data}
                    selectedStats={selectedStats}
                    addStat={addStat}
                    removeStat={removeStat}
                    key={`stat-section-${index}`}
                />
            )}
        />
    );
};

const styles = StyleSheet.create({
    followBtn: {
        width: '90%',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
    },
    followBtnText: {
        textAlign: 'center',
        color: ORANGE,
        fontSize: 16,
    },
    headerContainer: {
        alignItems: 'center',
    },
});

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

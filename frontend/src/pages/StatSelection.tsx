import React, { FC, useState, useEffect } from 'react';
import AntIcon from '@expo/vector-icons/AntDesign';
import { Text, StyleSheet, FlatList, View, Pressable } from 'react-native';

import { STATS } from './../constants';
import { ToggleButton } from '../components/atoms';
import { useAuth } from '@hooks/useAuth';

type StatSectionProps = {
    title: string;
    data: { id: string; name: string }[];
};

const StatSection: FC<StatSectionProps> = ({ title, data }) => {
    const [open, setOpen] = useState<boolean>(false);
    const { authData } = useAuth();
    const [selectedStats, setSelectedStats] = useState<string[]>(
        authData!.stats!
    );

    useEffect(() => {
        if (title === 'Shooting') setOpen(true);
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
                                if (on)
                                    setSelectedStats([
                                        ...selectedStats,
                                        stat.id,
                                    ]);
                                else {
                                    setSelectedStats(
                                        selectedStats.filter(
                                            (selectedItem) =>
                                                selectedItem !== stat.id
                                        )
                                    );
                                }
                            }}
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
            data={STATS}
            renderItem={({ item, index }) => (
                <StatSection
                    title={item.title}
                    data={item.data}
                    key={`stat-section-${index}`}
                />
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

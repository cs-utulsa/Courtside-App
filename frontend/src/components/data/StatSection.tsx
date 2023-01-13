import { ToggleButton } from '@components/buttons';
import React, { FC, useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import AntIcon from '@expo/vector-icons/AntDesign';

type StatSectionProps = {
    title: string;
    data: { id: string; name: string }[];
    selectedStats: string[];
    addStat: (stat: string) => void;
    removeStat: (stat: string) => void;
};

export const StatSection: FC<StatSectionProps> = ({
    title,
    data,
    selectedStats,
    addStat,
    removeStat,
}) => {
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

const sectionStyles = StyleSheet.create({
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

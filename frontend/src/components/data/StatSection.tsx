import { ToggleButton } from '@components/buttons';
import React, { FC, useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import AntIcon from '@expo/vector-icons/AntDesign';

type StatSectionProps = {
    /** the title of the section */
    title: string;
    /** the stats that are within this section */
    data: { id: string; name: string }[];
    /** the stats that are currently selected, this is stored as state in the parent component */
    selectedStats: string[];
    /** method that adds a stat to the list of currently selected stats, defined in parent component  */
    addStat: (stat: string) => void;
    /** method that removes a stat from the list of currently selected stats, defined in parent component  */
    removeStat: (stat: string) => void;
};

/**
 * Component that shows a list of stats as a list of buttons that can be toggled.
 * This component is meant to be used as the renderItem in a SectionList
 *
 * @component
 * @example
 * const title = "Defense Stats"
 * const data = [{id: "1", name: "Stat 1"}, {"id": 2, name: "Stat 2"}]
 * const selectedStats = ["1", "3", "0"]
 * const addStat = (stat: string) => { selectedStats.push(stat) }
 * const removeStat = (stat: string) => { selectedStats.filter((s) => s !== stat)}
 * return (
 *      <StatSection
 *          title={title}
 *          data={data}
 *          selectedStats={selectedStats}
 *          addStat={addStat}
 *          removeStat={removeStat}
 *      />
 * );
 */
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

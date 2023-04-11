import React, { FC } from 'react';
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import { Card } from '../misc/Card';
import { useScorePrediction } from '@hooks/queries/useScorePrediction';
import { ErrorBox } from '../error/ErrorBox';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeText } from '@components/misc/ThemeText';
import hexToRgba from 'hex-to-rgba';
import { ScorePrediction } from './../../types/Game';
import { NBA_ICONS } from '@constants/icons';
import { CircleImage } from '@components/images/CircleImage';

type GameScorePredictionProps = {
    teams: [string, string];
};

export const GameScorePrediction: FC<GameScorePredictionProps> = ({
    teams,
}) => {
    const { data, isSuccess, isLoading, isError } = useScorePrediction(
        ...teams
    );
    const { colors } = useTheme();
    if (isError) {
        return <ErrorBox error="Cannot receive score prediction" />;
    }

    const getWinner = (teamData: ScorePrediction) => {
        const score1 = teamData[teams[0]].score;
        const score2 = teamData[teams[1]].score;

        return score2 > score1 ? teams[1] : teams[0];
    };

    return (
        <Card>
            <ThemeText primary style={styles.heading}>
                Score Prediction
            </ThemeText>
            {isSuccess && (
                <>
                    <BarChart
                        data={{
                            labels: Object.keys(data),
                            datasets: [
                                {
                                    data: Object.values(data).map((val) =>
                                        Number(val.score.toFixed(0))
                                    ),
                                },
                            ],
                        }}
                        showBarTops
                        showValuesOnTopOfBars
                        width={250}
                        height={200}
                        chartConfig={{
                            color: () => colors.primary,
                            backgroundGradientFrom: colors.card,
                            backgroundGradientTo: colors.card,
                            barPercentage: 1,
                        }}
                        yAxisSuffix=""
                        yAxisLabel=""
                        withVerticalLabels
                    />
                    <ThemeText>
                        {getWinner(data)} has a&nbsp;
                        {(data[getWinner(data)].win_pct * 100).toFixed(0)}%
                        chance to win!
                    </ThemeText>
                    <View style={styles.winPercentContainer}>
                        <ProgressChart
                            data={{
                                labels: [getWinner(data)],
                                data: [data[getWinner(data)].win_pct],
                            }}
                            width={250}
                            height={170}
                            radius={62}
                            chartConfig={{
                                color: (opacity = 1) =>
                                    hexToRgba(colors.primary, opacity),
                                backgroundGradientFrom: colors.card,
                                backgroundGradientTo: colors.card,
                                backgroundColor: 'blue',
                            }}
                            hideLegend
                        />
                        <View style={styles.imageContainer}>
                            <CircleImage
                                url={
                                    NBA_ICONS.find(
                                        (icon) => icon.code === getWinner(data)
                                    )?.logo ?? ''
                                }
                                size={120}
                            />
                        </View>
                    </View>
                </>
            )}
            {isError && <ErrorBox error="Cannot receive score prediction" />}
            {isLoading && <ActivityIndicator color={colors.primary} />}
        </Card>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    text: {
        textAlign: 'center',
    },
    winPercentContainer: {
        position: 'relative',
    },
    imageContainer: {
        position: 'absolute',
        top: 28,
        left: 65,
    },
});

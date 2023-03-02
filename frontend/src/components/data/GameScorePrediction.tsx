import React, { FC } from 'react';
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import { Card } from '../misc/Card';
import { useScorePrediction } from '@hooks/queries/useScorePrediction';
import { ErrorBox } from '../error/ErrorBox';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeText } from '@components/misc/ThemeText';

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
                    {/* <PieChart
                        widthAndHeight={200}
                        series={[70, 30]}
                        sliceColor={[colors.primary, colors.card]}
                        doughnut={true}
                    /> */}
                    <ProgressChart
                        data={{
                            labels: ['Team'],
                            data: [0.7],
                        }}
                        width={250}
                        height={120}
                        radius={40}
                        chartConfig={{
                            color: (opacity = 1) =>
                                `rgba(238, 103, 48, ${opacity})`,
                            backgroundGradientFrom: colors.card,
                            backgroundGradientTo: colors.card,
                            backgroundColor: 'blue',
                        }}
                        hideLegend={true}
                    />
                    <ThemeText>____ Has a 70% Chance of Winning</ThemeText>
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
});

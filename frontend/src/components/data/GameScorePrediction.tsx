import React, { FC } from 'react';
import { Card } from '../misc/Card';
import { useScorePrediction } from '@hooks/queries/useScorePrediction';
import { ErrorBox } from '../error/ErrorBox';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeText } from '@components/misc/ThemeText';
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
                    <CircleImage
                        url={
                            NBA_ICONS.find(
                                (icon) => icon.code === getWinner(data)
                            )?.logo ?? ''
                        }
                        size={120}
                        borderColor={colors.primary}
                    />
                    <View style={styles.scoreBox}>
                        <View style={styles.teamBox}>
                            <ThemeText style={styles.scoreText}>
                                {Math.floor(data[teams[0]].score)}
                            </ThemeText>
                            <ThemeText style={styles.teamText}>
                                {teams[0]}
                            </ThemeText>
                        </View>
                        <ThemeText style={styles.scoreText}>-</ThemeText>
                        <View style={styles.teamBox}>
                            <ThemeText style={styles.scoreText}>
                                {Math.floor(data[teams[1]].score)}
                            </ThemeText>
                            <ThemeText style={styles.teamText}>
                                {teams[1]}
                            </ThemeText>
                        </View>
                    </View>
                    <ThemeText
                        style={[styles.teamText, { marginHorizontal: 25 }]}
                    >
                        <ThemeText>{getWinner(data)} has a&nbsp;</ThemeText>
                        <ThemeText style={[styles.scoreText]} primary>
                            {(data[getWinner(data)].win_pct * 100).toFixed(0)}%
                        </ThemeText>
                        <ThemeText>&nbsp;chance to win!</ThemeText>
                    </ThemeText>
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
    scoreBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
    },
    scoreText: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    teamText: {
        fontSize: 20,
        textAlign: 'center',
    },
    teamBox: {
        alignItems: 'center',
    },
});

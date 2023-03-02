import React, { FC } from 'react';
import { ThemeText } from '../misc/ThemeText';
import { Card } from '../misc/Card';
import { useScorePrediction } from '@hooks/queries/useScorePrediction';

type GameScorePredictionProps = {
    teams: [string, string];
};

export const GameScorePrediction: FC<GameScorePredictionProps> = ({
    teams,
}) => {
    const { data } = useScorePrediction(...teams);

    return (
        <Card>
            <ThemeText>{teams[0]}</ThemeText>
            <ThemeText>{teams[1]}</ThemeText>
            <ThemeText>{data && JSON.stringify(data)}</ThemeText>
        </Card>
    );
};

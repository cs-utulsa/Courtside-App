import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { ScorePrediction } from './../../types/Game';
import axios from 'axios';

export const useScorePrediction = (teamOne: string, teamTwo: string) => {
    return useQuery<ScorePrediction>({
        queryKey: [`score-${teamOne}-${teamTwo}`],
        queryFn: async () => {
            return await axios
                .get<ScorePrediction>(
                    `${DEVELOPMENT_API}/score/${teamOne}/${teamTwo}`
                )
                .then((response) => response.data);
        },
    });
};

import { DEVELOPMENT_API } from '@constants/urls';
import { useQuery } from '@tanstack/react-query';
import { Game } from '../../types/Game';
import axios from 'axios';
import { getMonth, getDate } from 'date-fns';
import { useLeague } from '@hooks/useLeague';

export const useDaySchedule = (date: Date) => {
    const { league } = useLeague();

    return useQuery<Game[]>({
        queryKey: ['schedule', date, league],
        queryFn: async () => {
            return await axios
                .get(
                    `${DEVELOPMENT_API}/${league}/schedule/${
                        getMonth(date) + 1
                    }/${getDate(date)}`
                )
                .then((response) => response.data);
        },
    });
};

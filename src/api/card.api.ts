import { ICard, ICreateCardPayload, IUpdateCardPayload } from '@/stores/cards';

import { apiClient, ICardFromAPI } from './base';
import { useNormalizeData } from './base';

export const CardApi = {
    async createCard(rawPayload: ICreateCardPayload): Promise<ICard> {
        console.log(rawPayload);
        const curPayload = useNormalizeData().denormalizeCard('POST', rawPayload);
        const response = await apiClient.post<ICardFromAPI>('/api/card', curPayload);
        return useNormalizeData().normalizeCard(response);
    },

    async updateCard(cardId: string, rawPayload: IUpdateCardPayload): Promise<ICard> {
        const curPayload = useNormalizeData().denormalizeCard('PATCH', rawPayload);
        const response = await apiClient.patch<ICardFromAPI>(`/api/card/${cardId}`, curPayload);
        return useNormalizeData().normalizeCard(response);
    },

    async deleteCard(cardId: string) {
        await apiClient.delete(`/api/card/${cardId}`);
    },
};

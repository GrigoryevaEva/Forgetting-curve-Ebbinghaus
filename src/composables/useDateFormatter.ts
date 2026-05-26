export const useDateFormatter = () => {
    const getDateOnly = (ts: number) => {
        const date = new Date(ts);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getTimeWithDate = (ts: number) => {
        const date = new Date(ts);
        const time = date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
        const datePart = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        return `${time} (${datePart})`;
    };

    return {
        getDateOnly,
        getTimeWithDate,
    };
};

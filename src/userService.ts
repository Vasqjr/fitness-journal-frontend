import api from './helper';

export const getWorkout = async(id: number) => {
    try {
        const response = await api.get(`/api/workouts/${id}`);
        const data = response.data;
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}
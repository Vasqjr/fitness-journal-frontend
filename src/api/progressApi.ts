import api from './axios';
import type { ProgressPoint } from '../types';

export const getProgress = (exerciseId: string) =>
  api.get<ProgressPoint[]>(`/progress/${exerciseId}`);
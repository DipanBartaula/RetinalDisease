import axios from 'axios';
import { PredictionResponse } from '../types/prediction';

const API_URL = 'https://da2d-34-169-171-95.ngrok-free.app/predict/';

export const getPrediction = async (url: string): Promise<PredictionResponse> => {
  const response = await axios.post<PredictionResponse>(
    API_URL,
    { url },
    {
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
  return response.data;
};

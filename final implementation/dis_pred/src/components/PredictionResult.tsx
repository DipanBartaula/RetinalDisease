import styled from 'styled-components'
import { PredictionResponse } from '../types/prediction'

type Props = {
  result: PredictionResponse
  imageUrl: string
}

const Result = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #000;
  border-radius: 0.375rem;
  background-color: #f5f5f5;
  color: #000;
  text-align: left;
`

const PredictionResult = ({ result, imageUrl }: Props) => (
  <Result>
    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '1rem' }} />}
    <p><strong>Prediction:</strong> {result.prediction === 1 ? 'High Risk' : 'Low Risk'}</p>
    <p><strong>Probability:</strong> {result.probability.toFixed(4)}</p>
  </Result>
)

export default PredictionResult

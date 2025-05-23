import { useState, FormEvent } from 'react'
import styled from 'styled-components'
import ImageUploader from './components/ImageUploader'
import PredictionResult from './components/PredictionResult'
import { uploadToCloudinary } from './services/cloudinary'
import { getPrediction } from './services/api'
import { PredictionResponse } from './types/prediction'

const Container = styled.div`
  max-width: 40rem;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #000;
  font-family: 'Segoe UI', sans-serif;
`

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }
`

const Error = styled.p`
  color: red;
  margin-top: 1rem;
  font-size: 1rem;
`

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string>('')
  const [result, setResult] = useState<PredictionResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!imageFile) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const uploadedUrl = await uploadToCloudinary(imageFile)
      setImageUrl(uploadedUrl)
      const prediction = await getPrediction(uploadedUrl)
      setResult(prediction)
    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Heading>Disease Risk Predictor</Heading>
      <form onSubmit={handleSubmit}>
        <ImageUploader onFileSelect={setImageFile} />
        <Button type="submit" disabled={loading}>
          {loading ? 'Uploading & Predicting...' : 'Upload & Predict'}
        </Button>
      </form>

      {error && <Error>{error}</Error>}
      {result && imageUrl && <PredictionResult result={result} imageUrl={imageUrl} />}
    </Container>
  )
}

export default App

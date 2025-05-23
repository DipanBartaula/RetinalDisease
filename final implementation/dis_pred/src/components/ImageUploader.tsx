import { ChangeEvent } from 'react'
import styled from 'styled-components'

type Props = {
  onFileSelect: (file: File) => void
}

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #000;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  background-color: #fff;
  color: #000;
`

const ImageUploader = ({ onFileSelect }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return <Input type="file" accept="image/*" onChange={handleChange} />
}

export default ImageUploader

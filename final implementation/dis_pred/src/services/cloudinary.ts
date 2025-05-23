export const CLOUD_NAME = 'de1yfnzdz'
export const UPLOAD_PRESET = 'ai_project'

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    })

    if (!response.ok) {
        console.error('Cloudinary upload error:', response.statusText)
        throw new Error('Cloudinary upload failed')
    }

    const data = await response.json()
    console.log('Cloudinary response:', data.secure_url)
    return data.secure_url
}

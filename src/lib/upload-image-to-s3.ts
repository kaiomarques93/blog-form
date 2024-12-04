import slugify from 'slugify'

/**
 * Converts a Base64 string to a File object.
 * @param base64 - The Base64-encoded string.
 * @param fileName - The name of the file (including extension).
 * @returns A File object.
 */
export function base64ToFile(base64: string, fileName: string): File | null {
  if (!base64) {
    return null
  }

  // Split the base64 string to get the mime type and the data
  const [mimeInfo, base64Data] = base64.split(',')
  const mimeType = mimeInfo.match(/data:(.*?);base64/)?.[1]

  if (!mimeType || !base64Data) {
    return null
  }

  // Decode the Base64 string to a byte array
  const binaryString = atob(base64Data)
  const byteArray = new Uint8Array(binaryString.length)

  for (let i = 0; i < binaryString.length; i++) {
    byteArray[i] = binaryString.charCodeAt(i)
  }

  // Create a File object
  return new File([byteArray], fileName, { type: mimeType })
}

export async function uploadImageToS3(file: File): Promise<string> {
  const uniqueId = window.crypto.randomUUID()
  const fileName = slugify(file.name, {
    lower: true,
  })
  const applicationType = file.type

  const finalUrl =
    process.env.NEXT_PUBLIC_SIGNED_URL_FUNCTION +
    `?id=${uniqueId}&file_name=${fileName}&content_type=${applicationType}`

  try {
    if (!process.env.NEXT_PUBLIC_SIGNED_URL_FUNCTION) {
      throw new Error('Signed URL not defined')
    }

    // Get the signed URL for uploading
    const response = await fetch(finalUrl)

    const { uploadURL, finalUrl: s3Url } = await response.json()

    // Upload the file using the signed URL
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', applicationType)

    const uploadResponse = await fetch(uploadURL, {
      method: 'PUT',
      body: file,
      headers: myHeaders,
      redirect: 'follow',
    })

    if (uploadResponse.status === 200) {
      return s3Url
    } else {
      throw new Error(
        `Failed to upload ${fileName}, status: ${uploadResponse.status}`,
      )
    }
  } catch (error) {
    console.error('Error uploading file:', error)
    return ''
  }
}

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '')

export async function identifyAmulet(imageData: string): Promise<{
  temple: string
  type: string
  effect: string
  material: string
  nameEN: string
  nameTH: string
  master: string
  price: string
  remarks: string
  accuracy: number
  imageQuality: string
}> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `You are an expert in Thai Buddhist amulets and sacred objects. Analyze this image and identify the amulet.

IMPORTANT: You MUST respond with ONLY valid JSON, no other text before or after.

Provide the following information:
1. temple: which temple or monastery it comes from (or "Unknown")
2. type: the type/category of amulet (e.g., Buddha pendant, tiger amulet, sacred powder)
3. effect: the spiritual effect or blessing it's believed to provide
4. material: what material(s) it's made from
5. nameEN: name in English
6. nameTH: name in Thai script
7. master: the monk or master who blessed/created it (or "Unknown")
8. price: estimated market price in Thai Baht (or "N/A" if unknown)
9. remarks: any additional identifying features or notes
10. accuracy: your confidence level as a number from 0-100
11. imageQuality: assessment of image quality - must be one of: "excellent", "good", "fair", or "poor"

Return ONLY the JSON object. Example format:
{
  "temple": "Wat Saket",
  "type": "Buddha pendant",
  "effect": "protection and blessings",
  "material": "brass with enamel",
  "nameEN": "Somdej Phra Kring",
  "nameTH": "สมเด็จพระครึ่ง",
  "master": "Luang Pho Toh",
  "price": "5000-10000",
  "remarks": "Authentic Thai amulet from the 20th century",
  "accuracy": 85,
  "imageQuality": "good"
}`

  // Extract base64 data, handling both data:image/jpeg;base64, and direct base64
  let base64Data = imageData
  if (imageData.includes(',')) {
    base64Data = imageData.split(',')[1]
  }

  // Determine MIME type from the data URI if possible
  let mimeType = 'image/jpeg'
  if (imageData.includes('image/png')) {
    mimeType = 'image/png'
  } else if (imageData.includes('image/webp')) {
    mimeType = 'image/webp'
  } else if (imageData.includes('image/gif')) {
    mimeType = 'image/gif'
  }

  const image = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  }

  try {
    const result = await model.generateContent([prompt, image])
    const text = result.response.text().trim()
    
    // Extract JSON if response contains extra text
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    
    return JSON.parse(text)
  } catch (parseError) {
    console.error('Failed to parse Gemini response:', parseError)
    return {
      temple: 'Unknown',
      type: 'Unable to identify',
      effect: 'N/A',
      material: 'Unknown',
      nameEN: 'Unknown Amulet',
      nameTH: 'วัตถุมงคลที่ไม่รู้จัก',
      master: 'Unknown',
      price: 'N/A',
      remarks: 'Image quality or amulet type unclear. Try a clearer image of the amulet.',
      accuracy: 0,
      imageQuality: 'poor',
    }
  }
}

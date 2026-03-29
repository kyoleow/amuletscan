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

  const prompt = `You are a Thai amulet expert. Analyze this amulet image and provide:
1. Temple (which temple it's from)
2. Type (type of amulet)
3. Effect (spiritual effect or blessing)
4. Material (what it's made from)
5. Name in English
6. Name in Thai
7. Master (the monk or master who blessed it)
8. Price (estimated market price)
9. Remarks (additional notes)
10. Accuracy (confidence level 0-100%)
11. Image Quality (excellent/good/fair/poor)

Format as JSON with keys: temple, type, effect, material, nameEN, nameTH, master, price, remarks, accuracy, imageQuality`

  const image = {
    inlineData: {
      data: imageData.split(',')[1],
      mimeType: 'image/jpeg',
    },
  }

  const result = await model.generateContent([prompt, image])
  const text = result.response.text()
  
  try {
    return JSON.parse(text)
  } catch {
    return {
      temple: 'Unknown',
      type: 'Unable to identify',
      effect: 'N/A',
      material: 'Unknown',
      nameEN: 'Unknown Amulet',
      nameTH: 'วัตถุมงคลที่ไม่รู้จัก',
      master: 'Unknown',
      price: 'N/A',
      remarks: 'Image quality or amulet type unclear',
      accuracy: 0,
      imageQuality: 'poor',
    }
  }
}

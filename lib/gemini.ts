import { GoogleGenerativeAI } from '@google/generative-ai'
import { cache, rateLimiter } from './cache'

let genAI: GoogleGenerativeAI | null = null

function getGenAI(): GoogleGenerativeAI {
	if (!genAI) {
		const API_KEY = process.env.GOOGLE_API_KEY
		if (!API_KEY) {
			throw new Error('GOOGLE_API_KEY environment variable is required')
		}
		genAI = new GoogleGenerativeAI(API_KEY)
	}
	return genAI
}

export interface SuccessFact {
	event: string
	lesson: string
	keyTakeaway: string
}

export interface MotivationalQuote {
	quote: string
	author: string
}

export async function generateMotivationalQuote(): Promise<MotivationalQuote> {
	// Rate limiting
	const clientId = 'default' // En producción, usar IP o user ID
	if (!rateLimiter.isAllowed(clientId, 20, 60000)) { // 20 requests por minuto
		throw new Error('Rate limit exceeded. Please try again later.')
	}

	// Cache key para frases motivacionales (cambiar cada hora)
	const cacheKey = `motivational-quote-${new Date().getHours()}`
	const cachedQuote = cache.get<MotivationalQuote>(cacheKey)
	if (cachedQuote) {
		return cachedQuote
	}

	try {
		const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
		
		const prompt = `
		Genera una frase motivacional y optimista para emprendedores y empresarios, junto con el nombre de un autor famoso.
		
		Responde ÚNICAMENTE en formato JSON con esta estructura exacta:
		{
			"quote": "La frase motivacional aquí",
			"author": "Nombre del autor famoso"
		}
		
		Requisitos para la frase:
		- Debe ser inspiradora y positiva
		- Enfocada en emprendimiento, éxito empresarial o crecimiento personal
		- Máximo 80 palabras
		- Tono optimista y energético
		- En español
		- Sin emojis ni caracteres especiales
		
		Requisitos para el autor:
		- Debe ser una persona famosa real (empresario, emprendedor, filósofo, etc.)
		- Puede ser histórico o contemporáneo
		- Solo el nombre, sin títulos adicionales
		
		Ejemplos de estilo:
		{
			"quote": "El éxito no es un destino, es un viaje que comienza con el primer paso",
			"author": "Steve Jobs"
		}
		`

		const result = await model.generateContent(prompt)
		const response = await result.response
		const text = response.text()
		
		// Limpiar el texto de posibles markdown o caracteres extra
		const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
		
		const quoteData = JSON.parse(cleanText) as MotivationalQuote
		
		// Guardar en cache por 1 hora
		cache.set(cacheKey, quoteData, 60 * 60 * 1000)
		
		return quoteData
	} catch (error) {
		console.error('Error generando frase motivacional:', error)
		
		// Fallback en caso de error
		return {
			quote: "El éxito no es un destino, es un viaje que comienza con el primer paso hacia tus sueños empresariales.",
			author: "Steve Jobs"
		}
	}
}

export async function generateSuccessFact(date: string): Promise<SuccessFact> {
	try {
		const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
		
		const prompt = `
		Genera un hecho histórico empresarial para el ${date}. 
		
		Responde ÚNICAMENTE en formato JSON con esta estructura exacta:
		{
			"event": "Descripción del hecho histórico empresarial específico para esta fecha",
			"lesson": "La lección empresarial que se puede extraer de este hecho",
			"keyTakeaway": "Cómo aplicar esta lección a un negocio actual"
		}
		
		Requisitos:
		- El hecho debe ser real y verificable
		- Debe estar relacionado con emprendimiento, negocios o empresas
		- La lección debe ser práctica y accionable
		- El keyTakeaway debe ser específico y aplicable
		- Usa un tono profesional pero accesible
		- Máximo 200 palabras por campo
		
		Ejemplo de formato:
		{
			"event": "En 1994, Jeff Bezos fundó Amazon.com en su garaje en Seattle, comenzando como una librería online.",
			"lesson": "Bezos identificó que internet crecía un 2,300% anual y decidió actuar inmediatamente. No esperó el momento perfecto, sino que comenzó con un producto simple (libros) para validar su visión del comercio electrónico.",
			"keyTakeaway": "Empieza con un producto mínimo viable en un mercado en crecimiento. La perfección es enemiga del progreso."
		}
		`

		const result = await model.generateContent(prompt)
		const response = await result.response
		const text = response.text()
		
		// Limpiar el texto de posibles markdown o caracteres extra
		const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
		
		const fact = JSON.parse(cleanText) as SuccessFact
		
		return fact
	} catch (error) {
		console.error('Error generando hecho con Gemini:', error)
		
		// Fallback en caso de error
		return {
			event: "En esta fecha, miles de empresarios alrededor del mundo están tomando decisiones que cambiarán el futuro.",
			lesson: "Cada día es una oportunidad para aprender de los grandes éxitos del pasado y aplicar esas lecciones a tu propio emprendimiento. Los patrones del éxito se repiten: visión clara, ejecución rápida, enfoque en el cliente y perseverancia.",
			keyTakeaway: "El éxito empresarial no es suerte, es el resultado de decisiones estratégicas consistentes. Estudia el pasado, actúa en el presente, construye el futuro."
		}
	}
}

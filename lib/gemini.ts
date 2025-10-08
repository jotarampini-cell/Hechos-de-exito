import { GoogleGenerativeAI } from '@google/generative-ai'
import { cache, rateLimiter } from './cache'

let genAI: GoogleGenerativeAI | null = null

function getGenAI(): GoogleGenerativeAI {
	if (!genAI) {
		// Intentar obtener la API key de diferentes fuentes
		const API_KEY = process.env.GOOGLE_API_KEY || 
		               process.env.NEXT_PUBLIC_GOOGLE_API_KEY ||
		               'AIzaSyAbJ2-IRbdX7OarBEb-N2UOcR64PVLaHE0' // Fallback directo
		
		console.log('🔍 Debug - API_KEY disponible:', !!API_KEY)
		console.log('🔍 Debug - API_KEY length:', API_KEY ? API_KEY.length : 0)
		console.log('🔍 Debug - Entorno:', process.env.NODE_ENV)
		
		if (!API_KEY) {
			console.error('❌ GOOGLE_API_KEY no está disponible en el entorno')
			throw new Error('GOOGLE_API_KEY environment variable is required')
		}
		genAI = new GoogleGenerativeAI(API_KEY)
		console.log('✅ GoogleGenerativeAI inicializado correctamente')
	}
	return genAI
}

export interface SuccessFact {
	event: string
	lesson: string
	keyTakeaway: string
	categories: string[]
	industry?: string
	lessonType?: string
}

export interface MotivationalQuote {
	quote: string
	author: string
}

export async function generateMotivationalQuote(): Promise<MotivationalQuote> {
	console.log('🚀 Iniciando generateMotivationalQuote')
	
	// Rate limiting
	const clientId = 'default' // En producción, usar IP o user ID
	if (!rateLimiter.isAllowed(clientId, 20, 60000)) { // 20 requests por minuto
		throw new Error('Rate limit exceeded. Please try again later.')
	}

	// Cache deshabilitado para generar frases nuevas cada vez
	// const cacheKey = `motivational-quote-${new Date().getHours()}`
	// const cachedQuote = cache.get<MotivationalQuote>(cacheKey)
	// if (cachedQuote) {
	// 	console.log('📦 Usando frase desde cache')
	// 	return cachedQuote
	// }

	try {
		console.log('🤖 Obteniendo modelo de Gemini')
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
		
		// Cache deshabilitado para generar frases nuevas cada vez
		// cache.set(cacheKey, quoteData, 60 * 60 * 1000)
		
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

export async function generateSuccessFact(date: string, selectedCategories?: string[]): Promise<SuccessFact> {
	try {
		const model = getGenAI().getGenerativeModel({ model: 'gemini-2.0-flash-exp' })
		
		// Construir prompt con categorías específicas si están seleccionadas
		const categoryContext = selectedCategories && selectedCategories.length > 0 
			? `\nIMPORTANTE: El usuario está interesado específicamente en estas categorías: ${selectedCategories.join(', ')}. Prioriza generar un hecho que esté relacionado con al menos una de estas categorías.`
			: ''

		const prompt = `
		Genera un hecho histórico empresarial para el ${date}.${categoryContext}
		
		Responde ÚNICAMENTE en formato JSON con esta estructura exacta:
		{
			"event": "Descripción del hecho histórico empresarial específico para esta fecha",
			"lesson": "La lección empresarial que se puede extraer de este hecho",
			"keyTakeaway": "Cómo aplicar esta lección a un negocio actual",
			"categories": ["categoría1", "categoría2", "categoría3"],
			"industry": "Industria principal",
			"lessonType": "Tipo de lección principal"
		}
		
		Requisitos:
		- El hecho debe ser real y verificable
		- Debe estar relacionado con emprendimiento, negocios o empresas
		- La lección debe ser práctica y accionable
		- El keyTakeaway debe ser específico y aplicable
		- Usa un tono profesional pero accesible
		- Máximo 200 palabras por campo
		${selectedCategories && selectedCategories.length > 0 ? '- Prioriza que las categorías incluyan al menos una de las seleccionadas por el usuario' : ''}
		
		Categorías disponibles: tecnologia, retail, financiamiento, liderazgo, innovacion, marketing, operaciones, expansion, startup, estrategia
		Industrias: Software, Hardware, Internet, Comercio Electrónico, Finanzas, Manufactura, Retail, Entretenimiento, Medios, Telecomunicaciones, Automotriz, Salud, Educación, Bienes Raíces, Energía, Transporte, Alimentación, Moda, Deportes, Turismo
		Tipo de lección: Visión y Estrategia, Liderazgo, Innovación, Marketing, Operaciones, Finanzas, Recursos Humanos, Expansión, Competencia, Cliente, Producto, Cultura Empresarial, Partnerships, Adquisiciones, Crisis Management
		
		Ejemplo de formato:
		{
			"event": "En 1994, Jeff Bezos fundó Amazon.com en su garaje en Seattle, comenzando como una librería online.",
			"lesson": "Bezos identificó que internet crecía un 2,300% anual y decidió actuar inmediatamente. No esperó el momento perfecto, sino que comenzó con un producto simple (libros) para validar su visión del comercio electrónico.",
			"keyTakeaway": "Empieza con un producto mínimo viable en un mercado en crecimiento. La perfección es enemiga del progreso.",
			"categories": ["startup", "tecnologia", "estrategia"],
			"industry": "Comercio Electrónico",
			"lessonType": "Visión y Estrategia"
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
			keyTakeaway: "El éxito empresarial no es suerte, es el resultado de decisiones estratégicas consistentes. Estudia el pasado, actúa en el presente, construye el futuro.",
			categories: ["estrategia", "liderazgo"],
			industry: "General",
			lessonType: "Visión y Estrategia"
		}
	}
}

"use client"

import { useState, useEffect } from "react"

interface ModernLoadingProps {
	message?: string
	showProgress?: boolean
	className?: string
	categoryName?: string
	isCategoryLoading?: boolean
}

export function ModernLoading({ 
	message = "Casi listo", 
	showProgress = true,
	className = "",
	categoryName,
	isCategoryLoading = false
}: ModernLoadingProps) {
	const [progress, setProgress] = useState(0)
	const [currentEmoji, setCurrentEmoji] = useState("🚀")
	const [currentMessage, setCurrentMessage] = useState("Preparando tu experiencia...")
	const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
	const [currentQuote, setCurrentQuote] = useState("")

	// Emojis y mensajes específicos por categoría
	const categoryEmojis: Record<string, string[]> = {
		tecnologia: ["💻", "🚀", "⚡", "🔬", "🌐", "📱", "🤖", "💾"],
		retail: ["🛍️", "🏪", "💰", "📊", "🎯", "💳", "🛒", "📈"],
		financiamiento: ["💰", "📈", "💎", "🏦", "💼", "📊", "💵", "📉"],
		liderazgo: ["👑", "🎯", "⚡", "🌟", "💪", "🚀", "🏆", "🎖️"],
		innovacion: ["💡", "🔬", "⚡", "🌟", "🚀", "✨", "🧪", "🔮"],
		marketing: ["📢", "🎯", "📈", "💡", "🌟", "🚀", "📱", "🎨"],
		operaciones: ["⚙️", "🔧", "📊", "⚡", "🎯", "💪", "🏭", "📋"],
		expansion: ["🌍", "🚀", "📈", "💎", "🌟", "⚡", "🗺️", "🌎"],
		startup: ["🚀", "💡", "⚡", "🌟", "💪", "🎯", "🔥", "💎"],
		estrategia: ["🎯", "🧠", "📊", "⚡", "🌟", "💡", "♟️", "🎲"]
	}

	const categoryMessages: Record<string, string[]> = {
		tecnologia: [
			"Explorando el mundo digital...",
			"Descubriendo innovaciones tech...",
			"Analizando tendencias tecnológicas...",
			"Generando contenido de tecnología...",
			"Casi listo con tecnología...",
			"¡Preparando hechos tech increíbles!"
		],
		retail: [
			"Revisando estrategias de venta...",
			"Analizando el mercado retail...",
			"Descubriendo secretos del comercio...",
			"Generando contenido de retail...",
			"Casi listo con retail...",
			"¡Preparando hechos de ventas increíbles!"
		],
		financiamiento: [
			"Calculando inversiones...",
			"Analizando mercados financieros...",
			"Descubriendo oportunidades de inversión...",
			"Generando contenido financiero...",
			"Casi listo con finanzas...",
			"¡Preparando hechos financieros increíbles!"
		],
		liderazgo: [
			"Estudiando grandes líderes...",
			"Analizando técnicas de liderazgo...",
			"Descubriendo secretos del liderazgo...",
			"Generando contenido de liderazgo...",
			"Casi listo con liderazgo...",
			"¡Preparando hechos de liderazgo increíbles!"
		],
		innovacion: [
			"Explorando ideas disruptivas...",
			"Analizando innovaciones...",
			"Descubriendo el futuro...",
			"Generando contenido de innovación...",
			"Casi listo con innovación...",
			"¡Preparando hechos de innovación increíbles!"
		],
		marketing: [
			"Estudiando estrategias de marca...",
			"Analizando campañas exitosas...",
			"Descubriendo secretos del marketing...",
			"Generando contenido de marketing...",
			"Casi listo con marketing...",
			"¡Preparando hechos de marketing increíbles!"
		],
		operaciones: [
			"Optimizando procesos...",
			"Analizando eficiencia operacional...",
			"Descubriendo mejores prácticas...",
			"Generando contenido de operaciones...",
			"Casi listo con operaciones...",
			"¡Preparando hechos de operaciones increíbles!"
		],
		expansion: [
			"Explorando mercados globales...",
			"Analizando estrategias de crecimiento...",
			"Descubriendo oportunidades de expansión...",
			"Generando contenido de expansión...",
			"Casi listo con expansión...",
			"¡Preparando hechos de expansión increíbles!"
		],
		startup: [
			"Estudiando emprendimientos...",
			"Analizando startups exitosas...",
			"Descubriendo secretos del emprendimiento...",
			"Generando contenido de startups...",
			"Casi listo con startups...",
			"¡Preparando hechos de emprendimiento increíbles!"
		],
		estrategia: [
			"Desarrollando estrategias...",
			"Analizando planes de negocio...",
			"Descubriendo tácticas exitosas...",
			"Generando contenido estratégico...",
			"Casi listo con estrategia...",
			"¡Preparando hechos estratégicos increíbles!"
		]
	}

	// Emojis y mensajes por defecto
	const defaultEmojis = ["🚀", "💡", "⚡", "🎯", "✨", "🌟", "💫", "🔥", "🎉", "🎊"]
	const defaultMessages = [
		"Preparando tu experiencia...",
		"Buscando los mejores hechos...",
		"Generando contenido personalizado...",
		"Casi listo...",
		"¡Ya casi terminamos!",
		"Últimos detalles...",
		"¡Listo para inspirarte!"
	]

	// Frases motivacionales empresariales
	const motivationalQuotes = [
		"La paciencia es la clave del éxito empresarial 💼",
		"La innovación distingue entre un líder y un seguidor 🚀",
		"El éxito es la suma de pequeños esfuerzos repetidos día tras día 💪",
		"La excelencia no es un accidente, es el resultado de la intención 🎯",
		"Los grandes líderes inspiran grandeza en otros 👑",
		"La persistencia es el camino del éxito 🌟",
		"La oportunidad se disfraza de trabajo duro 💼",
		"El fracaso es simplemente la oportunidad de comenzar de nuevo ⚡",
		"La confianza en ti mismo es el primer secreto del éxito 💎",
		"Los emprendedores ven oportunidades donde otros ven problemas 🔍",
		"La disciplina es el puente entre las metas y los logros 🌉",
		"El éxito no es final, el fracaso no es fatal 🎭",
		"La pasión es energía. Siente el poder que viene de enfocarte 🌋",
		"Los ganadores nunca se rinden y los que se rinden nunca ganan 🏆",
		"La calidad nunca es un accidente, siempre es el resultado del esfuerzo ⭐",
		"El futuro pertenece a quienes creen en la belleza de sus sueños 🌈",
		"La única forma de hacer un gran trabajo es amar lo que haces ❤️",
		"La innovación es lo que distingue a un líder de un seguidor 🧠",
		"El éxito es caminar de fracaso en fracaso sin perder el entusiasmo 🚶‍♂️",
		"La actitud es una pequeña cosa que hace una gran diferencia 😊",
		"Los grandes logros requieren grandes sacrificios 🎪",
		"La determinación es el ingrediente secreto del éxito 🔑",
		"El coraje no es la ausencia de miedo, sino la acción a pesar del miedo 🦁",
		"La visión sin ejecución es solo una alucinación 👁️",
		"El éxito es 1% inspiración y 99% transpiración 💦",
		"La consistencia es la clave del éxito a largo plazo 🔄",
		"Los líderes no crean seguidores, crean más líderes 👥",
		"La adaptabilidad es la clave para sobrevivir y prosperar 🦎",
		"El fracaso es el condimento que da sabor al éxito 🌶️",
		"La humildad es la base de todo aprendizaje 📚",
		"Los emprendedores exitosos toman decisiones rápidas ⚡",
		"La integridad es hacer lo correcto cuando nadie está mirando 👁️‍🗨️",
		"El networking es trabajar tu red antes de necesitarla 🕸️",
		"La paciencia y la persistencia superan la inteligencia 🧘‍♂️",
		"Los grandes líderes son grandes oyentes 👂"
	]

	// Seleccionar emojis y mensajes según el contexto
	const emojis = isCategoryLoading && categoryName && categoryEmojis[categoryName] 
		? categoryEmojis[categoryName] 
		: defaultEmojis
	
	const messages = isCategoryLoading && categoryName && categoryMessages[categoryName] 
		? categoryMessages[categoryName] 
		: defaultMessages

	// Inicializar la frase inicial aleatoria
	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
		setCurrentQuoteIndex(randomIndex)
		setCurrentQuote(motivationalQuotes[randomIndex])
	}, [])

	useEffect(() => {
		// Simular progreso
		const progressInterval = setInterval(() => {
			setProgress(prev => {
				if (prev >= 100) return 100
				return prev + Math.random() * 15
			})
		}, 200)

		// Emoji fijo del cohete
		setCurrentEmoji("🚀")

		// Cambiar mensaje basado en progreso
		const messageInterval = setInterval(() => {
			const progressPercent = progress
			let messageIndex = 0
			
			if (progressPercent < 20) messageIndex = 0
			else if (progressPercent < 40) messageIndex = 1
			else if (progressPercent < 60) messageIndex = 2
			else if (progressPercent < 80) messageIndex = 3
			else if (progressPercent < 90) messageIndex = 4
			else if (progressPercent < 95) messageIndex = 5
			else messageIndex = 6

			setCurrentMessage(messages[messageIndex])
		}, 300)

		return () => {
			clearInterval(progressInterval)
			clearInterval(messageInterval)
		}
	}, [])

	return (
		<div className={`bg-card/95 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl border-0 ${className}`}>
			<div className="flex flex-col items-center justify-center space-y-8 py-12">
				{/* Emoji animado */}
				<div className="relative">
					<div className="text-6xl emoji-bounce">
						{currentEmoji}
					</div>
					{/* Efecto de resplandor */}
					<div className="absolute inset-0 text-6xl pulse-glow opacity-30 blur-sm">
						{currentEmoji}
					</div>
					{/* Partículas flotantes */}
					<div className="absolute -top-2 -left-2 w-1 h-1 bg-cyan-400 rounded-full float-particle"></div>
					<div className="absolute -top-1 -right-3 w-0.5 h-0.5 bg-blue-400 rounded-full float-particle"></div>
					<div className="absolute -bottom-1 -left-4 w-0.5 h-0.5 bg-purple-400 rounded-full float-particle"></div>
					<div className="absolute -bottom-2 -right-2 w-1 h-1 bg-cyan-300 rounded-full float-particle"></div>
				</div>

				{/* Frase motivacional principal */}
				<div className="text-center max-w-3xl">
					<div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/20">
						<p className="text-2xl font-bold text-foreground italic text-shimmer">
							"{currentQuote}"
						</p>
					</div>
				</div>

				{/* Barra de progreso moderna */}
				{showProgress && (
					<div className="w-full max-w-md space-y-3">
						<div className="flex justify-between text-sm text-muted-foreground">
							<span>Progreso</span>
							<span>{Math.round(progress)}%</span>
						</div>
						
						{/* Barra de progreso con gradiente */}
						<div className="relative h-3 bg-secondary rounded-full overflow-hidden progress-glow">
							<div 
								className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
								style={{ width: `${Math.min(progress, 100)}%` }}
							>
								{/* Efecto de brillo deslizante */}
								<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
							</div>
						</div>

						{/* Puntos animados */}
						<div className="flex items-center justify-center space-x-2">
							<div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
							<div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
							<div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
						</div>
					</div>
				)}

			</div>
		</div>
	)
}

// Componente específico para carga de categorías
interface CategoryLoadingProps {
	categoryName?: string
	className?: string
}

export function CategoryLoading({ categoryName, className = "" }: CategoryLoadingProps) {
	const [currentEmoji, setCurrentEmoji] = useState("🎯")
	const [currentMessage, setCurrentMessage] = useState("Buscando hechos increíbles...")

	const categoryEmojis: Record<string, string[]> = {
		tecnologia: ["💻", "🚀", "⚡", "🔬", "🌐", "📱"],
		retail: ["🛍️", "🏪", "💰", "📊", "🎯", "💳"],
		financiamiento: ["💰", "📈", "💎", "🏦", "💼", "📊"],
		liderazgo: ["👑", "🎯", "⚡", "🌟", "💪", "🚀"],
		innovacion: ["💡", "🔬", "⚡", "🌟", "🚀", "✨"],
		marketing: ["📢", "🎯", "📈", "💡", "🌟", "🚀"],
		operaciones: ["⚙️", "🔧", "📊", "⚡", "🎯", "💪"],
		expansion: ["🌍", "🚀", "📈", "💎", "🌟", "⚡"],
		startup: ["🚀", "💡", "⚡", "🌟", "💪", "🎯"],
		estrategia: ["🎯", "🧠", "📊", "⚡", "🌟", "💡"]
	}

	const categoryMessages: Record<string, string[]> = {
		tecnologia: [
			"Explorando el mundo digital...",
			"Descubriendo innovaciones...",
			"Analizando tendencias tech...",
			"Casi listo con tecnología..."
		],
		retail: [
			"Revisando estrategias de venta...",
			"Analizando el mercado...",
			"Descubriendo secretos del retail...",
			"Casi listo con retail..."
		],
		financiamiento: [
			"Calculando inversiones...",
			"Analizando mercados financieros...",
			"Descubriendo oportunidades...",
			"Casi listo con finanzas..."
		],
		liderazgo: [
			"Estudiando grandes líderes...",
			"Analizando técnicas de liderazgo...",
			"Descubriendo secretos del éxito...",
			"Casi listo con liderazgo..."
		],
		innovacion: [
			"Explorando ideas disruptivas...",
			"Analizando innovaciones...",
			"Descubriendo el futuro...",
			"Casi listo con innovación..."
		],
		marketing: [
			"Estudiando estrategias de marca...",
			"Analizando campañas exitosas...",
			"Descubriendo secretos del marketing...",
			"Casi listo con marketing..."
		],
		operaciones: [
			"Optimizando procesos...",
			"Analizando eficiencia...",
			"Descubriendo mejores prácticas...",
			"Casi listo con operaciones..."
		],
		expansion: [
			"Explorando mercados globales...",
			"Analizando estrategias de crecimiento...",
			"Descubriendo oportunidades...",
			"Casi listo con expansión..."
		],
		startup: [
			"Estudiando emprendimientos...",
			"Analizando startups exitosas...",
			"Descubriendo secretos del emprendimiento...",
			"Casi listo con startups..."
		],
		estrategia: [
			"Desarrollando estrategias...",
			"Analizando planes de negocio...",
			"Descubriendo tácticas exitosas...",
			"Casi listo con estrategia..."
		]
	}

	useEffect(() => {
		if (!categoryName) return

		const emojis = categoryEmojis[categoryName] || ["🎯", "💡", "⚡", "🌟"]
		const messages = categoryMessages[categoryName] || ["Preparando contenido...", "Casi listo..."]

		// Cambiar emoji cada 600ms
		const emojiInterval = setInterval(() => {
			setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)])
		}, 600)

		// Cambiar mensaje cada 800ms
		const messageInterval = setInterval(() => {
			setCurrentMessage(messages[Math.floor(Math.random() * messages.length)])
		}, 800)

		return () => {
			clearInterval(emojiInterval)
			clearInterval(messageInterval)
		}
	}, [categoryName])

	return (
		<div className={`bg-card/95 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl border-0 ${className}`}>
			<div className="flex flex-col items-center justify-center space-y-6 py-12">
				{/* Emoji de categoría */}
				<div className="relative">
					<div className="text-5xl animate-bounce">
						{currentEmoji}
					</div>
					<div className="absolute inset-0 text-5xl animate-pulse opacity-20 blur-sm">
						{currentEmoji}
					</div>
				</div>

				{/* Mensaje dinámico */}
				<div className="text-center space-y-2">
					<h3 className="text-xl font-bold text-foreground">
						{currentMessage}
					</h3>
					<p className="text-muted-foreground">
						{categoryName ? `Personalizando para ${categoryName}` : "Casi listo"}
					</p>
				</div>

				{/* Spinner de categoría */}
				<div className="relative">
					<div className="animate-spin rounded-full h-8 w-8 border-4 border-primary/20"></div>
					<div className="animate-spin rounded-full h-8 w-8 border-4 border-transparent border-t-primary absolute top-0 left-0"></div>
				</div>

				{/* Puntos animados */}
				<div className="flex items-center justify-center space-x-1">
					<div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
					<div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
					<div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
				</div>
			</div>
		</div>
	)
}

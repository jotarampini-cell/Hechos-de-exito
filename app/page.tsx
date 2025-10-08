import { SuccessFactCard } from "@/components/success-fact-card"
import { Sparkles, TrendingUp, Lightbulb } from "lucide-react"
import { generateSuccessFact, SuccessFact } from "@/lib/gemini"

const successFacts: Record<string, SuccessFact> = {
  "1-1": {
    event: "En 1994, Jeff Bezos fundó Amazon.com en su garaje en Seattle, comenzando como una librería online.",
    lesson:
      "Bezos identificó que internet crecía un 2,300% anual y decidió actuar inmediatamente. No esperó el momento perfecto, sino que comenzó con un producto simple (libros) para validar su visión del comercio electrónico.",
    keyTakeaway:
      "Empieza con un producto mínimo viable en un mercado en crecimiento. La perfección es enemiga del progreso.",
  },
  "1-9": {
    event:
      "En 2007, Steve Jobs presentó el primer iPhone en la Macworld Conference, revolucionando la telefonía móvil.",
    lesson:
      "Apple no inventó el teléfono móvil, pero reimaginó completamente la experiencia del usuario. Jobs combinó tres productos en uno: teléfono, iPod y navegador web, creando una categoría completamente nueva.",
    keyTakeaway:
      "La innovación no siempre es inventar algo nuevo, sino mejorar radicalmente lo que ya existe enfocándose en la experiencia del usuario.",
  },
  "2-4": {
    event:
      "En 2004, Mark Zuckerberg lanzó Facebook desde su dormitorio en Harvard, inicialmente solo para estudiantes universitarios.",
    lesson:
      "Facebook comenzó con un nicho muy específico (estudiantes de Harvard) antes de expandirse. Esta estrategia permitió perfeccionar el producto y crear una base de usuarios leales antes de escalar.",
    keyTakeaway:
      "Domina un nicho pequeño antes de expandirte. Es mejor ser el número uno en un mercado pequeño que el número diez en uno grande.",
  },
  "3-13": {
    event:
      "En 1986, Microsoft salió a bolsa con una valoración inicial de $61 millones, convirtiéndose en una de las empresas más valiosas del mundo.",
    lesson:
      "Microsoft se enfocó en crear software para el mercado masivo de PC, no solo para empresas. Gates entendió que el verdadero valor estaba en el software, no en el hardware.",
    keyTakeaway:
      "Identifica dónde está el verdadero valor en tu industria. A veces, el dinero está en lo que otros consideran secundario.",
  },
  "4-1": {
    event:
      "En 1976, Steve Jobs, Steve Wozniak y Ronald Wayne fundaron Apple Computer en el garaje de Jobs en Los Altos, California.",
    lesson:
      "Apple no necesitó grandes recursos para empezar. Con habilidades complementarias (Wozniak en ingeniería, Jobs en visión y ventas), crearon el Apple I vendiendo 50 unidades a $666.66 cada una para financiar el siguiente modelo.",
    keyTakeaway:
      "No necesitas capital masivo para empezar. Necesitas un equipo complementario y la capacidad de reinvertir tus primeras ganancias.",
  },
  "4-4": {
    event:
      "En 1975, Bill Gates y Paul Allen fundaron Microsoft en Albuquerque, Nuevo México, después de ver el Altair 8800.",
    lesson:
      "Gates y Allen vieron una oportunidad cuando apareció el Altair 8800 sin software. Crearon un intérprete BASIC sin siquiera tener la computadora, demostrándolo exitosamente después. Actuaron rápido ante la oportunidad.",
    keyTakeaway:
      "Cuando veas una oportunidad clara en el mercado, actúa con velocidad. La ejecución rápida supera a la planificación perfecta.",
  },
  "5-1": {
    event:
      "En 1971, Starbucks abrió su primera tienda en Pike Place Market en Seattle, vendiendo granos de café de alta calidad.",
    lesson:
      "Starbucks no vendía café preparado inicialmente, solo granos. Howard Schultz transformó el concepto años después al crear el 'tercer lugar' entre casa y trabajo, vendiendo experiencia, no solo café.",
    keyTakeaway:
      "No vendas solo productos, vende experiencias y estilo de vida. La gente paga más por cómo los hace sentir tu marca.",
  },
  "6-16": {
    event: "En 1903, Henry Ford fundó Ford Motor Company con $28,000 de 12 inversionistas.",
    lesson:
      "Ford revolucionó la manufactura con la línea de ensamblaje, reduciendo el tiempo de producción de 12 horas a 93 minutos. Además, pagó a sus trabajadores $5 al día (el doble del promedio), creando clientes que podían comprar sus propios productos.",
    keyTakeaway:
      "La eficiencia operacional y tratar bien a tus empleados no son gastos, son inversiones que generan ventajas competitivas sostenibles.",
  },
  "7-5": {
    event:
      "En 1994, Jeff Bezos dejó su lucrativo trabajo en Wall Street para fundar Amazon, apostando por el futuro del comercio electrónico.",
    lesson:
      "Bezos usó el 'marco de minimización del arrepentimiento': imaginó tener 80 años y preguntándose si se arrepentiría de no intentarlo. La respuesta fue clara. Calculó que tenía 70% de probabilidad de fracasar, pero el 30% de éxito valía la pena.",
    keyTakeaway:
      "Las mejores decisiones empresariales a menudo requieren valentía para dejar la seguridad. Pregúntate: ¿de qué te arrepentirás más, intentarlo o no intentarlo?",
  },
  "8-15": {
    event: "En 1995, Pierre Omidyar fundó eBay (originalmente AuctionWeb) como un experimento personal.",
    lesson:
      "eBay comenzó cuando Omidyar quiso crear un mercado perfecto donde compradores y vendedores pudieran conectarse directamente. El primer artículo vendido fue un puntero láser roto por $14.83, demostrando que hay mercado para todo.",
    keyTakeaway:
      "Crea plataformas que conecten oferta y demanda. Los modelos de marketplace pueden escalar exponencialmente porque el valor crece con cada usuario.",
  },
  "9-4": {
    event: "En 1998, Larry Page y Sergey Brin fundaron Google en un garaje en Menlo Park, California.",
    lesson:
      "Google no fue el primer buscador, pero fue el mejor. Su algoritmo PageRank analizaba la calidad de los enlaces, no solo las palabras clave. Se enfocaron obsesivamente en dar los mejores resultados, incluso si eso significaba que los usuarios salieran rápido de Google.",
    keyTakeaway:
      "Enfócate en ser el mejor en una cosa específica, no el primero. La calidad superior siempre gana a largo plazo.",
  },
  "9-27": {
    event:
      "En 1998, Google Inc. fue oficialmente incorporada con una inversión inicial de $100,000 de Andy Bechtolsheim.",
    lesson:
      "Bechtolsheim escribió el cheque después de una demostración de 30 minutos, antes de que Google fuera siquiera una empresa legal. La claridad de la visión y la demostración del producto fueron suficientes para conseguir financiamiento.",
    keyTakeaway:
      "Un producto funcional que resuelve un problema real vale más que mil presentaciones. Demuestra, no solo cuentes.",
  },
  "10-7": {
    event:
      "En 2001, Apple lanzó el iPod con el eslogan '1,000 canciones en tu bolsillo', revolucionando la industria musical.",
    lesson:
      "Apple no inventó el reproductor MP3, pero creó la mejor experiencia completa: hardware elegante, software intuitivo (iTunes) y un ecosistema cerrado que funcionaba perfectamente junto. Controlaron toda la cadena de valor.",
    keyTakeaway:
      "Controla la experiencia completa del cliente. La integración vertical te permite ofrecer calidad superior y márgenes más altos.",
  },
  "11-19": {
    event: "En 1985, Microsoft lanzó Windows 1.0, iniciando la era de las interfaces gráficas para el público masivo.",
    lesson:
      "Windows no fue técnicamente superior a otros sistemas, pero Microsoft lo hizo accesible y compatible con miles de aplicaciones. Se enfocaron en crear un ecosistema donde desarrolladores quisieran construir.",
    keyTakeaway:
      "Crea plataformas donde otros puedan construir. El efecto de red de desarrolladores y aplicaciones crea barreras de entrada insuperables.",
  },
  "12-12": {
    event:
      "En 1980, Apple Computer salió a bolsa, generando más millonarios instantáneos que cualquier otra IPO desde Ford en 1956.",
    lesson:
      "Apple compartió el éxito con sus empleados mediante opciones sobre acciones. Esto no solo creó riqueza, sino lealtad y motivación extrema. Los empleados trabajaban como dueños porque lo eran.",
    keyTakeaway:
      "Comparte el éxito con tu equipo. Las opciones sobre acciones alinean incentivos y convierten empleados en socios comprometidos con el crecimiento.",
  },
}

async function getTodaysFact(): Promise<{ date: string; fact: SuccessFact }> {
  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const key = `${month}-${day}`

  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]

  const formattedDate = `${day} de ${monthNames[month - 1]}`

  // Verificar si ya tenemos el hecho en caché
  // Eliminar factCache y clearFactCache

  // Siempre intentar generar con Gemini primero
  try {
    const fact = await generateSuccessFact(formattedDate)
    // Eliminar factCache y clearFactCache
    return { date: formattedDate, fact }
  } catch (error) {
    console.error('Error generando hecho con Gemini:', error)
    
    // Fallback 1: Usar hecho predefinido si existe
    if (successFacts[key]) {
      console.log('Usando hecho predefinido como fallback')
      // Eliminar factCache y clearFactCache
      return { date: formattedDate, fact: successFacts[key] }
    }
    
    // Fallback 2: Mensaje genérico si no hay hecho predefinido
    console.log('Usando mensaje genérico como fallback final')
    const fallbackFact = {
      event: "En esta fecha, miles de empresarios alrededor del mundo están tomando decisiones que cambiarán el futuro.",
      lesson:
        "Cada día es una oportunidad para aprender de los grandes éxitos del pasado y aplicar esas lecciones a tu propio emprendimiento. Los patrones del éxito se repiten: visión clara, ejecución rápida, enfoque en el cliente y perseverancia.",
      keyTakeaway:
        "El éxito empresarial no es suerte, es el resultado de decisiones estratégicas consistentes. Estudia el pasado, actúa en el presente, construye el futuro.",
    }
    
    // Eliminar factCache y clearFactCache
    return { date: formattedDate, fact: fallbackFact }
  }
}

export default async function Home() {
  const { date, fact } = await getTodaysFact()

  return (
    <main className="min-h-screen bg-background gradient-bg">
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Para Empresarios Curiosos</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">
              Hechos de Éxito
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">
              Descubre las lecciones empresariales más valiosas de la historia. Cada día, un nuevo aprendizaje que
              transformó industrias y creó imperios.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Estrategias probadas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lightbulb className="h-4 w-4 text-accent" />
                <span>Lecciones accionables</span>
              </div>
            </div>
          </div>

          {/* Success Fact Card */}
          <SuccessFactCard date={date} fact={fact} />

          {/* Info Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary/80 backdrop-blur-sm rounded-xl">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <p className="text-sm text-muted-foreground">
                Nueva lección empresarial cada día basada en hechos históricos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-20 relative z-10 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Desarrollado por <span className="font-semibold text-foreground">Rampini Enterprises</span>
          </p>
        </div>
      </footer>
    </main>
  )
}

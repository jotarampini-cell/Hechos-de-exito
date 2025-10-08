"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Lightbulb, TrendingUp, Instagram, Quote } from "lucide-react"
import { MotivationalQuoteDialog } from "@/components/motivational-quote-dialog"

interface SuccessFactCardProps {
  date: string
  fact: {
    event: string
    lesson: string
    keyTakeaway: string
  }
}

export function SuccessFactCard({ date, fact }: SuccessFactCardProps) {
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false)

  const handleShare = () => {
    const message = `Píldora del éxito de hoy`
    const websiteUrl = window.location.href
    const fullMessage = `${message} ${websiteUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullMessage)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleInstagram = () => {
    window.open("https://instagram.com/juantorresrampini", "_blank")
  }

  return (
    <Card className="w-full max-w-4xl mx-auto p-8 md:p-12 shadow-xl border-0 bg-card/95 backdrop-blur-sm">
      <div className="space-y-8">
        {/* Header con fecha */}
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{date}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">El Hecho</h3>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed text-balance pl-5">
            {fact.event}
          </p>
        </div>

        <div className="space-y-3 bg-secondary/50 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">La Lección</h3>
          </div>
          <p className="text-base md:text-lg text-foreground/90 leading-relaxed text-pretty">{fact.lesson}</p>
        </div>

        <div className="space-y-3 bg-primary/5 rounded-2xl p-6 border-l-4 border-primary">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wide">Aplícalo a tu negocio</h3>
          </div>
          <p className="text-base md:text-lg font-medium text-foreground leading-relaxed text-pretty">
            {fact.keyTakeaway}
          </p>
        </div>

        {/* Botón Frase de Hoy Premium */}
        <div className="pt-2">
          <div className="relative group premium-float">
            {/* Efecto de resplandor de fondo animado */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 premium-glow"></div>
            
            {/* Efecto de resplandor secundario */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 rounded-xl blur-sm opacity-20 group-hover:opacity-40 transition duration-300"></div>
            
            {/* Botón principal */}
            <Button
              onClick={() => setIsQuoteDialogOpen(true)}
              className="relative w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white rounded-xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 transform hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 overflow-hidden premium-button border border-white/20 hover:border-white/30"
            >
              {/* Efecto de brillo deslizante mejorado */}
              <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/30 to-transparent w-0 group-hover:w-full transition-all duration-700 ease-out transform -skew-x-12"></div>
              
              {/* Efecto de ondas */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Contenido del botón */}
              <div className="relative flex items-center justify-center z-10">
                <Quote className="mr-2 h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 group-hover:text-cyan-100" />
                <span className="transition-all duration-300 group-hover:tracking-wide group-hover:font-bold">Frase de Hoy</span>
              </div>
              
              {/* Partículas flotantes mejoradas */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-white/70 rounded-full premium-particle"></div>
              <div className="absolute top-2 right-2 w-0.5 h-0.5 bg-cyan-200/60 rounded-full premium-particle" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-blue-200/60 rounded-full premium-particle" style={{animationDelay: '0.7s'}}></div>
              <div className="absolute top-3 right-4 w-0.5 h-0.5 bg-purple-200/50 rounded-full premium-particle" style={{animationDelay: '1.1s'}}></div>
              
              {/* Efecto de borde brillante */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>

        {/* Botón de compartir */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleShare}
            className="flex-1 bg-success hover:bg-success/90 text-success-foreground rounded-xl px-6 py-4 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Compartir en WhatsApp
          </Button>
          <Button
            onClick={handleInstagram}
            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-xl px-6 py-4 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Instagram className="mr-2 h-5 w-5" />
            Síguenos en Instagram
          </Button>
        </div>
      </div>
      
      {/* Diálogo de Frase Motivacional */}
      <MotivationalQuoteDialog 
        open={isQuoteDialogOpen} 
        onOpenChange={setIsQuoteDialogOpen} 
      />
    </Card>
  )
}

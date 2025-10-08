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

        {/* Botón Frase de Hoy */}
        <div className="pt-2">
          <Button
            onClick={() => setIsQuoteDialogOpen(true)}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <Quote className="mr-2 h-5 w-5" />
            Frase de Hoy
          </Button>
        </div>

        {/* Botón de compartir */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleShare}
            className="flex-1 bg-success hover:bg-success/90 text-success-foreground rounded-xl px-8 py-6 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Compartir en WhatsApp
          </Button>
          <Button
            onClick={handleInstagram}
            className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white rounded-xl px-8 py-6 text-base font-medium shadow-md hover:shadow-lg transition-all duration-200"
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

"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Quote, Sparkles } from "lucide-react"
import { generateMotivationalQuote, MotivationalQuote } from "@/lib/gemini"

interface MotivationalQuoteDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function MotivationalQuoteDialog({ open, onOpenChange }: MotivationalQuoteDialogProps) {
	const [quoteData, setQuoteData] = useState<MotivationalQuote | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const handleGenerateQuote = useCallback(async () => {
		setIsLoading(true)
		try {
			const newQuoteData = await generateMotivationalQuote()
			setQuoteData(newQuoteData)
		} catch (error) {
			console.error('Error generando frase:', error)
			setQuoteData({
				quote: "El éxito no es un destino, es un viaje que comienza con el primer paso hacia tus sueños empresariales.",
				author: "Steve Jobs"
			})
		} finally {
			setIsLoading(false)
		}
	}, [])

	// Generar frase automáticamente cuando se abre el diálogo
	useEffect(() => {
		if (open && !quoteData) {
			handleGenerateQuote()
		}
	}, [open, quoteData, handleGenerateQuote])

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent 
				className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-background via-background to-primary/5 border-0 shadow-2xl font-sans"
				showCloseButton={true}
			>
				<DialogHeader className="text-center space-y-4 mb-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm">
						<Sparkles className="h-4 w-4 text-primary" />
						<span className="text-sm font-medium text-primary">Inspiración Diaria</span>
					</div>
					<DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
						Frase de Hoy
					</DialogTitle>
				</DialogHeader>

				<div className="space-y-6">
					{/* Contenido de la frase */}
					<div className="min-h-[250px] flex items-center justify-center">
						{isLoading ? (
							<div className="flex flex-col items-center gap-4 text-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
								<p className="text-muted-foreground">Generando tu frase motivacional...</p>
							</div>
						) : quoteData ? (
							<div className="text-center space-y-6 w-full">
								<div className="flex justify-center mb-6">
									<Quote className="h-10 w-10 text-primary/70" />
								</div>
								<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
									<blockquote className="text-lg md:text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed text-balance mb-6">
										&ldquo;{quoteData.quote}&rdquo;
									</blockquote>
									<div className="border-t border-gray-300/50 dark:border-gray-600/50 pt-4">
										<cite className="text-sm font-semibold text-primary not-italic">
											— {quoteData.author}
										</cite>
									</div>
								</div>
							</div>
						) : null}
					</div>

					{/* Botones de acción */}
					<div className="flex flex-col sm:flex-row gap-3 pt-4">
						<Button
							onClick={handleGenerateQuote}
							disabled={isLoading}
							className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-medium shadow-md hover:shadow-lg transition-all duration-200"
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Generando...
								</>
							) : (
								<>
									<Sparkles className="mr-2 h-4 w-4" />
									Nueva Frase
								</>
							)}
						</Button>
						<Button
							onClick={() => onOpenChange(false)}
							variant="outline"
							className="flex-1 rounded-xl px-6 py-3 font-medium border-2 hover:bg-secondary/50 transition-all duration-200"
						>
							Cerrar
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

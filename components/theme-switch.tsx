"use client"

import { useTheme } from "@/contexts/theme-context"
import { Moon, Sun } from "lucide-react"
import { useState, useEffect } from "react"

export function ThemeSwitch() {
	const { theme, toggleTheme } = useTheme()
	const [isAnimating, setIsAnimating] = useState(false)

	const handleToggle = () => {
		setIsAnimating(true)
		toggleTheme()
		
		// Reset animation after transition
		setTimeout(() => {
			setIsAnimating(false)
		}, 300)
	}

	return (
		<div className="fixed bottom-6 right-6 z-50">
			<button
				onClick={handleToggle}
				className={`
					relative w-14 h-14 rounded-full border-2 transition-all duration-300 ease-in-out
					${theme === "dark" 
						? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-lg shadow-slate-900/50" 
						: "bg-gradient-to-br from-amber-100 to-orange-200 border-amber-300 shadow-lg shadow-amber-200/50"
					}
					hover:scale-110 active:scale-95
					${isAnimating ? "animate-pulse" : ""}
					group
				`}
				aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
			>
				{/* Efecto de resplandor */}
				<div className={`
					absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
					${theme === "dark" 
						? "bg-gradient-to-br from-blue-400/20 to-purple-400/20" 
						: "bg-gradient-to-br from-yellow-400/20 to-orange-400/20"
					}
				`} />
				
				{/* Icono del sol/luna */}
				<div className="relative flex items-center justify-center w-full h-full">
					{theme === "light" ? (
						<Sun 
							className={`
								w-6 h-6 text-amber-600 transition-all duration-300
								${isAnimating ? "rotate-180 scale-110" : ""}
								group-hover:text-amber-500
							`} 
						/>
					) : (
						<Moon 
							className={`
								w-6 h-6 text-blue-300 transition-all duration-300
								${isAnimating ? "scale-110" : ""}
								group-hover:text-blue-200
							`} 
						/>
					)}
				</div>

				{/* Partículas flotantes */}
				<div className="absolute -top-1 -left-1 w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
				<div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.2s' }} />
				<div className="absolute -bottom-1 -left-1 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.4s' }} />
				<div className="absolute -bottom-1 -right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{ animationDelay: '0.6s' }} />

				{/* Efecto de brillo deslizante */}
				<div className={`
					absolute inset-0 rounded-full overflow-hidden
					${theme === "dark" ? "opacity-30" : "opacity-20"}
				`}>
					<div className={`
						absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
						transform -skew-x-12 -translate-x-full group-hover:translate-x-full
						transition-transform duration-1000 ease-out
					`} />
				</div>

				{/* Tooltip */}
				<div className={`
					absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-sm font-medium
					opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
					${theme === "dark" 
						? "bg-slate-800 text-slate-200 border border-slate-700" 
						: "bg-white text-slate-800 border border-slate-200 shadow-lg"
					}
				`}>
					{theme === "light" ? "Modo oscuro" : "Modo claro"}
					<div className={`
						absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4
						${theme === "dark" 
							? "border-l-transparent border-r-transparent border-t-slate-800" 
							: "border-l-transparent border-r-transparent border-t-white"
						}
					`} />
				</div>
			</button>
		</div>
	)
}

"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light")
	const [mounted, setMounted] = useState(false)

	// Efecto para cargar el tema guardado al montar el componente
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as Theme
		if (savedTheme) {
			setTheme(savedTheme)
		} else {
			// Detectar preferencia del sistema
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
			setTheme(prefersDark ? "dark" : "light")
		}
		setMounted(true)
	}, [])

	// Efecto para aplicar el tema al DOM
	useEffect(() => {
		if (!mounted) return

		const root = document.documentElement
		root.classList.remove("light", "dark")
		root.classList.add(theme)
		
		// Guardar en localStorage
		localStorage.setItem("theme", theme)
	}, [theme, mounted])

	const toggleTheme = () => {
		setTheme(prev => prev === "light" ? "dark" : "light")
	}

	// Evitar hidratación incorrecta
	if (!mounted) {
		return <>{children}</>
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}

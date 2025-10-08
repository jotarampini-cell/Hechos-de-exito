"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES } from "@/lib/categories"
import { Filter, X } from "lucide-react"

interface CategoryFilterProps {
	selectedCategories: string[]
	onCategoriesChange: (categories: string[]) => void
	className?: string
}

export function CategoryFilter({ 
	selectedCategories, 
	onCategoriesChange, 
	className = "" 
}: CategoryFilterProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const toggleCategory = (categoryId: string) => {
		if (selectedCategories.includes(categoryId)) {
			// Si ya está seleccionada, la deseleccionamos
			onCategoriesChange([])
		} else {
			// Solo permitir una categoría seleccionada a la vez
			onCategoriesChange([categoryId])
		}
	}

	const clearAll = () => {
		onCategoriesChange([])
	}

	return (
		<div className={`space-y-4 ${className}`}>
			{/* Header del filtro */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-primary" />
					<span className="text-sm font-medium text-foreground">
						Personalizar por categoría
					</span>
					{selectedCategories.length > 0 && (
						<Badge variant="secondary" className="bg-primary/10 text-primary">
							Activo
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-2">
					{selectedCategories.length > 0 && (
						<Button
							variant="ghost"
							size="sm"
							onClick={clearAll}
							className="text-muted-foreground hover:text-foreground"
						>
							<X className="h-3 w-3 mr-1" />
							Limpiar
						</Button>
					)}
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsExpanded(!isExpanded)}
						className="text-primary hover:text-primary/80"
					>
						{isExpanded ? 'Menos' : 'Ver todas'}
					</Button>
				</div>
			</div>

			{/* Categorías seleccionadas */}
			{selectedCategories.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{selectedCategories.map((categoryId) => {
						const category = CATEGORIES.find(c => c.id === categoryId)
						if (!category) return null
						
						return (
							<Badge
								key={categoryId}
								className={`${category.color} text-white cursor-pointer hover:opacity-80 transition-opacity duration-200`}
								onClick={() => toggleCategory(categoryId)}
							>
								<span className="mr-1">{category.icon}</span>
								{category.name}
								<X className="h-3 w-3 ml-1" />
							</Badge>
						)
					})}
				</div>
			)}

			{/* Lista de categorías */}
			{isExpanded && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 max-w-full overflow-hidden">
					{CATEGORIES.map((category) => {
						const isSelected = selectedCategories.includes(category.id)
						
						return (
							<Button
								key={category.id}
								variant={isSelected ? "default" : "outline"}
								size="sm"
								onClick={() => toggleCategory(category.id)}
								className={`justify-center h-12 w-full ${
									isSelected 
										? `${category.color} text-white hover:opacity-80` 
										: 'hover:bg-secondary/50'
								} transition-all duration-200`}
							>
								<div className="flex flex-col items-center space-y-1">
									<span className="text-lg">{category.icon}</span>
									<span className="font-medium text-xs leading-tight text-center">
										{category.name}
									</span>
								</div>
							</Button>
						)
					})}
				</div>
			)}

			{/* Categorías principales (siempre visibles) */}
			{!isExpanded && (
				<div className="flex flex-wrap gap-2">
					{CATEGORIES.slice(0, 6).map((category) => {
						const isSelected = selectedCategories.includes(category.id)
						
						return (
							<Button
								key={category.id}
								variant={isSelected ? "default" : "outline"}
								size="sm"
								onClick={() => toggleCategory(category.id)}
								className={`${
									isSelected 
										? `${category.color} text-white hover:opacity-80` 
										: 'hover:bg-secondary/50'
								} transition-all duration-200`}
							>
								<span className="mr-1">{category.icon}</span>
								{category.name}
							</Button>
						)
					})}
				</div>
			)}
		</div>
	)
}

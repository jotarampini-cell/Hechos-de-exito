"use client"

import { Badge } from "@/components/ui/badge"
import { getCategoryById } from "@/lib/categories"

interface CategoryBadgeProps {
	categoryId: string
	className?: string
}

export function CategoryBadge({ categoryId, className = "" }: CategoryBadgeProps) {
	const category = getCategoryById(categoryId)
	
	if (!category) return null

	return (
		<Badge 
			className={`${category.color} text-white hover:opacity-80 transition-opacity duration-200 ${className}`}
			variant="secondary"
		>
			<span className="mr-1">{category.icon}</span>
			{category.name}
		</Badge>
	)
}

interface CategoryBadgesProps {
	categories: string[]
	className?: string
	maxDisplay?: number
}

export function CategoryBadges({ categories, className = "", maxDisplay = 3 }: CategoryBadgesProps) {
	const displayCategories = categories.slice(0, maxDisplay)
	const remainingCount = categories.length - maxDisplay

	return (
		<div className={`flex flex-wrap gap-2 ${className}`}>
			{displayCategories.map((categoryId) => (
				<CategoryBadge key={categoryId} categoryId={categoryId} />
			))}
			{remainingCount > 0 && (
				<Badge 
					variant="outline" 
					className="text-muted-foreground border-muted-foreground/30"
				>
					+{remainingCount} más
				</Badge>
			)}
		</div>
	)
}

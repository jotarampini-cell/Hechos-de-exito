export interface Category {
	id: string
	name: string
	description: string
	color: string
	icon: string
}

export const CATEGORIES: Category[] = [
	{
		id: 'tecnologia',
		name: 'Tecnología',
		description: 'Innovaciones tecnológicas y empresas de software',
		color: 'bg-blue-500',
		icon: '💻'
	},
	{
		id: 'retail',
		name: 'Retail',
		description: 'Comercio minorista y ventas al consumidor',
		color: 'bg-green-500',
		icon: '🛍️'
	},
	{
		id: 'financiamiento',
		name: 'Financiamiento',
		description: 'Inversiones, IPO y estrategias financieras',
		color: 'bg-yellow-500',
		icon: '💰'
	},
	{
		id: 'liderazgo',
		name: 'Liderazgo',
		description: 'Gestión de equipos y liderazgo empresarial',
		color: 'bg-purple-500',
		icon: '👑'
	},
	{
		id: 'innovacion',
		name: 'Innovación',
		description: 'Productos disruptivos y nuevas ideas',
		color: 'bg-cyan-500',
		icon: '💡'
	},
	{
		id: 'marketing',
		name: 'Marketing',
		description: 'Estrategias de marca y publicidad',
		color: 'bg-pink-500',
		icon: '📢'
	},
	{
		id: 'operaciones',
		name: 'Operaciones',
		description: 'Eficiencia operacional y procesos',
		color: 'bg-orange-500',
		icon: '⚙️'
	},
	{
		id: 'expansion',
		name: 'Expansión',
		description: 'Crecimiento internacional y escalamiento',
		color: 'bg-red-500',
		icon: '🌍'
	},
	{
		id: 'startup',
		name: 'Startup',
		description: 'Fundación de empresas y emprendimiento',
		color: 'bg-indigo-500',
		icon: '🚀'
	},
	{
		id: 'estrategia',
		name: 'Estrategia',
		description: 'Planificación estratégica y toma de decisiones',
		color: 'bg-teal-500',
		icon: '🎯'
	}
]

export const INDUSTRIES = [
	'Software',
	'Hardware',
	'Internet',
	'Comercio Electrónico',
	'Finanzas',
	'Manufactura',
	'Retail',
	'Entretenimiento',
	'Medios',
	'Telecomunicaciones',
	'Automotriz',
	'Salud',
	'Educación',
	'Bienes Raíces',
	'Energía',
	'Transporte',
	'Alimentación',
	'Moda',
	'Deportes',
	'Turismo'
]

export const LESSON_TYPES = [
	'Visión y Estrategia',
	'Liderazgo',
	'Innovación',
	'Marketing',
	'Operaciones',
	'Finanzas',
	'Recursos Humanos',
	'Expansión',
	'Competencia',
	'Cliente',
	'Producto',
	'Cultura Empresarial',
	'Partnerships',
	'Adquisiciones',
	'Crisis Management'
]

export function getCategoryById(id: string): Category | undefined {
	return CATEGORIES.find(category => category.id === id)
}

export function getCategoriesByIds(ids: string[]): Category[] {
	return ids.map(id => getCategoryById(id)).filter(Boolean) as Category[]
}

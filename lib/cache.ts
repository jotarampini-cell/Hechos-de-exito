// Sistema de cache simple para optimizar llamadas a la API
interface CacheItem<T> {
	data: T
	timestamp: number
	ttl: number // Time to live en milisegundos
}

class SimpleCache {
	private cache = new Map<string, CacheItem<any>>()

	set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			ttl
		})
	}

	get<T>(key: string): T | null {
		const item = this.cache.get(key)
		if (!item) return null

		const now = Date.now()
		if (now - item.timestamp > item.ttl) {
			this.cache.delete(key)
			return null
		}

		return item.data
	}

	clear(): void {
		this.cache.clear()
	}

	// Limpiar elementos expirados
	cleanup(): void {
		const now = Date.now()
		for (const [key, item] of this.cache.entries()) {
			if (now - item.timestamp > item.ttl) {
				this.cache.delete(key)
			}
		}
	}
}

export const cache = new SimpleCache()

// Rate limiting simple
class RateLimiter {
	private requests = new Map<string, number[]>()

	isAllowed(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
		const now = Date.now()
		const requests = this.requests.get(key) || []
		
		// Limpiar requests antiguos
		const validRequests = requests.filter(time => now - time < windowMs)
		
		if (validRequests.length >= maxRequests) {
			return false
		}

		validRequests.push(now)
		this.requests.set(key, validRequests)
		return true
	}
}

export const rateLimiter = new RateLimiter()



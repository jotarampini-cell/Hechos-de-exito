// Sistema de logging simple para monitoreo y debugging
type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
	level: LogLevel
	message: string
	timestamp: string
	metadata?: Record<string, any>
}

class Logger {
	private logs: LogEntry[] = []
	private maxLogs = 1000 // Mantener solo los últimos 1000 logs

	log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
		const entry: LogEntry = {
			level,
			message,
			timestamp: new Date().toISOString(),
			metadata
		}

		this.logs.push(entry)
		
		// Mantener solo los logs más recientes
		if (this.logs.length > this.maxLogs) {
			this.logs = this.logs.slice(-this.maxLogs)
		}

		// Log en consola en desarrollo
		if (process.env.NODE_ENV === 'development') {
			console[level](`[${entry.timestamp}] ${message}`, metadata || '')
		}
	}

	info(message: string, metadata?: Record<string, any>): void {
		this.log('info', message, metadata)
	}

	warn(message: string, metadata?: Record<string, any>): void {
		this.log('warn', message, metadata)
	}

	error(message: string, metadata?: Record<string, any>): void {
		this.log('error', message, metadata)
	}

	debug(message: string, metadata?: Record<string, any>): void {
		this.log('debug', message, metadata)
	}

	getLogs(level?: LogLevel): LogEntry[] {
		if (level) {
			return this.logs.filter(log => log.level === level)
		}
		return [...this.logs]
	}

	clearLogs(): void {
		this.logs = []
	}
}

export const logger = new Logger()

// Función para tracking de errores de API
export function trackApiError(operation: string, error: any): void {
	logger.error(`API Error in ${operation}`, {
		operation,
		error: error.message || error,
		stack: error.stack
	})
}

// Función para tracking de uso de features
export function trackFeatureUsage(feature: string, metadata?: Record<string, any>): void {
	logger.info(`Feature used: ${feature}`, metadata)
}



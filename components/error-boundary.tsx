"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { logger } from '@/lib/logger'

interface ErrorBoundaryState {
	hasError: boolean
	error?: Error
}

interface ErrorBoundaryProps {
	children: React.ReactNode
	fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		logger.error('Error Boundary caught an error', {
			error: error.message,
			stack: error.stack,
			componentStack: errorInfo.componentStack
		})
	}

	resetError = () => {
		this.setState({ hasError: false, error: undefined })
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback
				return <FallbackComponent error={this.state.error} resetError={this.resetError} />
			}

			return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />
		}

		return this.props.children
	}
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
	return (
		<div className="min-h-[400px] flex items-center justify-center p-8">
			<div className="text-center space-y-6 max-w-md">
				<div className="flex justify-center">
					<AlertTriangle className="h-16 w-16 text-red-500" />
				</div>
				
				<div className="space-y-2">
					<h2 className="text-2xl font-bold text-foreground">
						¡Ups! Algo salió mal
					</h2>
					<p className="text-muted-foreground">
						Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
					</p>
				</div>

				{process.env.NODE_ENV === 'development' && error && (
					<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-left">
						<p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
							Error de desarrollo:
						</p>
						<code className="text-xs text-red-700 dark:text-red-300 break-all">
							{error.message}
						</code>
					</div>
				)}

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						onClick={resetError}
						className="bg-primary hover:bg-primary/90"
					>
						<RefreshCw className="mr-2 h-4 w-4" />
						Intentar de nuevo
					</Button>
					<Button
						onClick={() => window.location.reload()}
						variant="outline"
					>
						Recargar página
					</Button>
				</div>
			</div>
		</div>
	)
}



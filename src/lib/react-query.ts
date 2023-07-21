import { QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function newQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 30, // 30 minute
        cacheTime: 1000 * 60 * 60, // 1 hours
        refetchOnWindowFocus: process.env.NODE_ENV !== 'development',
      },
      mutations: {
        retry: false,
        onError(err) {
          if (err instanceof Error) toast.error(err.message)
          else
            toast.error(
              'An error occurred while processing your request! Please try again in few minutes.',
            )
        },
      },
    },
  })
}

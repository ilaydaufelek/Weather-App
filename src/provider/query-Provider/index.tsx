import { QueryClient,QueryClientProvider} from "@tanstack/react-query"

type Props = {
  children: React.ReactNode
}

const QueryProvider = (props: Props) => {
  const { children } = props
  const queryClient = new QueryClient()
  return (
     <QueryClientProvider client={queryClient} > 
      {children}
     </QueryClientProvider>
  )
}

export default QueryProvider

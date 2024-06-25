// TokenContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { getToken } from '../utils/user-token'

interface TokenContextProps {
  tokenState: string | null
  setTokenState: React.Dispatch<React.SetStateAction<string | null>>
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined)

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tokenState, setTokenState] = useState<string | null>(getToken())

  return (
    <TokenContext.Provider value={{ tokenState, setTokenState }}>
      {children}
    </TokenContext.Provider>
  )
}

export const useTokenContext = (): TokenContextProps => {
  const context = useContext(TokenContext)
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenProvider')
  }
  return context
}

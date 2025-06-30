'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface ChatPanelContextType {
  isChatOpen: boolean
  toggleChat: () => void
  openChat: () => void
  closeChat: () => void
  shouldShowChat: boolean
}

const ChatPanelContext = createContext<ChatPanelContextType | undefined>(undefined)

// Pages that should show the chat panel
const CHAT_ENABLED_PAGES = [
  '/dashboard/folder',
  '/dashboard/calendar',
  '/dashboard/territory'
]

export function ChatPanelProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isChatOpen, setIsChatOpen] = useState(false)

  // Check if current page should show chat panel
  const shouldShowChat = CHAT_ENABLED_PAGES.some(page => pathname.startsWith(page))

  // Load chat state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('chat-panel-open')
    if (savedState !== null) {
      setIsChatOpen(JSON.parse(savedState))
    }
  }, [])

  // Save chat state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('chat-panel-open', JSON.stringify(isChatOpen))
  }, [isChatOpen])

  // Close chat when navigating to a page that doesn't support it
  useEffect(() => {
    if (!shouldShowChat && isChatOpen) {
      setIsChatOpen(false)
    }
  }, [shouldShowChat, isChatOpen])

  const toggleChat = () => {
    if (shouldShowChat) {
      setIsChatOpen(prev => !prev)
    }
  }
  const openChat = () => {
    if (shouldShowChat) {
      setIsChatOpen(true)
    }
  }
  const closeChat = () => setIsChatOpen(false)

  return (
    <ChatPanelContext.Provider value={{
      isChatOpen,
      toggleChat,
      openChat,
      closeChat,
      shouldShowChat
    }}>
      {children}
    </ChatPanelContext.Provider>
  )
}

export function useChatPanel() {
  const context = useContext(ChatPanelContext)
  if (context === undefined) {
    throw new Error('useChatPanel must be used within a ChatPanelProvider')
  }
  return context
} 
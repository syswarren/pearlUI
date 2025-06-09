'use client'

import { useParams } from "next/navigation"

export default function FolderConversationPage() {
  const params = useParams<{ folderId: string; conversationId: string }>()
  return (
    <div>
      <h1>Folder Conversation Page</h1>
      <p>Folder ID: {params.folderId}</p>
      <p>Conversation ID: {params.conversationId}</p>
      <p>This is a conversation that belongs to a folder. You can customize this template as needed.</p>
    </div>
  )
} 
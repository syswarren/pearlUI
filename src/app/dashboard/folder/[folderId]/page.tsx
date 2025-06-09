'use client'
import { useParams } from "next/navigation"

export default function FolderPage() {
  const params = useParams<{ folderId: string }>()
  return <div>Folder Page for folder: {params.folderId}</div>
} 
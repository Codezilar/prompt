import { Suspense } from 'react'
import EditForm from './edit-form'

export default function EditPrompt() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditForm />
    </Suspense>
  )
}

export const dynamic = 'force-dynamic';
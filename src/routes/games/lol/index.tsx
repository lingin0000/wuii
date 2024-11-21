import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/games/lol/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /games/lol/!'
}

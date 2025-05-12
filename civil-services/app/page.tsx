import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
        <h1>Welcome to e-Learning Home Page</h1>
        <p>Explore our courses and textbooks.</p>
        <Link href='/courses'>Visit our courses</Link>
    </div>
  )
}

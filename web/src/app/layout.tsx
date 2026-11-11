import "@/app/globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Skynet — Build your website in plain language",
  description: "Describe your website idea and Skynet's AI agents build and deploy it.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
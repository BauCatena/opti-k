"use client"

import { Shield, Sparkles, UserCheck } from "lucide-react"

const benefits = [
  {
    title: "Asesoramiento exclusivo",
    description:
      "Atención personalizada con cita previa para encontrar tu lente específico.",
    icon: UserCheck,
  },
  {
    title: "Adaptación precisa",
    description:
      "Nuestros especialistas encuadran precisamente cristales en armazones para todas las edades.",
    icon: Sparkles,
  },
  {
    title: "Experiencia segura",
    description:
      "Renovar tus lentes debe ser cómodo, por eso en Opti-k ofrecemos una experiencia personalizada y profesional.",
    icon: Shield,
  },
] as const

export function Newsletter() {
  return (
    <section id="newsletter" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-accent mb-4">
            Tu experiencia en Opti-k
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            Mucho más que solo lentes
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Acompañamos cada paso del proceso para que elegir y renovar tus lentes sea simple,
            cómodo y totalmente adaptado a vos.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {benefits.map((item) => {
            const Icon = item.icon
            return (
            <div
              key={item.title}
              className="h-full rounded-lg border border-border bg-card p-6 flex flex-col gap-3 text-left"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-1">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

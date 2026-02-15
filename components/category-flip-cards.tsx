"use client"

import React from "react"

import { useState } from "react"
import { Glasses, Sun, User, Users } from "lucide-react"

import { OptikHoverButton } from "@/components/optik-hover-button"

type Category = "recetados" | "sol-urbano" | "sol-deportivo" | "nino"
type Gender = "hombre" | "mujer" | "nino" | "nina"

interface FlipCardProps {
  id: Category
  type: Category
  title: string
  subtitle: string
  icon: React.ReactNode
  isFlipped: boolean
  onToggle: (id: Category) => void
}

const isUnisexCategory = (t: Category) =>
  t === "sol-urbano" || t === "sol-deportivo"

function FlipCard({ id, type, title, subtitle, icon, isFlipped, onToggle }: FlipCardProps) {
  const handleNavigate = (gender?: Gender) => {
    const categoryMap: Record<Category, string> = {
      recetados: "Recetados",
      "sol-urbano": "Sol Urbano",
      "sol-deportivo": "Sol Deportivo",
      nino: "Nino",
    }
    const genderParamMap: Record<Gender, string> = {
      hombre: "Hombre",
      mujer: "Mujer",
      nino: "Nino",
      nina: "Nina",
    }
    const category = categoryMap[type]
    const baseUrl = `/catalogo?categoria=${category}`
    const url =
      gender !== undefined ? `${baseUrl}&genero=${genderParamMap[gender]}` : baseUrl
    window.location.href = url
  }

  const bgImageMap: Record<Category, string> = {
    recetados:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    "sol-urbano":
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    "sol-deportivo":
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80",
    nino: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  }
  const bgImage = bgImageMap[type]

  const backOptions: { label: string; value?: Gender }[] = isUnisexCategory(type)
    ? [{ label: "Ver colección", value: undefined }]
    : type === "nino"
      ? [
          { label: "Nino", value: "nino" as Gender },
          { label: "Nina", value: "nina" as Gender },
        ]
      : [
          { label: "Hombre", value: "hombre" as Gender },
          { label: "Mujer", value: "mujer" as Gender },
        ]

  return (
    <div
      className="w-full h-[26rem] md:h-[28rem] cursor-pointer p-4 md:p-5 box-border"
      style={{ perspective: "1000px" }}
      onClick={() => onToggle(id)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-lg overflow-hidden bg-cover bg-center ${
            isFlipped ? "pointer-events-none" : "pointer-events-auto"
          }`}
          style={{
            backgroundImage: `url('${bgImage}')`,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6 md:p-8">
            <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center mb-6">
              {icon}
            </div>
            <h3 className="text-2xl md:text-2xl font-light text-background mb-2">
              {title}
            </h3>
            <p className="text-sm text-background/80">{subtitle}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-background/60">
              Toca para seleccionar
            </p>
          </div>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-lg bg-card border border-border overflow-hidden ${
            isFlipped ? "pointer-events-auto" : "pointer-events-none"
          }`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full flex flex-col items-center justify-center p-6 md:p-8">
            <h3 className="text-xl md:text-xl font-light text-foreground mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground mb-8">
              Selecciona tu estilo
            </p>

            <div className="flex flex-col gap-4 w-full max-w-xs">
              {backOptions.map((option, index) => {
                const Icon = backOptions.length === 1 ? Users : index === 0 ? User : Users

                return (
                  <OptikHoverButton
                    key={option.value ?? "unisex"}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNavigate(option.value)
                    }}
                    title={option.label}
                    description="Ver coleccion"
                    icon={
                      <Icon className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                    }
                  />
                )
              })}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Toca para volver
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoryFlipCards() {
  const [activeCardId, setActiveCardId] = useState<Category | null>(null)

  const handleToggle = (id: Category) => {
    setActiveCardId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="categorias" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm uppercase tracking-widest text-accent mb-4">
            Nuestras categorias
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground text-balance">
            Encuentra tu estilo perfecto
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          <FlipCard
            id="recetados"
            type="recetados"
            title="Recetados"
            subtitle="Precision para tu dia a dia"
            icon={<Glasses className="w-8 h-8 text-background" />}
            isFlipped={activeCardId === "recetados"}
            onToggle={handleToggle}
          />
          <FlipCard
            id="sol-urbano"
            type="sol-urbano"
            title="Sol Urbanos"
            subtitle="Estilo para la ciudad"
            icon={<Sun className="w-8 h-8 text-background" />}
            isFlipped={activeCardId === "sol-urbano"}
            onToggle={handleToggle}
          />
          <FlipCard
            id="sol-deportivo"
            type="sol-deportivo"
            title="Sol Deportivos"
            subtitle="Rendimiento y proteccion"
            icon={<Sun className="w-8 h-8 text-background" />}
            isFlipped={activeCardId === "sol-deportivo"}
            onToggle={handleToggle}
          />
          <FlipCard
            id="nino"
            type="nino"
            title="Nino"
            subtitle="Comodidad para los mas chicos"
            icon={<Glasses className="w-8 h-8 text-background" />}
            isFlipped={activeCardId === "nino"}
            onToggle={handleToggle}
          />
        </div>
      </div>
    </section>
  )
}

"use client"

import React from "react"
import { useEffect, useMemo, useState } from "react"
import { Glasses, Sun, User, Users, Package, Baby, Dumbbell } from "lucide-react"

import { OptikHoverButton } from "@/components/optik-hover-button"

type Product = {
  id: number
  name: string
  category: string
  gender: string
  price: number
  image: string
}

type ParentCard = {
  id: string
  title: string
  subtitle: string
  image: string
  icon: React.ReactNode
  genderValue: string // Para la URL
  childrenCategories: string[] 
}

interface FlipCardProps {
  id: string
  genderValue: string
  title: string
  subtitle: string
  bgImage: string
  categories: string[]
  icon: React.ReactNode
  isFlipped: boolean
  onToggle: (id: string) => void
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

// Iconos para los botones de categorías (Hijos)
const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase()
  if (normalized.includes("sol")) return <Sun className="w-5 h-5" />
  if (normalized.includes("accesorio")) return <Package className="w-5 h-5" />
  if (normalized.includes("deportivo")) return <Dumbbell className="w-5 h-5" />
  return <Glasses className="w-5 h-5" />
}

function FlipCard({ id, genderValue, title, subtitle, bgImage, categories, icon, isFlipped, onToggle }: FlipCardProps) {
  const handleNavigate = (category?: string) => {
    const params = new URLSearchParams({ genero: genderValue })
    if (category) params.set("categoria", category)
    window.location.href = `/catalogo?${params.toString()}`
  }

  return (
    <div
      className="w-full h-[26rem] md:h-[32rem] cursor-pointer p-4 md:p-5 box-border"
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
        {/* Front (Padre) */}
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
            <h3 className="text-2xl md:text-2xl font-light text-background mb-2 uppercase tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-background/80">{subtitle}</p>
            <p className="mt-6 text-xs uppercase tracking-widest text-background/60">
              Toca para ver opciones
            </p>
          </div>
        </div>

        {/* Back (Hijos) */}
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
              Selecciona una categoría
            </p>

            <div className="flex flex-col gap-3 w-full max-w-xs">
              {categories.map((cat) => (
                <OptikHoverButton
                  key={cat}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNavigate(cat)
                  }}
                  title={cat}
                  description="Ver productos"
                  icon={
                    <div className="text-muted-foreground group-hover:text-accent transition-colors duration-300">
                      {getCategoryIcon(cat)}
                    </div>
                  }
                />
              ))}
              <OptikHoverButton
                onClick={(e) => {
                  e.stopPropagation()
                  handleNavigate()
                }}
                title="Ver todo"
                description={`Colección ${title}`}
                icon={<Users className="w-5 h-5 text-muted-foreground group-hover:text-accent" />}
              />
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
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/products.json")
        const data = await res.json()
        setProducts(data)
      } catch (error) {
        console.error(error)
      }
    }
    loadProducts()
  }, [])

  const parentCards = useMemo<ParentCard[]>(() => {
    if (products.length === 0) return []

    // Definimos la estructura lógica solicitada
    const structures = [
      {
        title: "Dama",
        genderValue: "dama",
        icon: <User className="w-8 h-8 text-background" />,
        filter: (p: Product) => 
          ["dama", "unisex", "deportivo"].includes(p.gender.toLowerCase()) &&
          ["recetados", "recetados-clip-on", "sol urbano"].includes(p.category.toLowerCase())
      },
      {
        title: "Caballero",
        genderValue: "caballero",
        icon: <User className="w-8 h-8 text-background" />,
        filter: (p: Product) => 
          ["caballero", "unisex", "deportivo"].includes(p.gender.toLowerCase()) &&
          ["recetados-clip-on","recetados", "sol urbano"].includes(p.category.toLowerCase())
      },
      {
        title: "Infantiles",
        genderValue: "infantil",
        icon: <Baby className="w-8 h-8 text-background" />,
        filter: (p: Product) => 
          p.gender.toLowerCase() === "infantil" || p.category.toLowerCase() === "infantil"
      },
      {
        title: "Accesorios",
        genderValue: "accesorios",
        icon: <Package className="w-8 h-8 text-background" />,
        filter: (p: Product) => p.category.toLowerCase().includes("accesorio")
      }
    ]

    return structures.map(struct => {
      const filteredProducts = products.filter(struct.filter)
      const uniqueCategories = [...new Set(filteredProducts.map(p => p.category))]
      
      return {
        id: slugify(struct.title),
        title: struct.title,
        genderValue: struct.genderValue,
        subtitle: `${filteredProducts.length} modelos disponibles`,
        image: filteredProducts[0]?.image ?? "",
        icon: struct.icon,
        childrenCategories: uniqueCategories,
      }
    })
  }, [products])

  const handleToggle = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="colecciones" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm uppercase tracking-widest text-accent mb-4">
            Catálogo Especializado
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground text-balance">
            Encuentra tu estilo perfecto
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
          {parentCards.map((card) => (
            <FlipCard
              key={card.id}
              id={card.id}
              genderValue={card.genderValue}
              title={card.title}
              subtitle={card.subtitle}
              bgImage={card.image}
              categories={card.childrenCategories}
              icon={card.icon}
              isFlipped={activeCardId === card.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
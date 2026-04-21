"use client"

import React from "react"

import { useEffect, useMemo, useState } from "react"
import { Glasses, Sun, User, Users, Package } from "lucide-react"

import { OptikHoverButton } from "@/components/optik-hover-button"

type Product = {
  id: number
  name: string
  category: string
  gender: string
  price: number
  image: string
}

type CategoryCard = {
  id: string
  title: string
  subtitle: string
  image: string
  icon: React.ReactNode
  genders: string[]
}

interface FlipCardProps {
  id: string
  category: string
  title: string
  subtitle: string
  bgImage: string
  genders: string[]
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

const getCategoryIcon = (category: string) => {
  const normalized = category.toLowerCase()
  if (normalized.includes("sol")) return <Sun className="w-8 h-8 text-background" />
  if (normalized.includes("accesorio")) return <Package className="w-8 h-8 text-background" />
  return <Glasses className="w-8 h-8 text-background" />
}

function FlipCard({ id, category, title, subtitle, bgImage, genders, icon, isFlipped, onToggle }: FlipCardProps) {
  const handleNavigate = (gender?: string) => {
    const params = new URLSearchParams({ categoria: category })
    if (gender) params.set("genero", gender)
    window.location.href = `/catalogo?${params.toString()}`
  }

  const normalizedGenders = genders.filter((gender) => gender.toLowerCase() !== "unisex")
  const backOptions: { label: string; value?: string }[] = normalizedGenders.length <= 1
    ? [{ label: "Ver coleccion", value: undefined }]
      : [
          ...normalizedGenders.map((gender) => ({ label: gender, value: gender })),
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

  const categories = useMemo<CategoryCard[]>(() => {
    const byCategory = products.reduce<Record<string, Product[]>>((acc, product) => {
      acc[product.category] = acc[product.category] ? [...acc[product.category], product] : [product]
      return acc
    }, {})

    return Object.entries(byCategory)
      .map(([category, categoryProducts]) => {
        const uniqueGenders = [...new Set(categoryProducts.map((product) => product.gender))]
        return {
          id: slugify(category),
          title: category,
          subtitle: `${categoryProducts.length} producto${categoryProducts.length === 1 ? "" : "s"} disponibles`,
          image: categoryProducts[0]?.image ?? "",
          icon: getCategoryIcon(category),
          genders: uniqueGenders,
        }
      })
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [products])

  const handleToggle = (id: string) => {
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
          {categories.map((category) => (
            <FlipCard
              key={category.id}
              id={category.id}
              category={category.title}
              title={category.title}
              subtitle={category.subtitle}
              bgImage={category.image}
              genders={category.genders}
              icon={category.icon}
              isFlipped={activeCardId === category.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

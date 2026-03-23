"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, ArrowLeft, Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useProducts } from "@/hooks/use-products"


const filters = {
  category: ["Todos", "Recetados", "Sol Urbano", "Sol Deportivo", "Nino", "Accesorios"],
  gender: ["Todos", "Hombre", "Mujer", "Unisex", "Nino", "Nina"],
} as const

type Product = {
  id: number
  name: string
  category: string
  gender: string
  price: number
  image: string
}

const INSTAGRAM_USERNAME = "_opti.k"

const buildConsultMessage = (product: Product) => {
  if (product.category === "Recetados") {
    return `Hola, me gustaría coordinar una visita para probarme el modelo ${product.name}.`
  }
  if (product.category === "Sol Deportivo") {
    return `Hola, me interesan los lentes deportivos del modelo ${product.name}.`
  }
  if (product.category === "Sol Urbano") {
    return `Hola, me interesan los lentes urbanos del modelo ${product.name}.`
  }
  if (product.category === "Accesorios") {
    return `Hola, me interesa el accesorio ${product.name}.`
  }
  return `Hola, me interesa el modelo ${product.name}.`
}


export default function CatalogoPage() {
  const {
    products,
    setActiveCategory,
    setActiveGender,
    activeCategory,
    activeGender,
    loading,
  } = useProducts();
  const searchParams = useSearchParams()
  
  const [favorites, setFavorites] = useState<number[]>([])
  
  useEffect(() => {
    const categoria = searchParams.get("categoria");
    const genero = searchParams.get("genero");
    
    if (categoria) setActiveCategory(categoria);
    if (genero) setActiveGender(genero);
  }, [searchParams]);
  
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
        prev.includes(id)
          ? prev.filter((fav) => fav !== id)
          : [...prev, id]
      )
    }

  return (
    <main className="min-h-screen">
      <Header />

      <div className="pt-16 md:pt-20">
        <section className="py-20 md:py-32 bg-secondary min-h-screen">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>
            </div>

            <div className="text-center mb-12 md:mb-16">
              <p className="text-sm uppercase tracking-widest text-accent mb-4">
                Nuestra colección
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground text-balance">
                Catálogo de productos
              </h1>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <div className="flex flex-wrap justify-center gap-2">
                {filters.category.map((cat) => (
                  <Button
                    key={cat}
                    type="button"
                    size="sm"
                    variant={activeCategory === cat ? "default" : "outline"}
                    onClick={() => setActiveCategory(cat)}
                    className={
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              <div className="hidden sm:block w-px bg-border" />

              <div className="flex flex-wrap justify-center gap-2">
                {filters.gender.map((gen) => (
                  <Button
                    key={gen}
                    type="button"
                    size="sm"
                    variant={activeGender === gen ? "default" : "outline"}
                    onClick={() => setActiveGender(gen)}
                    className={
                      activeGender === gen
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }
                  >
                    {gen}
                  </Button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <button
                      type="button"
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={
                        favorites.includes(product.id)
                          ? "Quitar de favoritos"
                          : "Agregar a favoritos"
                      }
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(product.id)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                        {product.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                        {product.gender}
                      </span>
                    </div>

                    <h3 className="font-medium text-foreground mb-1">
                      {product.name}
                    </h3>
                    <p className="text-lg font-semibold text-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                    
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2 w-full justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        const text = buildConsultMessage(product)
                        if (navigator.clipboard?.writeText) {
                          navigator.clipboard.writeText(text).catch(() => {})
                        }
                        window.open(
                          `https://ig.me/m/${INSTAGRAM_USERNAME}`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }}
                    >
                      <Instagram className="w-4 h-4" />
                      Consultar por Instagram
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron productos con los filtros seleccionados.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

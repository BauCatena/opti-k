"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Nueva Colección 2026",
    subtitle: "Miradas que destacan",
    description: "Descubre nuestra nueva línea de lentes con diseños exclusivos",
    cta: "Ver colección",
  },
  {
    id: 2,
    title: "Lentes de Sol",
    subtitle: "Protección y estilo",
    description: "Cuida tus ojos con nuestras gafas de sol de alta calidad",
    cta: "Explorar",
  },
  {
    id: 3,
    title: "Lentes de Lectura",
    subtitle: "Confort visual",
    description: "La claridad que necesitas para cada momento",
    cta: "Descubrir",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [resetKey])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setResetKey((prev) => prev + 1)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setResetKey((prev) => prev + 1)
  }, [])

  return (
    <section id="inicio" className="relative min-h-screen md:min-h-screen flex items-center bg-secondary overflow-hidden py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full border border-foreground" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full border border-foreground" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center relative">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide
            return (
              <div
                key={slide.id}
                data-active={isActive}
                className="transition-all duration-700 data-[active=true]:opacity-100 data-[active=true]:relative data-[active=false]:opacity-0 data-[active=false]:absolute data-[active=false]:inset-0 data-[active=false]:pointer-events-none"
              >
                <p className="text-sm md:text-base uppercase tracking-widest text-accent mb-4">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-6 text-balance">
                  {slide.title}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  {slide.description}
                </p>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                >
                  {slide.cta}
                </Button>
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="pointer-events-auto bg-background/80 hover:bg-background"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="pointer-events-auto bg-background/80 hover:bg-background"
            aria-label="Siguiente slide"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

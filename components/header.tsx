"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItemsDesktop = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Contacto", href: "#contacto" },
]

const navItemsMobile = [
  { label: "Inicio", href: "/" },
  { label: "Categorías", href: "#categorias" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Newsletter", href: "#newsletter" },
  { label: "Contacto", href: "#contacto" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 md:h-32">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col md:flex-row items-start md:items-center gap-0"
          >
            <div className="flex items-center h-11">
              <Image
                src="/logo1.svg"
                alt="Opti-k"
                width={500}
                height={186}
                priority
                className="hidden md:block h-[12rem] w-[19rem]"
              />
              <Image
                src="/logo1.svg"
                alt="Opti-k"
                width={300}
                height={150}
                priority
                className="md:hidden h-[4.5rem] w-[9.2rem]"
              />
            </div>
            <span className="text-xs text-muted-foreground tracking-wide md:hidden">
              MIRADAS QUE DESTACAN
            </span>
            <span className=" text-muted-foreground tracking-wide hidden md:block">
              MIRADAS QUE DESTACAN
            </span>
          </Link>

{/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItemsDesktop.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

{/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItemsMobile.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

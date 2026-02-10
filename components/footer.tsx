"use client"

import Link from "next/link"
import { Instagram, Facebook, MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer: "El tiempo de entrega estándar es de 3-5 días hábiles para envíos nacionales. Para envíos expresos, el tiempo es de 24-48 horas.",
  },
  {
    question: "¿Tienen garantía los lentes?",
    answer: "Sí, todos nuestros productos cuentan con garantía de 1 año contra defectos de fabricación.",
  },
  {
    question: "¿Puedo realizar cambios o devoluciones?",
    answer: "Aceptamos cambios y devoluciones dentro de los primeros 30 días desde la compra, siempre que el producto esté en perfectas condiciones.",
  },
  {
    question: "¿Ofrecen servicio de graduación?",
    answer: "Sí, ofrecemos servicio de graduación en todos nuestros modelos de lentes de lectura. Consulta con nuestro equipo para más información.",
  },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/optik" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/optik" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold tracking-tight">
                opti<span className="text-accent">-k</span>
              </span>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6">
              Miradas que destacan. Tu óptica de confianza con los mejores lentes de sol y lectura.
            </p>
            
            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contáctanos por WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#inicio" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#categorias" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Categorías
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="#newsletter" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="lg:col-span-2">
            <h3 className="font-medium mb-4">Preguntas frecuentes</h3>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-primary-foreground/10">
                  <AccordionTrigger className="text-sm text-left hover:no-underline hover:text-primary-foreground/80 py-3">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-primary-foreground/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-primary-foreground/60">
            <p>© {currentYear} Opti-K. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Política de Privacidad
              </Link>
              <Link href="#" className="hover:text-primary-foreground transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

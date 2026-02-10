"use client"

import { useState, type FormEvent } from "react"
import { Mail, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    // Simula llamada a API
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
    setEmail("")
  }

  return (
    <section id="newsletter" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-accent" />
          </div>

          <p className="text-sm uppercase tracking-widest text-accent mb-4">
            Mantente informado
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 text-balance">
            Suscríbete a nuestro newsletter
          </h2>
          <p className="text-muted-foreground mb-8">
            Recibe ofertas exclusivas, novedades y consejos de cuidado visual directamente en tu correo.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-secondary">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-accent" />
              </div>
              <p className="text-foreground font-medium">
                ¡Gracias por suscribirte!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 px-4 bg-card border-border focus:border-accent"
              />
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Enviando
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Suscribirse
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

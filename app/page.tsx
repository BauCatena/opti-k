import { Header } from "@/components/header"
import { CategoryFlipCards } from "@/components/category-flip-cards"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16 md:pt-20">
        <Newsletter />
        <CategoryFlipCards />
        <Footer />
      </div>
    </main>
  )
}

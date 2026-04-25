import { Navbar }    from "@/components/landing/Navbar"
import { Hero }      from "@/components/landing/Hero"
import { Services }  from "@/components/landing/Services"
import { Portfolio } from "@/components/landing/Portfolio"
import { About }     from "@/components/landing/About"
import { CtaBanner } from "@/components/landing/CtaBanner"
import { Footer }    from "@/components/landing/Footer"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CtaBanner />
      <Footer />
    </>
  )
}

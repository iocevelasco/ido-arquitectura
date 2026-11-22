import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Team from './components/sections/Team'
import Process from './components/sections/Process'
import Typologies from './components/sections/Typologies'
import Projects from './components/sections/Projects'
import Press from './components/sections/Press'
import Contact from './components/sections/Contact'

// Orden de la página = docs/estructura-visual.md §5. Los `id` de cada sección son los anclas de NAV.
export default function App() {
  return (
    <>
      <a
        href="#nosotros"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main>
        <Hero />
        <Team />
        <Process />
        <Typologies />
        <Projects />
        <Press />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

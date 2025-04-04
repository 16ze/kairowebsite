import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/main-layout";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <Image
            src="/images/grid-pattern.svg"
            alt="Background pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
            Développement web <span className="text-neutral-400">&</span>
            <br />
            Optimisation SEO
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
            Nous créons des sites web élégants, performants et optimisés pour
            les moteurs de recherche.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">Discuter de votre projet</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">Voir nos réalisations</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Services
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Des solutions sur mesure pour répondre à vos besoins en
              développement web et référencement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Développement Web</CardTitle>
                <CardDescription>
                  Sites vitrines, e-commerce, applications web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Nous concevons et développons des sites web sur mesure,
                  adaptés à vos besoins spécifiques et optimisés pour tous les
                  appareils.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services#web-development">En savoir plus</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimisation SEO</CardTitle>
                <CardDescription>
                  Référencement naturel, audit SEO, stratégie de contenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Améliorez votre visibilité en ligne et générez plus de trafic
                  qualifié grâce à nos services d&apos;optimisation pour les
                  moteurs de recherche.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services#seo-optimization">En savoir plus</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance & Support</CardTitle>
                <CardDescription>
                  Mise à jour, sécurité, optimisation des performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Nous assurons la maintenance technique de votre site pour
                  garantir sa sécurité, sa performance et sa disponibilité en
                  tout temps.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/services#maintenance">En savoir plus</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Réalisations
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Découvrez quelques-uns de nos projets récents et comment nous
              avons aidé nos clients à atteindre leurs objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for portfolio items - to be replaced with real content */}
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden flex items-center justify-center"
              >
                <p className="text-neutral-400">Projet {item}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/portfolio">Voir tous nos projets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre présence en ligne ?
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Contactez-nous dès aujourd&apos;hui pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white hover:bg-white hover:text-black"
          >
            <Link href="/contact">Prendre contact</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}

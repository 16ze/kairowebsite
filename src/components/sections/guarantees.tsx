import { ScrollReveal } from "../ui/scroll-reveal";

const guarantees = [
  {
    icon: "🎯",
    title: "Garantie satisfaction",
    description: "Révisions illimitées jusqu'à votre satisfaction complète",
  },
  {
    icon: "⚡",
    title: "Délais respectés",
    description: "Livraison dans les temps ou remboursement de 10%",
  },
  {
    icon: "🛡️",
    title: "Paiement sécurisé",
    description: "Paiement en plusieurs fois sans frais possible",
  },
  {
    icon: "📱",
    title: "Support réactif",
    description: "Réponse garantie sous 24h ouvrées",
  },
];

export function Guarantees() {
  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Travailler avec moi en toute sérénité
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="bg-white dark:bg-black p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{guarantee.icon}</span>
                  <div>
                    <h3 className="font-semibold mb-2">{guarantee.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

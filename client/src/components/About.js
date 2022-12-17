import {
  CreditCardIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  GlobeEuropeAfricaIcon,
  IdentificationIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

/*Shows the about page of Annunci.*/

//Frequently asked questions
const faqs = [
  {
    question: "Wie kann ich ein Inserat aufgeben?",
    answer:
      "Um auf Annunci Inserieren zu können, muss jede:r Nutzer:in über einen registrierten Account verfügen. Das Inserieren eines Angebots ist ganz einfach. Logg dich in deinen Account ein und wähle das Feld 'Inserat aufgeben', es öffnet sich das Eingabe-Formular. Fülle es Schritt für Schritt aus. Ein Inserat mit Fotos erhält erfahrungsgemäss mehr Aufmerksamkeit. Wenn du Fotos hinzufügen möchtest, kannst du in das entsprechende Feld klicken und Bilder hochladen. Alternativ dazu kannst du auch die Fotos vom Desktop per drag and drop direkt in das entsprechende Feld ziehen. Wenn das ganze Formular ausgefüllt ist, klicke auf speichern."
  },
  {
    question: "Wo finde ich meine Inserate?",
    answer: "Um all deine aktiven Inserat zu finden, logg dich in dein Konto ein. Danach findest du alle deine Inserate."
  },
  {
    question: "Wie ändere ich mein Inserat?",
    answer: "Um deine Änderungen vorzunehmen, logg dich in dein Konto ein und suche das zu bearbeitende Inserat aus. Unter 'show details' kannst du dein Inserate bearbeiten"
  },
  // More questions...
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

//Annunci benefits
const features = [
  {
    name: 'Gebühren',
    description: 'Inserieren ist bei Annunci grundsätzlich kostenlos.',
    icon: CreditCardIcon,
  },
  {
    name: 'Verkaufen auf Annunci',
    description: 'Es ist ganz einfach: Verfassen Sie eine kurze Beschreibung und fügen Sie Fotos hinzu. Schon ist Ihre Kleinanzeige veröffentlicht! ',
    icon: BanknotesIcon,
  },
  {
    name: 'Kaufen auf Annunci',
    description: 'Suchen und finden Sie eine grosse Auswahl von kostenlosen Kleinanzeigen wie Möbel, Wohnungen, Elektronik, Jobs oder Autos.',
    icon: ShoppingCartIcon,
  },
  {
    name: 'Sicherheit',
    description: 'Die Sicherheit unserer Nutzer liegt Annunci am Herzen.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Nachhaltigkeit',
    description: 'Werfe Ungenutztes nicht weg - mach es zu Geld. Und schone gleichzeitig unsere Umwelt.',
    icon: GlobeEuropeAfricaIcon,
  },
  {
    name: 'Benutzerkonto',
    description: 'Ihr Annunci-Konto ist Ihre persönliche Visitenkarte bei Annunci.',
    icon: IdentificationIcon,
  },
]

const About = () => {
  return (
    <div className="relative bg-gray bg-gray-100 py-16 sm:py-24 pt-100">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        {/*Title*/}
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Inserieren Sie schneller mit Annunci
        </p>
        {/*Description*/}
        <p className="mx-auto mt-5 max-w-prose text-xl text-gray-500">
          Sie haben etwas, das Sie nicht mehr brauchen und möchten es so schnell wie möglich loswerden? Annunci ist eine Plattform für Online-Kleinanzeigen in der Schweiz. Ob occasion oder neu – geben Sie ein Inserat auf und bereiten Sie jemandem eine Freude. Wir wünschen Ihnen viel Spass beim Verschenken und Verkaufen.
        </p>
        {/*Annunci benefits grid*/}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-indigo-500 p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Faq*/}
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
            {/*Faq title*/}
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Häufig gefragt
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                          <span className="font-medium text-gray-900">{faq.question}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

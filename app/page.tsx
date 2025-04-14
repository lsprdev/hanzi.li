"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, Database, Layers, BarChart, BookOpen, ArrowRight } from "lucide-react"

// Language translations
const translations = {
  en: {
    // Navigation
    features: "Features",
    howItWorks: "How It Works",
    testimonials: "Testimonials",
    login: "Login",
    signup: "Sign up",

    // Hero
    heroTitle: "Master Chinese Characters with",
    heroTitleHighlight: "Ease",
    heroSubtitle:
      "Hanzi.li is a powerful flashcard system designed to help you memorize Chinese characters efficiently using proven spaced repetition techniques.",
    startLearning: "Start Learning Now",
    learnMore: "Learn More",

    // Features
    featuresTitle: "Powerful Features",
    featuresSubtitle: "Everything you need to accelerate your Chinese character learning journey",

    featureOrganize: "Organize by Collections",
    featureOrganizeDesc:
      "Create custom collections for HSK levels, topics, or any category you need to organize your learning.",

    featureBulk: "Bulk Import",
    featureBulkDesc:
      "Quickly import multiple characters at once using JSON format or ask ChatGPT to generate lists for you.",

    featurePinyin: "Pinyin Support",
    featurePinyinDesc:
      "Each card includes the character, pinyin pronunciation, and English translation for complete learning.",

    featureProgress: "Progress Tracking",
    featureProgressDesc: "Track your learning progress and see how many cards you've mastered in each collection.",

    featureFocus: "Character Focus",
    featureFocusDesc: "Clean, distraction-free interface that helps you focus on one character at a time.",

    featureSimple: "Simple Interface",
    featureSimpleDesc:
      "Intuitive design that's easy to use, letting you focus on learning rather than figuring out the app.",

    // How It Works
    howTitle: "How It Works",
    howSubtitle: "Start learning Chinese characters in just a few simple steps",

    step1: "Create Collections",
    step1Desc: "Organize your learning by creating collections for different topics or HSK levels.",

    step2: "Add or Import Cards",
    step2Desc: "Add cards manually or import them in bulk using JSON format.",

    step3: "Review and Learn",
    step3Desc: "Review your cards and track your progress as you master Chinese characters.",

    startJourney: "Start Your Learning Journey",

    // Testimonials
    testimonialsTitle: "What Our Users Say",
    testimonialsSubtitle: "Join thousands of learners who have accelerated their Chinese character mastery",

    testimonial1:
      "Hanzi.li has transformed how I learn Chinese characters. The collections feature helps me organize my study by topics.",
    testimonial1Author: "Sarah L.",
    testimonial1Role: "HSK3 Student",

    testimonial2:
      "The bulk import feature saved me hours of manual entry. I can focus on learning rather than setting up flashcards.",
    testimonial2Author: "Michael T.",
    testimonial2Role: "Language Enthusiast",

    testimonial3:
      "I love how simple yet powerful this app is. The clean interface keeps me focused on learning characters.",
    testimonial3Author: "David W.",
    testimonial3Role: "Business Professional",

    // CTA
    ctaTitle: "Ready to Master Chinese Characters?",
    ctaSubtitle:
      "Join Hanzi.li today and accelerate your Chinese language learning journey with our powerful flashcard system.",
    getStarted: "Get Started Now",

    // Newsletter
    newsletterTitle: "Stay Updated",
    newsletterSubtitle: "Subscribe to our newsletter for Chinese learning tips, updates, and new features.",
    subscribe: "Subscribe",
    emailPlaceholder: "Enter your email",

    // Footer
    about: "A modern flashcard system for learning Chinese characters efficiently.",
    featuresFooter: "Features",
    collections: "Collections",
    bulkImport: "Bulk Import",
    pinyinSupport: "Pinyin Support",
    progressTracking: "Progress Tracking",

    resourcesFooter: "Resources",
    blog: "Blog",
    tutorials: "Tutorials",
    hskWordLists: "HSK Word Lists",
    faq: "FAQ",

    accountFooter: "Account",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    copyright: "All rights reserved.",
  },
  pt: {
    // Navigation
    features: "Recursos",
    howItWorks: "Como Funciona",
    testimonials: "Depoimentos",
    login: "Entrar",
    signup: "Cadastrar",

    // Hero
    heroTitle: "Domine Caracteres Chineses com",
    heroTitleHighlight: "Facilidade",
    heroSubtitle:
      "Hanzi.li é um poderoso sistema de flashcards projetado para ajudá-lo a memorizar caracteres chineses de forma eficiente usando técnicas comprovadas de repetição espaçada.",
    startLearning: "Comece a Aprender Agora",
    learnMore: "Saiba Mais",

    // Features
    featuresTitle: "Recursos Poderosos",
    featuresSubtitle: "Tudo o que você precisa para acelerar sua jornada de aprendizado de caracteres chineses",

    featureOrganize: "Organize por Coleções",
    featureOrganizeDesc:
      "Crie coleções personalizadas para níveis HSK, tópicos ou qualquer categoria necessária para organizar seu aprendizado.",

    featureBulk: "Importação em Massa",
    featureBulkDesc:
      "Importe rapidamente vários caracteres de uma vez usando formato JSON ou peça ao ChatGPT para gerar listas para você.",

    featurePinyin: "Suporte a Pinyin",
    featurePinyinDesc:
      "Cada cartão inclui o caractere, a pronúncia em pinyin e a tradução para o português para um aprendizado completo.",

    featureProgress: "Acompanhamento de Progresso",
    featureProgressDesc: "Acompanhe seu progresso de aprendizado e veja quantos cartões você dominou em cada coleção.",

    featureFocus: "Foco no Caractere",
    featureFocusDesc: "Interface limpa e sem distrações que ajuda você a se concentrar em um caractere de cada vez.",

    featureSimple: "Interface Simples",
    featureSimpleDesc:
      "Design intuitivo e fácil de usar, permitindo que você se concentre no aprendizado em vez de descobrir como usar o aplicativo.",

    // How It Works
    howTitle: "Como Funciona",
    howSubtitle: "Comece a aprender caracteres chineses em apenas alguns passos simples",

    step1: "Crie Coleções",
    step1Desc: "Organize seu aprendizado criando coleções para diferentes tópicos ou níveis HSK.",

    step2: "Adicione ou Importe Cartões",
    step2Desc: "Adicione cartões manualmente ou importe-os em massa usando formato JSON.",

    step3: "Revise e Aprenda",
    step3Desc: "Revise seus cartões e acompanhe seu progresso enquanto domina os caracteres chineses.",

    startJourney: "Inicie Sua Jornada de Aprendizado",

    // Testimonials
    testimonialsTitle: "O Que Nossos Usuários Dizem",
    testimonialsSubtitle: "Junte-se a milhares de estudantes que aceleraram seu domínio de caracteres chineses",

    testimonial1:
      "Hanzi.li transformou a forma como aprendo caracteres chineses. O recurso de coleções me ajuda a organizar meu estudo por tópicos.",
    testimonial1Author: "Sarah L.",
    testimonial1Role: "Estudante HSK3",

    testimonial2:
      "O recurso de importação em massa me economizou horas de entrada manual. Posso me concentrar no aprendizado em vez de configurar flashcards.",
    testimonial2Author: "Michael T.",
    testimonial2Role: "Entusiasta de Idiomas",

    testimonial3:
      "Adoro como este aplicativo é simples e poderoso. A interface limpa me mantém focado no aprendizado dos caracteres.",
    testimonial3Author: "David W.",
    testimonial3Role: "Profissional de Negócios",

    // CTA
    ctaTitle: "Pronto para Dominar Caracteres Chineses?",
    ctaSubtitle:
      "Junte-se ao Hanzi.li hoje e acelere sua jornada de aprendizado do idioma chinês com nosso poderoso sistema de flashcards.",
    getStarted: "Comece Agora",

    // Newsletter
    newsletterTitle: "Mantenha-se Atualizado",
    newsletterSubtitle:
      "Inscreva-se em nossa newsletter para dicas de aprendizado de chinês, atualizações e novos recursos.",
    subscribe: "Inscrever-se",
    emailPlaceholder: "Digite seu email",

    // Footer
    about: "Um moderno sistema de flashcards para aprender caracteres chineses de forma eficiente.",
    featuresFooter: "Recursos",
    collections: "Coleções",
    bulkImport: "Importação em Massa",
    pinyinSupport: "Suporte a Pinyin",
    progressTracking: "Acompanhamento de Progresso",

    resourcesFooter: "Recursos",
    blog: "Blog",
    tutorials: "Tutoriais",
    hskWordLists: "Listas de Palavras HSK",
    faq: "Perguntas Frequentes",

    accountFooter: "Conta",
    privacyPolicy: "Política de Privacidade",
    termsOfService: "Termos de Serviço",

    copyright: "Todos os direitos reservados.",
  },
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [language, setLanguage] = useState<"en" | "pt">("en")
  const t = translations[language]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-red-600">hanzi.li</span>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-gray-600 hover:text-gray-900">
            {t.features}
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
            {t.howItWorks}
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-gray-900">
            {t.testimonials}
          </a>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button variant="outline">{t.login}</Button>
            </Link>
            <Link href="/signup">
              <Button>{t.signup}</Button>
            </Link>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setLanguage("en")}
              className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${
                language === "en" ? "ring-2 ring-red-600" : ""
              }`}
              aria-label="Switch to English"
            >
              <span className="text-xl">🇺🇸</span>
            </button>
            <button
              onClick={() => setLanguage("pt")}
              className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${
                language === "pt" ? "ring-2 ring-red-600" : ""
              }`}
              aria-label="Mudar para Português"
            >
              <span className="text-xl">🇧🇷</span>
            </button>
          </div>
        </div>
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setLanguage("en")}
            className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${
              language === "en" ? "ring-2 ring-red-600" : ""
            }`}
            aria-label="Switch to English"
          >
            <span className="text-xl">🇺🇸</span>
          </button>
          <button
            onClick={() => setLanguage("pt")}
            className={`flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${
              language === "pt" ? "ring-2 ring-red-600" : ""
            }`}
            aria-label="Mudar para Português"
          >
            <span className="text-xl">🇧🇷</span>
          </button>
          <Button variant="ghost" size="sm">
            <span className="sr-only">Open menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              {t.heroTitle} <span className="text-red-600">{t.heroTitleHighlight}</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">{t.heroSubtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="px-8">
                  {t.startLearning}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                {t.learnMore}
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full -z-10 blur-3xl opacity-60"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">HSK1</h3>
                <span className="text-sm text-gray-500">12 cards</span>
              </div>
              <div className="border rounded-lg p-8 mb-4 flex items-center justify-center">
                <span className="text-6xl">我</span>
              </div>
              <div className="flex justify-center">
                <Button>Flip Card</Button>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-100 rounded-full -z-10 blur-3xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.featuresTitle}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{t.featuresSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers className="h-8 w-8 text-red-600" />}
              title={t.featureOrganize}
              description={t.featureOrganizeDesc}
            />
            <FeatureCard
              icon={<Database className="h-8 w-8 text-red-600" />}
              title={t.featureBulk}
              description={t.featureBulkDesc}
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-red-600" />}
              title={t.featurePinyin}
              description={t.featurePinyinDesc}
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-red-600" />}
              title={t.featureProgress}
              description={t.featureProgressDesc}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-8 w-8 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              }
              title={t.featureFocus}
              description={t.featureFocusDesc}
            />
            <FeatureCard
              icon={
                <svg
                  className="h-8 w-8 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              title={t.featureSimple}
              description={t.featureSimpleDesc}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.howTitle}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{t.howSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="1" title={t.step1} description={t.step1Desc} />
            <StepCard number="2" title={t.step2} description={t.step2Desc} />
            <StepCard number="3" title={t.step3} description={t.step3Desc} />
          </div>

          <div className="mt-16 text-center">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                {t.startJourney}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t.testimonialsTitle}</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">{t.testimonialsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard quote={t.testimonial1} author={t.testimonial1Author} role={t.testimonial1Role} />
            <TestimonialCard quote={t.testimonial2} author={t.testimonial2Author} role={t.testimonial2Role} />
            <TestimonialCard quote={t.testimonial3} author={t.testimonial3Author} role={t.testimonial3Role} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-red-600 rounded-2xl p-8 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold">{t.ctaTitle}</h2>
            <p className="mt-4 text-xl max-w-2xl mx-auto">{t.ctaSubtitle}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="px-8">
                  {t.getStarted}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-red-600"
                >
                  {t.login}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.newsletterTitle}</h2>
            <p className="mt-4 text-gray-600">{t.newsletterSubtitle}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <Button>{t.subscribe}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">hanzi.li</h3>
              <p className="text-gray-400">{t.about}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.featuresFooter}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    {t.collections}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.bulkImport}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.pinyinSupport}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.progressTracking}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.resourcesFooter}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    {t.blog}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.tutorials}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.hskWordLists}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.faq}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t.accountFooter}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white">
                    {t.login}
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white">
                    {t.signup}
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.privacyPolicy}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    {t.termsOfService}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} hanzi.li. {t.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  )
}

// Step Card Component
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Testimonial Card Component
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-red-600">
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.039 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
        </svg>
      </div>
      <p className="text-gray-600 mb-4">{quote}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </Card>
  )
}

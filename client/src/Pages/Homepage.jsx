import { Link } from "react-router-dom";

import {
  ChevronRightIcon,
  FolderIcon,
  MegaphoneIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Materiais",
    description:
      "Focado na aprendizagem e disponível 24/7, os materiais disponibilizados possuem demonstrações passo a passo para soluções de problemas, montagens e manutenções de computadores, boas práticas e outros conteúdos, atualizados regularmente.",
    href: "/materials",
    icon: FolderIcon,
  },
  {
    name: "O Fórum",
    description:
      "Se você não encontrar a solução do seu problema ou o conteúdo desejado nos materiais disponíveis, o Fórum LearnIT está sempre à sua disposição para a inserção de dúvidas, problemas, comentários ou sugestões.",
    href: "/forum",
    icon: MegaphoneIcon,
  },
];

const navigation = [
  {
    name: "Quem somos?",
    href: "#quem-somos",
  },
  {
    name: "Como é a plataforma?",
    href: "#sobre-plataforma",
  },
  {
    name: "Contato",
    href: "#contato",
  },
];

export default function Homepage() {
  return (
    <>
      <div className="relative isolate mt-14">

        {/* Navigation */}
        <div className="text-center xs:gap-x-2 flex justify-around mt-auto pt-5 md:mx-auto max-w-7xl">
          {navigation.map((nav) => (
            <a
              key={nav.name}
              href={nav.href}
              className="text-lg font-semibold text-primary hover:text-secondary sm:block md:mr-4 md:last:mr-0 md:mb-2 hover:border-b-2 hover:border-gray-300 border-b-2 border-transparent transition duration-1000 ease-in-out"
            >
              {nav.name}
            </a>
          ))}
        </div>

        {/* Hero section */}
        <div
          className="mx-auto max-w-7xl px-6 py-24 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-24"
          id="quem-somos"
        >
          <div className="mx-auto max-w-3xl lg:mx-0 lg:flex-auto">
            <div className="flex items-center border-transparent">
              <div className="relative flex items-center gap-x-4 transition duration-1000 ease-in-out rounded-full px-4 py-1 text-sm text-gray-600 ring-1 ring-primary hover:ring-sky-500">
                <span className="font-semibold text-primary">
                  Quem somos?
                </span>
                <span className="h-4 w-px bg-secondary" aria-hidden="true" />
                <Link to="/register" className="flex text-tertiary items-center gap-x-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Faça seu cadastro!
                  <ChevronRightIcon
                    className="-mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
            <h1 className="mt-10 max-w-lg text-8xl font-bold tracking-tight text-primary sm:text-7xl">
              LearnIT
            </h1>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-secondary">
              Aprenda manutenção de computadores
            </h1>
            <p className="mt-6 xl:mr-24 text-md leading-8 text-secondary text-justify font-semibold">
              LearnIT é uma plataforma gratuita que contribui com o aprendizado
              da manutenções de computadores e seus periféricos. A plataforma
              oferece guias de ajuda e demonstrações passo a passo para auxiliar
              aqueles que possuem o interesse de se desenvolver na área. Acesse
              já!
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/materials"
                className="rounded-md transition duration-700 bg-secondary px-4 py-2.5 text-md font-semibold text-white shadow-lg hover:bg-tertiary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Acesse agora!
              </Link>
              <Link
                to="/register"
                className="text-md font-semibold leading-6 text-primary hover:text-tertiary text-sm border-transparent hover:border-b-2 hover:border-gray-300 transition duration-700 ease-in-out"
              >
                Faça seu cadastro! <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow mx-auto">
            <img className="sm:mx-auto" src="./images/computer.png" />
          </div>
        </div>

        {/* Feature section with grid */}
        <div id="sobre-plataforma">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-24 lg:mt-14">
            <div className="mx-auto max-w-3xl lg:text-center">
              <h2 className="text-base font-semibold text-bg_primary">
                Como é a plataforma?
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
                Entenda nossos objetivos
              </p>
              <p className="mt-6 text-lg leading-8 text-secondary">
                Esta plataforma foi desenvolvida com o foco em introduzir o mundo
                da computação para quem quiser ingressar na área, assim como
                ajudar quem esteja enfrentando algum problema com sua máquina e
                busque por uma solução rápida e prática.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-7xl sm:max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
              <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary">
                      <feature.icon
                        className="h-5 w-5 flex-none text-bg_primary"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base text-justify leading-7 text-secondary">
                      <p className="flex-auto">{feature.description}</p>
                      <p className="mt-6">
                        <Link
                          to={feature.href}
                          className="text-sm border-transparent hover:border-b-2 hover:border-gray-300 transition duration-700 hover:ease-in-out font-semibold leading-6 text-primary hover:text-secondary"
                        >
                          Acesse agora <span aria-hidden="true">→</span>
                        </Link>
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="mx-auto mt-20 max-w-7xl sm:mt-20 lg:mt-48 pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32" id="contato">
          <div className="mx-auto mb-20 max-w-3xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
              Conheça o responsável pelo projeto
            </p>
            <div className="border-b-2 border-gray-600 h-2 mt-2" />
          </div>
          <div className="pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-9 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative sm:aspect-[3/4] lg:aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                  <img
                    className="absolute inset-0 h-full sm:w-full lg:w-[470px] rounded-3xl object-cover shadow-2xl"
                    src="./images/autor.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full lg:pl-28 max-w-3xl xl:max-w-7xl xl:flex-auto xl:py-24">
                <figure className="relative isolate">
                  <blockquote className="text-xl text-justify leading-8 text-primary sm:text-2xl sm:leading-9">
                    <h1 className="text-2xl font-semibold leading-8 sm:text-xl sm:leading-9">
                      Natan Mendes
                    </h1>
                    <h2 className="text-xl leading-8 sm:text-lg sm:leading-9">
                      Programador iniciante | Aluno no 4º ano do IFSUL - câmpus
                      Gravataí
                    </h2>
                  </blockquote>
                </figure>

                <figure className="relative isolate pt-2 sm:pt-5">
                  <blockquote className="text-xl text-justify leading-8 text-tertiary sm:text-lg sm:leading-9">
                    <p>
                      Olá! Sou Natan, um estudante de programação do câmpus
                      IFSUL de Gravataí. Este projeto faz parte do meu Trabalho
                      de Conclusão de Curso. Meu objetivo é ajudar pessoas com
                      pouca experiência em computadores, compartilhando
                      conhecimento e fornecendo soluções para problemas de
                      computação, além de promover boas práticas nessa área.
                    </p>
                  </blockquote>
                  <figure className="mt-6 relative isolate">
                    <blockquote className="text-xl text-justify leading-8 sm:text-2xl sm:leading-9">
                      <h1 className="text-2xl font-semibold text-primary leading-8 sm:text-xl sm:leading-9">
                        Orientadores do projeto
                      </h1>
                      <div className="flex gap-x-2">
                        <h2 className="text-xl leading-8 text-primary sm:text-lg sm:leading-9">
                          Orientadora:
                        </h2>
                        <h2 className="text-xl leading-8 text-tertiary sm:text-lg sm:leading-9">
                          Profa. Ma. Patrícia Cristine Hoff
                        </h2>
                      </div>
                      <div className="flex gap-x-2">
                        <h2 className="text-xl leading-8 text-primary sm:text-lg sm:leading-9">
                          Coorientador:
                        </h2>
                        <h2 className="text-xl leading-8 text-tertiary sm:text-lg sm:leading-9">
                          Prof. Me. Fábio de Oliveira Dias
                        </h2>
                      </div>
                    </blockquote>
                  </figure>
                  <figcaption className="mt-8 text-base">
                    <h1 className="font-semibold text-primary">
                      Redes sociais para contato
                    </h1>
                    <div className="mt-2 flex gap-4 items-center text-primary">
                      <a
                        href="https://github.com/NatanMendes0"
                        className="hover:text-tertiary transition duration-700 ease-in-out"
                      >
                        <svg
                          className="w-11"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/natancruzmendes/"
                        className="hover:text-tertiary transition duration-700 ease-in-out"
                        aria-label="Find us on LinkedIn"
                        rel="noopener"
                      >
                        <svg
                          className="w-10"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M44.45 0H3.55A3.5 3.5 0 0 0 0 3.46v41.07A3.5 3.5 0 0 0 3.54 48h40.9A3.51 3.51 0 0 0 48 44.54V3.46A3.5 3.5 0 0 0 44.45 0Zm-30.2 40.9H7.11V18h7.12v22.9Zm-3.57-26.03a4.13 4.13 0 1 1-.02-8.26 4.13 4.13 0 0 1 .02 8.26ZM40.9 40.9H33.8V29.77c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.89V40.9h-7.1V18h6.82v3.12h.1c.94-1.8 3.26-3.7 6.72-3.7 7.21 0 8.54 4.74 8.54 10.91V40.9Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

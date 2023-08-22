import { Link } from "react-router-dom";

// const Homepage = () => {
//   const { isLoggedIn, user } = useAuth();

//   return (
//     <div>
//       <h1 className="mb-3">Homepage</h1>
//       {isLoggedIn ? (
//         <>
//           <p>Olá, <strong>{user.name}</strong></p>
//         </>
//       ) : (
//         <>
//           <p>Olá, <strong>visitante</strong></p>
//         </>
//       )}
//       <br />
//       <Link className="text-xg" to="/forum">Ir para o Fórum</Link>
//     </div>
//   );
// };

// export default Homepage;

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
    name: "Contato?",
    href: "#contato",
  },
];

export default function Homepage() {
  return (
    <>
      <div className="relative isolate">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          />
        </svg>

        {/* Navigation */}
        <div className="text-center flex justify-around mt-7 mx-[500px]">
          {navigation.map((nav) => (
            <a
              key={nav.name}
              href={nav.href}
              className="text-lg font-semibold text-font_secondary hover:text-secondary"
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
            <div className="flex items-center">
              <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-primary hover:ring-gray-900/20">
                <span className="font-semibold text-secondary">
                  Quem somos?
                </span>
                <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" />
                <Link to="/register" className="flex items-center gap-x-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  Faça seu cadastro!
                  <ChevronRightIcon
                    className="-mr-2 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
            <h1 className="mt-10 max-w-lg text-7xl font-bold tracking-tight text-primary sm:text-7xl">
              LearnIT
            </h1>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-font_secondary">
              Aprenda manutenção de computadores
            </h1>

            <p className="mt-6 mr-24 text-md leading-8 text-gray-700 text-justify font-semibold">
              LearnIT é uma plataforma gratuita que contribui com o aprendizado
              da manutenções de computadores e seus periféricos. A plataforma
              oferece guias de ajuda e demonstrações passo a passo para auxiliar
              aqueles que possuem o interesse de se desenvolver na área. Acesse
              já!
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/materials"
                className="rounded-md bg-primary px-4 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Acesse agora!
              </Link>
              <Link
                to="/register"
                className="text-md font-semibold leading-6 text-font_secondary hover:text-primary"
              >
                Faça seu cadastro! <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <img src="./images/computer.png" alt="" />
          </div>
        </div>

        {/* Feature section with grid */}
        <div className="mx-auto max-w-7xl" id="sobre-plataforma">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold  text-primary">
              Como é a plataforma?
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Entenda nossos objetivos
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Esta plataforma foi desenvolvida com o foco em introduzir o mundo
              da computação para quem quiser ingressar na área, assim como
              ajudar quem esteja enfrentando algum problema com sua máquina e
              busque por uma solução rápida e prática.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24 lg:max-w-5xl">
            <dl className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {/* todo: adicionar função que faz o border-b da navbar mudar */}
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-primary"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base text-justify leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link
                        to={feature.href}
                        className="text-sm font-semibold leading-6 text-primary hover:text-secondary"
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

        {/* CTA section */}
        <div className="mx-auto mt-20 max-w-7xl sm:mt-20 lg:mt-48 pb-16 pt-24 sm:pb-24 sm:pt-32 xl:pb-32" id="contato">
          <div className="mx-auto mb-24 max-w-3xl lg:text-center">
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Conheça o responsável pelo projeto
            </p>
            <div className="border-b-2 border-gray-600 h-2 mt-2" />
          </div>
          <div className="pb-20 sm:pb-24 xl:pb-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
              <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
                <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                  <img
                    className="absolute inset-0 h-full sm:w-full lg:w-[470px] rounded-3xl object-cover shadow-2xl"
                    src="./images/autor.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full pl-28 max-w-3xl xl:max-w-7xl xl:flex-auto xl:py-24">
                <figure className="relative isolate">
                  <blockquote className="text-xl text-justify leading-8 text-font_secondary sm:text-2xl sm:leading-9">
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
                  <blockquote className="text-xl text-justify leading-8 text-font_secondary sm:text-lg sm:leading-9">
                    <p>
                      Olá! Sou Natan, um estudante de programação do câmpus
                      IFSUL de Gravataí. Este projeto faz parte do meu Trabalho
                      de Conclusão de Curso. Meu objetivo é ajudar pessoas com
                      pouca experiência em computadores, compartilhando
                      conhecimento e fornecendo soluções para problemas de
                      computação, além de promover boas práticas nessa área.
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 text-base">
                    <h1 className="font-semibold text-font_secondary">
                      Redes sociais para contato
                    </h1>
                    <div className="mt-2 flex gap-4 items-center">
                      <a
                        href="https://github.com/NatanMendes0"
                        className="hover:text-font_tertiary text-font_secondary"
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
                        className="hover:text-font_tertiary text-font_secondary"
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

                      <a
                        href="https://www.instagram.com/xnatx___/"
                        className="hover:text-font_tertiary text-font_secondary"
                        aria-label="Find us on Instagram"
                        rel="noopener"
                      >
                        <svg
                          className="w-10"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M24 4.32c6.41 0 7.17.03 9.7.14 2.34.1 3.6.5 4.45.83 1.11.43 1.92.95 2.75 1.79a7.38 7.38 0 0 1 1.8 2.75c.32.85.72 2.12.82 4.46.11 2.53.14 3.29.14 9.7 0 6.4-.03 7.16-.14 9.68-.1 2.35-.5 3.61-.83 4.46a7.42 7.42 0 0 1-1.79 2.75 7.38 7.38 0 0 1-2.75 1.8c-.85.32-2.12.72-4.46.82-2.53.11-3.29.14-9.69.14-6.41 0-7.17-.03-9.7-.14-2.34-.1-3.6-.5-4.45-.83a7.42 7.42 0 0 1-2.75-1.79 7.38 7.38 0 0 1-1.8-2.75 13.2 13.2 0 0 1-.82-4.46c-.11-2.53-.14-3.29-.14-9.69 0-6.41.03-7.17.14-9.7.1-2.34.5-3.6.83-4.45A7.42 7.42 0 0 1 7.1 7.08a7.38 7.38 0 0 1 2.75-1.8 13.2 13.2 0 0 1 4.46-.82c2.52-.11 3.28-.14 9.69-.14ZM24 0c-6.52 0-7.33.03-9.9.14-2.54.11-4.3.53-5.81 1.12a11.71 11.71 0 0 0-4.26 2.77 11.76 11.76 0 0 0-2.77 4.25C.66 9.8.26 11.55.14 14.1A176.6 176.6 0 0 0 0 24c0 6.52.03 7.33.14 9.9.11 2.54.53 4.3 1.12 5.81a11.71 11.71 0 0 0 2.77 4.26 11.73 11.73 0 0 0 4.25 2.76c1.53.6 3.27 1 5.82 1.12 2.56.11 3.38.14 9.9.14 6.5 0 7.32-.03 9.88-.14 2.55-.11 4.3-.52 5.82-1.12 1.58-.6 2.92-1.43 4.25-2.76a11.73 11.73 0 0 0 2.77-4.25c.59-1.53 1-3.27 1.11-5.82.11-2.56.14-3.38.14-9.9 0-6.5-.03-7.32-.14-9.88-.11-2.55-.52-4.3-1.11-5.82-.6-1.6-1.41-2.94-2.75-4.27a11.73 11.73 0 0 0-4.25-2.76C38.2.67 36.45.27 33.9.15 31.33.03 30.52 0 24 0Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M24 11.67a12.33 12.33 0 1 0 0 24.66 12.33 12.33 0 0 0 0-24.66ZM24 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM39.7 11.18a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.75 0Z"
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

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

import Toggle from "../Components/Toggle/Index";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [current, setCurrent] = useState("/");
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const auth = useAuth();
  const location = useLocation();

  console.log(current);

  const navigation = [
    { name: "Página Inicial", href: "/", current: location.pathname === "/" },
    {
      name: "Materiais",
      href: "/materials",
      current: location.pathname.startsWith("/materials"),
    },
    { name: "Fórum", href: "/forum", current: location.pathname.startsWith("/forum") },
  ];

  const onClick = (e) => {
    e.preventDefault();
    const href = e.target.getAttribute("href");
    setCurrent(href);
    navigate(href);
  };

  return (
    <Disclosure as="nav" className="bg-quaternary transition duration-700 ease-in-out backdrop-blur-md shadow fixed-navbar">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-12 justify-between items-center">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img
                      className="h-10 w-auto"
                      src="../../images/logo.png"
                      alt="LearnIT logo"
                    />
                  </Link>
                </div>

                {/* <div className="hidden lg:ml-6 lg:flex lg:space-x-8"> */}
                <div className="ml-6 flex space-x-8 items-center">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClick}
                      className={classNames(
                        item.current
                          ? "border-sky-500 text-primary border-b-2"
                          : "border-transparent text-tertiary hover:border-b-2 hover:border-gray-300 hover:text-secondary",
                        "inline-flex items-center transition duration-1000 ease-in-out px-1 pt-1 text-sm font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <p className="ml-5"><Toggle /></p>
                </div>
              </div>

              {/* Search bar */}
              {/* <div className="flex flex-grow justify-center">
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="px-2 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button className="ml-2 px-3 py-1 text-sm rounded-md bg-secondary text-white focus:outline-none focus:ring-2 focus:ring-sky-500">
                  Pesquisar
                </button>
              </div> */}

              {/* better search bar */}
              {/* <div className="flex flex-grow justify-center items-center">
                <div className="relative rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="pesquisar..."
                  />
                </div>
              </div> */}

              {/* Desktop menu items */}
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <h1 className="mr-3 text-primary">
                  Olá, {isLoggedIn && isLoggedIn ? auth.user.name : "visitante"}
                </h1>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-1 flex-shrink-0">
                  <div>
                    <Menu.Button className="relative rounded-sm flex  text-sm focus:outline-none">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {open ? (
                        <XMarkIcon
                          className="w-11 h-9 rounded-lg bg-secondary text-white"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="w-11 h-9 rounded-lg bg-secondary text-white"
                          aria-hidden="true"
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-1500"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute items-center right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg focus:outline-none">
                      {isLoggedIn ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link to={`/account/${auth.user._id}`}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Conta
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                onClick={logout}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block cursor-pointer px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sair
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/login"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Login
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/register"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Cadastro
                              </Link>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
                {/* <p className="ml-5"><Toggle /></p> */}
              </div>
            </div>
          </div>

          {/* mobile menu items */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {/* Current: "bg-sky-50 border-sky-500 text-sky-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href="/"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-xl font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 flex-grow"
              >
                Início
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/forum"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-xl font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 flex-grow"
              >
                Forum
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/materials"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-xl font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 flex-grow"
              >
                Materiais
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

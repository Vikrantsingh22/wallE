"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Leaderboard", href: "/leaderboard", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="flex items-center space-x-2">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xl px-3 py-1 rounded-lg"
                    >
                      WallE
                    </motion.div>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-white bg-gray-800"
                            : "text-gray-300 hover:text-white hover:bg-gray-700",
                          "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <ConnectButton
                    chainStatus="icon"
                    accountStatus="address"
                    showBalance={false}
                  />
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 bg-gray-900/95 backdrop-blur-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white bg-gray-800"
                      : "text-gray-300 hover:text-white hover:bg-gray-700",
                    "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="px-3">
                  <ConnectButton
                    chainStatus="icon"
                    accountStatus="address"
                    showBalance={false}
                  />
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

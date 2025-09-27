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
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <Disclosure
        as="nav"
        className="mx-auto max-w-6xl bg-gray-900/95 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-xl shadow-black/20"
      >
        {({ open }) => (
          <>
            <div className="px-6 sm:px-8 lg:px-10">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-xl px-3 py-1 rounded-lg border border-green-500/20"
                      >
                        wallE
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
                              ? "text-white bg-green-600/20 border border-green-500/30"
                              : "text-gray-300 hover:text-white hover:bg-green-600/10 hover:border hover:border-green-500/20",
                            "rounded-md px-4 py-2.5 text-base font-medium transition-all duration-200"
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
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2.5 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-7 w-7" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-7 w-7" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-6 pb-4 pt-2 sm:px-8 bg-gray-900/95 backdrop-blur-xl rounded-b-2xl border-t border-gray-800">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-white bg-green-600/20 border border-green-500/30"
                        : "text-gray-300 hover:text-white hover:bg-green-600/10 hover:border hover:border-green-500/20",
                      "block rounded-md px-4 py-2.5 text-lg font-medium transition-all duration-200"
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
    </div>
  );
}

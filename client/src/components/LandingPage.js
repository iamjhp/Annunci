import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {
    CreateFooterNavigation, CreateHeaderTitle, CreateLoginProfile,
    CreateLogo, CreateMainContent, CreateMenuItem, CreateMobileLoginProfil,
    CreateMobileNavigation, CreateMobileLoginNavigation1, CreateTopNavigation, CreateLoginButton} from './LandingPageComponents'


export default function LandingPage() {
    return (
        <>
         <div className="min-h-full bg-gray-100">
                <Disclosure as="nav" className="sticky top-0 bg-white shadow-sm">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 justify-between">
                                    <div className="flex">
                                        <CreateLogo/>
                                        <CreateTopNavigation/>
                                    </div>
                                    <div className="hidden sm:ml-6 sm:flex sm:items-center">

                                        {/* Login */}
                                    <CreateLoginButton/>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                         <CreateLoginProfile/>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <CreateMenuItem />
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                    <div className="-mr-2 flex items-center sm:hidden">

                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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

                            <Disclosure.Panel className="sm:hidden">
                                <CreateMobileNavigation/>
                                <div className="border-t border-gray-200 pt-4 pb-3">
                                   <CreateMobileLoginProfil/>
                                   <CreateMobileLoginNavigation1/>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                {/* Body */}
                <div className="py-10 h-full">
                    <header>
                        <CreateHeaderTitle/>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                            {/* Ad Content */}
                            <CreateMainContent/>
                        </div>
                    </main>
                    {/* footer */}
                    <footer aria-labelledby="footer-heading" className="border-t border-gray-200 bg-white">
                        <h2 id="footer-heading" className="sr-only">
                            Footer
                        </h2>
                       <CreateFooterNavigation/>
                    </footer>
                </div>
            </div>
        </>
    )
}

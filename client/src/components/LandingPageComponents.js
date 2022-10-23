import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'


const logoName = 'Annunci'
const logo = 'https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png'
const title = 'Entdecke die neuesten Inserate'

///User who logged in
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const topNavigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'Inserat aufgeben', href: '#', current: false },
]

const userNavigation = [
    { name: 'Mein Profil', href: '#' },
    { name: 'Einstellungen', href: '#' },
    { name: 'Sign out', href: '#' },
]

const footerNavigation = {
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'FAQ', href: '#' },
    ],
}

/** Hook for handling the Login and Signed In button. */
function useLoginStatus(props) {
    const [userLoggedIn, setUserLoggedIn] = useState(true);//Here replace useState(false) with right attribute

    return userLoggedIn;
}
       
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export function CreateLogo() {
    return (
        <div className="flex flex-shrink-0 items-center">
        <img
            className="block h-8 w-auto lg:hidden"
                src={logo }
                alt={logoName}
        />
        <img
                className="hidden h-8 w-auto lg:block"
                src={logo }
                alt={logoName}
        />
    </div>);
}

export function CreateTopNavigation() {
    return (
        <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
            {topNavigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'no-underline border-indigo-500 text-gray-900'
                            : 'no-underline border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </a>
            ))}
        </div>);
}

export function CreateFooterNavigation() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-10">
                <div className="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16">


                    {/* Sitemap sections */}
                    <div className="col-span-6 mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:col-start-3 md:row-start-1 md:mt-0 lg:col-span-6 lg:col-start-2">
                        <div className="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8">
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                <ul role="list" className="list-none mt-6 space-y-6 pl-0">
                                    {footerNavigation.company.map((item) => (
                                        <li key={item.name} className="text-sm">
                                            <a href={item.href} className="no-underline text-gray-500 hover:text-gray-600">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                            <ul role="list" className="list-none mt-6 space-y-6 pl-0">
                                {footerNavigation.customerService.map((item) => (
                                    <li key={item.name} className="text-sm">
                                        <a href={item.href} className="no-underline  text-gray-500 hover:text-gray-600">
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-100 py-2 text-center">
                <p className="text-sm text-gray-500">&copy; 2022 {logoName}, Inc. All rights reserved.</p>
            </div>
        </div>
    );
}

export function CreateHeaderTitle() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{title}</h1>
    </div>
    );
}

/** Body space for the ads */
export function CreateMainContent() {
    return (

        ///REPLACE => Place ad here
        < div className = "px-4 py-8 sm:px-0" >
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
        </div >
      
    );
}

export function CreateLoginButton() {
    if (!useLoginStatus()) {
            return (
                <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >Login
            </button>);
    } 
}

export function CreateMenuItem() {
    return (
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
                {({ active }) => (
                    <a
                        href={item.href}
                        className={classNames(
                            active ? 'bg-gray-100' : '',
                            'no-underline block px-4 py-2 text-sm text-gray-700'
                        )}
                    >
                        {item.name}
                    </a>
                )}
            </Menu.Item>
        ))}
    </Menu.Items>);
}

export function CreateLoginProfile() {
	if (useLoginStatus()) {
        return (
            <div>
                <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                </Menu.Button>
            </div>
        );
	}   
}

export function CreateDropDownMenu() {
    if (useLoginStatus()) {
        return (
            <Menu as="div" className="relative ml-3">
                <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                    </Menu.Button>
                </div>
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
                        {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                                {({ active }) => (
                                    <a
                                        href={item.href}
                                        className={classNames(
                                            active ? 'bg-gray-100' : '',
                                            'no-underline block px-4 py-2 text-sm text-gray-700'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>);
	}
}

/** Navigation items for profile items for mobile version  */
export function CreateMobileProfileNavigation() {
	if (useLoginStatus()) {
        return (
            <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                    <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                        {item.name}
                    </Disclosure.Button>
                ))}
            </div>);
	} 
}

export function CreateMobileMenu() {
    return (
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
        </div>);
}

/** Profile view for for mobile version  */
export function CreateMobileLoggedProfile() {
    if (useLoginStatus()) {
        return (
            <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                </div>
            </div>);
    } else { return (CreateMobileLoginButton())}
    
}

function CreateMobileLoginButton() {
    return (
        <button
            type="button"
            className="inline-flex items-center rounded border border-transparent ml-3 mb-3 bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >Login
        </button>);
    
}

/** Navigation items for the mobile version */
export function CreateMobileNavigation() {
    return (
        <div className="space-y-1 pt-2 pb-3">
            {topNavigation.map((item) => (
                <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                        item.current
                            ? 'no-underline bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'no-underline border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    {item.name}
                </Disclosure.Button>
            ))}
        </div>);
}


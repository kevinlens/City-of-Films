import { Fragment, useState, useEffect } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import {
  BriefcaseIcon,
  ChatIcon,
  CogIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';

import { UserAuth } from '../store/contextStore/AuthContext';
import { useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'Jobs', href: '#', icon: BriefcaseIcon, current: false },
  { name: 'Messages', href: '#', icon: ChatIcon, current: false },
  { name: 'Team', href: '#', icon: UsersIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: true },
];
const secondaryNavigation = [
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Logout', href: '#', icon: CogIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Settings() {
  const { user } = UserAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);
  const [autoUpdateApplicantDataEnabled, setAutoUpdateApplicantDataEnabled] =
    useState(false);

  useEffect(() => {
    if (user == null) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <div className='bg-white'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-40 flex md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-14 p-1'>
                    <button
                      type='button'
                      className='h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                      <span className='sr-only'>Close sidebar</span>
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 px-4 flex items-center'>
                  <img
                    className='h-8 w-auto'
                    src='https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg'
                    alt='Easywire'
                  />
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <nav className='h-full flex flex-col'>
                    <div className='space-y-1'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-purple-50 border-purple-600 text-purple-600'
                              : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? 'text-purple-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <div className='mt-auto pt-10 space-y-1'>
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className='group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        >
                          <item.icon
                            className='mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className='md:pl-16'>
          <div className='max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0'>
            <main className='flex-1'>
              <div className='relative max-w-4xl mx-auto md:px-8 xl:px-0'>
                <div className='pt-10 pb-16'>
                  <div className='px-4 sm:px-6 md:px-0'>
                    <h1 className='text-3xl font-extrabold text-gray-900'>
                      Settings
                    </h1>
                  </div>
                  <div className='px-4 sm:px-6 md:px-0'>
                    <div className='py-6'>
                      {/* Description list with inline editing */}
                      <div className='mt-10 divide-y divide-gray-200'>
                        <div className='space-y-1'>
                          <h3 className='text-lg leading-6 font-medium text-gray-900'>
                            Profile
                          </h3>
                          <p className='max-w-2xl text-sm text-gray-500'>
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                        </div>
                        <div className='mt-6'>
                          <dl className='divide-y divide-gray-200'>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Name
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>Chelsea Hagon</span>
                                <span className='ml-4 flex-shrink-0'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Photo
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>
                                  <img
                                    className='h-8 w-8 rounded-full'
                                    src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                    alt=''
                                  />
                                </span>
                                <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                  <span
                                    className='text-gray-300'
                                    aria-hidden='true'
                                  >
                                    |
                                  </span>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Remove
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Email
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>
                                  chelsea.hagon@example.com
                                </span>
                                <span className='ml-4 flex-shrink-0'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Job title
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>
                                  Human Resources Manager
                                </span>
                                <span className='ml-4 flex-shrink-0'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className='mt-10 divide-y divide-gray-200'>
                        <div className='space-y-1'>
                          <h3 className='text-lg leading-6 font-medium text-gray-900'>
                            Account
                          </h3>
                          <p className='max-w-2xl text-sm text-gray-500'>
                            Manage how information is displayed on your account.
                          </p>
                        </div>
                        <div className='mt-6'>
                          <dl className='divide-y divide-gray-200'>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Language
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>English</span>
                                <span className='ml-4 flex-shrink-0'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'>
                              <dt className='text-sm font-medium text-gray-500'>
                                Date format
                              </dt>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <span className='flex-grow'>DD-MM-YYYY</span>
                                <span className='ml-4 flex-shrink-0 flex items-start space-x-4'>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Update
                                  </button>
                                  <span
                                    className='text-gray-300'
                                    aria-hidden='true'
                                  >
                                    |
                                  </span>
                                  <button
                                    type='button'
                                    className='bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                                  >
                                    Remove
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <Switch.Group
                              as='div'
                              className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5'
                            >
                              <Switch.Label
                                as='dt'
                                className='text-sm font-medium text-gray-500'
                                passive
                              >
                                Automatic timezone
                              </Switch.Label>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <Switch
                                  checked={automaticTimezoneEnabled}
                                  onChange={setAutomaticTimezoneEnabled}
                                  className={classNames(
                                    automaticTimezoneEnabled
                                      ? 'bg-purple-600'
                                      : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden='true'
                                    className={classNames(
                                      automaticTimezoneEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                            <Switch.Group
                              as='div'
                              className='py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200'
                            >
                              <Switch.Label
                                as='dt'
                                className='text-sm font-medium text-gray-500'
                                passive
                              >
                                Auto-update applicant data
                              </Switch.Label>
                              <dd className='mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2'>
                                <Switch
                                  checked={autoUpdateApplicantDataEnabled}
                                  onChange={setAutoUpdateApplicantDataEnabled}
                                  className={classNames(
                                    autoUpdateApplicantDataEnabled
                                      ? 'bg-purple-600'
                                      : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden='true'
                                    className={classNames(
                                      autoUpdateApplicantDataEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

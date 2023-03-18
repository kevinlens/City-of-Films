/* eslint-disable react/react-in-jsx-scope */
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { UserAuth } from '../../store/contextStore/AuthContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header(props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  window.onscroll = function () {
    if (window.pageYOffset <= 10) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  };

  const handleUserValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Disclosure as='nav'>
      {({ open }) => (
        <div
          className={`${
            props.modifiedHeader === true ? '' : 'fixed'
          } w-full z-20 bg-gray-800 transition-all duration-600 ${
            isScrolled ? 'lg:bg-opacity-80' : 'lg:bg-opacity-20'
          }`}
        >
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='relative flex items-center justify-between h-16'>
              <div className='flex items-center px-2 lg:px-0'>
                <div className='flex-shrink-0'>
                  <Link to='/'>
                    <img
                      loading='lazy'
                      className='block lg:hidden h-8 w-auto'
                      src='/assets/images/buildings.png'
                      alt='Workflow'
                    />
                  </Link>

                  {/* <div className='flex items-center text-lg uppercase font-bold text-white'> */}

                  <Link
                    className='flex -lg:hidden items-center text-lg uppercase font-bold text-white'
                    to='/'
                  >
                    Film
                    <img
                      loading='lazy'
                      className='px-3 hidden lg:block h-8 w-auto'
                      src='/assets/images/buildings.png'
                      alt='Workflow'
                    />
                    City
                  </Link>
                  {/* </div> */}
                </div>
              </div>
              <div className='flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end'>
                <div className='max-w-lg w-full lg:max-w-[26rem] xl:max-w-[28rem] lg:mr-[10%] xl:mr-[15%]'>
                  {/* USER SEARCH FOR MOVE RESULTS */}
                  <form onSubmit={handleUserValue}>
                    <label htmlFor='search' className='sr-only'>
                      Search
                    </label>

                    <div className='relative'>
                      <Link to={`/searchresults/${searchValue}`}>
                        <button
                          type='submit'
                          className='absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer'
                        >
                          <SearchIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                        </button>
                      </Link>

                      <input
                        id='search'
                        name='search'
                        className='block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm'
                        placeholder='Use Me to SEARCH! 👈'
                        type='search'
                        onChange={handleUserValue}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className='flex lg:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:block lg:ml-4'>
                <div className='flex items-center'>
                  <div className='hidden lg:block lg:ml-6'>
                    <div className='flex space-x-4 '>
                      <Link
                        to='/'
                        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                      >
                        Home
                      </Link>

                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        to='/dashboard'
                        className='bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                      >
                        Dashboard
                      </Link>
                    </div>
                  </div>

                  {user?.displayName ? (
                    <>
                      {/* Profile dropdown */}
                      <Menu
                        as='div'
                        className='ml-4 relative flex-shrink-0 z-10'
                      >
                        <div>
                          <Menu.Button className='bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                            <span className='sr-only'>Open user menu</span>
                            <img
                              className='h-8 w-8 rounded-full'
                              src={`${user.photoURL}`}
                              alt=''
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/profile`}
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Your Profile
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={`/settings`}
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to='/'
                                  href='#'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                  onClick={handleSignOut}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <Link to='/signin' className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium ml-2'>
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='lg:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
              <Link
                to={`/dashboard`}
                as='a'
                href='#'
                className='bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium'
              >
                Dashboard
              </Link>
            </div>

            {user?.displayName ? (
              <div className='pt-4 pb-3 border-t border-gray-700'>
                <div className='flex items-center px-5'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={`${user.photoURL}`}
                      alt=''
                    />
                  </div>
                  <div className='ml-3'>
                    <div className='text-base font-medium text-white'>
                      {user.displayName}
                    </div>
                    <div className='text-sm font-medium text-gray-400'>
                      {user.email}
                    </div>
                  </div>
                  <button
                    type='button'
                    className='ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  >
                    <span className='sr-only'>View notifications</span>
                    <BellIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='mt-3 px-2 space-y-1'>
                  <Link
                    to={`/profile`}
                    as='a'
                    href='#'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    Your Profile
                  </Link>
                  <Link
                    to={`/settings`}
                    as='a'
                    href='#'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    Settings
                  </Link>
                  <Link
                    to={`/`}
                    onClick={handleSignOut}
                    as='a'
                    href='#'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to='/signin'
                as='a'
                href='#'
                className='block px-3 pt-4 pb-6 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
              >
                Sign In
              </Link>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

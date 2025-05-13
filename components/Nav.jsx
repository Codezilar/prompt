"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
  const { data: session } = useSession();
  const [providers, fetchProviders]  = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false)

  useEffect(() =>{
    const setUpProvider = async () => {
      const response = await getProviders();
      fetchProviders(response)
    }
    setUpProvider();
  }, [])
  return (
    <nav className='flex-between w-full mb-16 pt-3 '>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src={'/assets/images/logo.svg'} alt='LOGO' width={30} height={30} className='object-contain' />
      </Link>
      <p className='logo_text'>NexaFOZ</p>
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href='/create-prompt' className='black_btn' >
                Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile' >
              <Image src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full' />
            </Link>

          </div>
        )  : 
          <>
            {providers &&
              Object.values(providers).map((provider) =>(
                <button type='button' className='black_btn' key={provider.name} onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))
            }
          </>
        
        }
      </div>
      {/* mobile nav */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
            <div className="flex">
              <Image onClick={(() => settoggleDropdown((prev) => !prev))} src={session?.user.image} alt='profile' width={37} height={37} className='rounded-full' />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link onClick={() => settoggleDropdown(false)} className='dropdown_link' href={'/profile'}>
                    My Profile
                  </Link>
                  <Link onClick={() => settoggleDropdown(false)} className='dropdown_link' href={'/create-prompt'}>
                    Create Prompt
                  </Link>
                  <button type='button' className='mt-5 w-full black_btn' 
                    onClick={() => {
                      settoggleDropdown(false);
                      signOut();
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) =>(
                <button type='button' className='black_btn' key={provider.name} onClick={() => signIn(provider.id)}>
                  Sign In
                </button>
              ))
            }
          </>
        )
        }

      </div>

    </nav>
  )
}

export default Nav
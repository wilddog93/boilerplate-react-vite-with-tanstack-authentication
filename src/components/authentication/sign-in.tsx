'use client'

import { useState } from 'react'
import { AuthIcon, GithubIcon, GoogleIcon } from '../icons'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex items-center justify-center flex-1 dark:bg-foreground-50 bg-background">
        <div className="max-w-md text-center">
          <AuthIcon className="w-full" />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-foreground/5">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>
          <h2 className="text-sm font-semibold mb-6 dark:text-gray-100 text-gray-600 text-center">Welcome to Our Community</h2>

          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <Button
                type="button"
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                variant='flat'
                radius='sm'
              >
                <GoogleIcon className="size-4" />
                Sign In with Google
              </Button>
            </div>

            <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
              <Button
                type="button"
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                variant='flat'
                radius='sm'
              >
                <GithubIcon className="size-5" />
                Sign In with Github
              </Button>
            </div>
          </div>
          <div className="my-4 text-sm text-center">
            <p>or with email</p>
          </div>
          <form action="#" method="POST" className="space-y-4">
            <Input
              variant='faded'
              size="sm"
              type="email"
              label="Email"
              className='w-full'
              classNames={{
                inputWrapper: "bg-white",
                input: "bg-white border-gray-700 text-gray-700",
              }}
              color='default'
              labelPlacement='inside'
              radius='sm'
            />

            <Input
              label="Password"
              labelPlacement='inside'
              variant="faded"
              size="sm"
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className='w-full'
              classNames={{
                inputWrapper: "bg-white",
                input: "bg-white border-gray-700 text-gray-700",
              }}
              color='default'
              radius='sm'
            />

            <div className='w-full flex items-center justify-between'>
              <Checkbox
                isSelected={isSelected}
                onValueChange={setIsSelected}
                color="default"
                size='md'
                classNames={{ label: "text-sm text-gray-600 font-medium" }}
              >
                Remember me
              </Checkbox>
              <div className='flex items-center gap-2'>
                <a href="#" className="text-sm text-gray-600 font-semibold hover:underline">Forgot password?</a>
              </div>
            </div>

            <Button variant="solid" size="md" type="submit" className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">Sign In</Button>
          </form>
          <div className="mt-4 text-sm text-center text-gray-600">
            <p>You don't have an account? <a href="#" className="text-sm font-semibold hover:underline">Create new account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
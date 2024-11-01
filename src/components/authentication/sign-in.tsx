'use client'

import { useMemo, useState } from 'react'
import { AuthIcon, GithubIcon, GoogleIcon } from '../icons'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/queryHooks/auth/useAuth'

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  isChecked?: boolean;
}

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  isChecked: false,
}

export const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: useMemo(() => defaultValues, [])
  })

  const { login, isLoggingIn } = useAuth()

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: FormData) => {
    login({ email: data.email, password: data.password })
  }

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
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
                  {...field}
                />
              )}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              defaultValue={defaultValues.email}
            />
            {errors.email && <span className="text-xs text-red-500">{errors.email?.message}</span>}

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
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
                  {...field}
                />
              )}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              defaultValue={defaultValues.password}
            />
            {errors.password && <span className="text-xs text-red-500">{errors.password?.message}</span>}

            <div className='w-full flex items-center justify-between'>
              <Controller
                name="isChecked"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    isSelected={field.value}
                    onValueChange={field.onChange}
                    color="default"
                    size='md'
                    className='items-start'
                    classNames={{
                      label: "text-sm text-gray-600 font-medium",
                    }}
                  >
                    Keep me signed in
                  </Checkbox>
                )}
                rules={{
                  required: "You must agree to the terms and conditions",
                }}
                defaultValue={defaultValues.isChecked}
              />
              <div className='flex items-center gap-2'>
                <a href="#" className="text-sm text-gray-600 font-semibold hover:underline">Forgot password?</a>
              </div>
            </div>

            <Button
              disabled={!isValid}
              variant="solid"
              size="md"
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-30"
              isLoading={isLoggingIn}
            >
              Sign In
            </Button>
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
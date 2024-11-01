'use client'

import { useMemo, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, Checkbox, Input } from '@nextui-org/react';
import { AuthIcon, GithubIcon, GoogleIcon } from '../icons';
import { useSession } from '@/hooks/session';

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

export const SignUp = () => {
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'all',
    defaultValues: useMemo(() => defaultValues, [])
  })

  const { register, isRegistering } = useSession()

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  const onSubmit = async (data: FormData) => {
    console.log(data, 'data-form')
    register({ email: data.email, password: data.password, name: data.name })
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
          <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
          <h1 className="text-sm font-semibold mb-6 dark:text-gray-100 text-gray-600 text-center">Join to Our Community with all time access and free </h1>
          <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
              <Button
                type="button"
                className="w-full flex justify-center items-center gap-2 text-sm text-gray-600 bg-white p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                variant='flat'
                radius='sm'
              >
                <GoogleIcon className="size-5" />
                Sign Up with Google
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
                Sign Up with Github
              </Button>
            </div>
          </div>
          <div className="mt-4 text-sm text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  variant='faded'
                  size="sm"
                  type="text"
                  label="Name"
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
                required: "Name is required",
              }}
              defaultValue={defaultValues.name}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name?.message}</span>}

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

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  label="Confirm Password"
                  labelPlacement='inside'
                  variant="faded"
                  size="sm"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibilityConfirm} aria-label="toggle confirm password visibility">
                      {isVisibleConfirm ? (
                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisibleConfirm ? "text" : "password"}
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
                required: "Confirm Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              }}
              defaultValue={defaultValues.confirmPassword}
            />
            {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword?.message}</span>}

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
                  I have read and agreed to the Terms & Conditions and Privacy Notice of the Comunnity.
                </Checkbox>
              )}
              rules={{
                required: "You must agree to the terms and conditions",
              }}
              defaultValue={defaultValues.isChecked}
            />

            <Button
              disabled={!watch("isChecked")}
              variant="solid"
              size="md"
              type="submit"
              className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-30"
              isLoading={isRegistering}
            >
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-sm  text-center">
            <p>Already have an account? <a href="#" className="font-semibold hover:underline">Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
import DefaultLayouts from "@/components/layouts";
import ErrorPage from "@/components/pages/error-page";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayouts />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/components/pages/home')).default,
        }),
      },
      {
        path: "/blogs",
        lazy: async () => ({
          Component: (await import('@/components/pages/blogs')).default,
        }),
      },
      {
        path: "/sign-in",
        lazy: async () => ({
          Component: (await import('@/components/authentication/')).SignIn,
        }),
      },
      {
        path: "/sign-up",
        lazy: async () => ({
          Component: (await import('@/components/authentication/')).SignUp,
        }),
      }
    ],
    loader: async () => ({
      Component: (await import('@/components/pages/home')).default,
    }),
  },
]);

export { router }
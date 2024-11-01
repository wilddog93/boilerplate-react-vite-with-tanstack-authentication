import DefaultLayouts from "@/components/layouts";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "../private-router";
import { PublicRoute } from "../public-router";
import { path } from "../path";
import { SignIn, SignUp } from "@/components/authentication";
import BlogPage from "@/components/pages/blogs";
import { Loader } from "@/components/loader";
import { ErrorState } from "@/components/error-state";
import { AuthProvider } from "@/provider";

const router = createBrowserRouter([
  {
    id: "root",
    path: path.ROOT_PATH,
    element: <AuthProvider>
      <DefaultLayouts />
      </AuthProvider>,
    errorElement: <ErrorState />,
    loader() {
      return <Loader />
    },
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/components/pages/home')).default,
        }),
      },
      {
        path: path.LOGIN_PATH,
        element: <PublicRoute />,
        children: [
          {
            index: true,
            lazy: async() => ({
              Component: SignIn,
            }),
          }
        ],
      },
      {
        path: path.REGISTER_PATH,
        element: <PublicRoute />,
        children: [
          {
            index: true,
            lazy: async() => ({
              Component: SignUp,
            }),
          }
        ],
      },
      {
        path: path.BLOGS_PATH,
        element: <PrivateRoute roles={['USER']} redirectTo={path.LOGIN_PATH} />,
        children: [
          {
            index: true,
            lazy: async() => ({
              Component: BlogPage,
            }),
          },
        ],
      },
    ],
  },
]);

export { router }
import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import LazyLoad from "./components/LazyLoad";

// Lazy load for pages
const ErrorPage = lazy(() => import("./pages/Error"));
const EventsPage = lazy(() => import("./pages/Events"));
const NewEventPage = lazy(() => import("./pages/NewEvent"));
const EventDetailPage = lazy(() => import("./pages/EventDetail"));
const EditEventPage = lazy(() => import("./pages/EditEvent"));
const EventsRootLayout = lazy(() => import("./pages/EventsRoot"));
const NewsletterPage = lazy(() => import("./pages/Newsletter"));
const AuthenticationPage = lazy(() => import("./pages/Authentication"));

// Lazy load for loaders
const checkAuthLoader = () =>
  import("./util/auth").then((module) => module.checkAuthLoader());

const eventsLoader = () =>
  import("./pages/Events").then((module) => module.eventsLoader());

const eventDetailLoader = (meta) =>
  import("./pages/EventDetail").then((module) =>
    module.eventDetailLoader(meta)
  );

const tokenLoader = () =>
  import("./util/auth").then((module) => module.tokenLoader());

// Lazy load for actions
const authenticationAction = (meta) =>
  import("./pages/Authentication").then((module) =>
    module.authenticationAction(meta)
  );
const deleteEventAction = (meta) =>
  import("./pages/EventDetail").then((module) =>
    module.deleteEventAction(meta)
  );

const logoutAction = () =>
  import("./pages/Logout").then((module) => module.logoutAction());

const manipulateEventAction = (meta) =>
  import("./components/EventForm").then((module) =>
    module.manipulateEventAction(meta)
  );

const newsletterAction = (meta) =>
  import("./pages/Newsletter").then((module) => module.newsletterAction(meta));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: (
          <LazyLoad>
            <EventsRootLayout />
          </LazyLoad>
        ),
        children: [
          {
            index: true,
            element: (
              <LazyLoad>
                <EventsPage />
              </LazyLoad>
            ),
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: (
                  <LazyLoad>
                    <EventDetailPage />
                  </LazyLoad>
                ),
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: (
                  <LazyLoad>
                    <EditEventPage />
                  </LazyLoad>
                ),
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: (
              <LazyLoad>
                <NewEventPage />
              </LazyLoad>
            ),
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: (
          <LazyLoad>
            <AuthenticationPage />
          </LazyLoad>
        ),
        action: authenticationAction,
      },
      {
        path: "newsletter",
        element: (
          <LazyLoad>
            <NewsletterPage />
          </LazyLoad>
        ),
        action: newsletterAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

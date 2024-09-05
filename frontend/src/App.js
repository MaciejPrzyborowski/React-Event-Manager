// Challenge / Exercise

// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EventDetailPage from "./pages/EventDetail";
import EditEventPage from "./pages/EditEvent";
import EventsRootLayout from "./pages/EventsRoot";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events/",
        element: <EventsRootLayout />,
        children: [
          { index: true, element: <EventsPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

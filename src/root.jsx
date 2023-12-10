import { Router, Route, RootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import IndexPage from "./pages/Index";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProfilePage from "./pages/Profile";
import MarketPage from "./pages/Market";
import ItemPage from "./pages/Item";
import Root from "./App";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const rootRoute = new RootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  ),
});

// Rest of your route setup remains unchanged
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const myProfileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const marketRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/market",
  component: MarketPage,
});

const itemRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/item/$itemId",
  component: ItemPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  myProfileRoute,
  marketRoute,
  itemRoute,
]);

export const router = new Router({ routeTree });

export default router;

import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "wouter";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SectionProvider } from "./contexts/SectionContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { clearFavorites } from "@/redux/favorites.slice";

// Lazy load delle pagine
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const ArticlePage = lazy(() => import("@/pages/ArticlePage"));
const Login = lazy(() => import("@/pages/Login"));
const Favorites = lazy(() => import("@/pages/Favorites"));

function Router() {
  return (
    <Switch>
      {/* Route per articoli */}
      <Route path="/article/:section/:id" component={ArticlePage} />

      {/* Login e preferiti */}
      <Route path="/login" component={Login} />
      <Route path="/favorites" component={Favorites} />

      {/* Sezione dinamica */}
      <Route path="/:section" component={Home} />

      {/* Redirect dalla root a /home */}
      <Route path="/" component={() => <Redirect to="/home" />} />

      {/* Catch-all */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Wrapper dopo che AuthProvider ha caricato lo stato
function AppInner() {
  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      dispatch(clearFavorites());
    }
  }, [currentUser, dispatch]);

  return (
    <SectionProvider>
      <TooltipProvider>
        <Toaster />
        <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
          <Router />
        </Suspense>
      </TooltipProvider>
    </SectionProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;

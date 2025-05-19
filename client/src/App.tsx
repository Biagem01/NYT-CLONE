import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ArticlePage from "@/pages/ArticlePage";
import Login from "@/pages/Login";
import Favorites from "@/pages/Favorites";
import { SectionProvider } from "./contexts/SectionContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { clearFavorites } from "@/redux/favorites.slice";


function Router() {
  return (
    <Switch>
      <Route path="/article/:section/:id" component={ArticlePage} />
      <Route path="/login" component={Login} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/" component={Home} /> {/* <- spostato in fondo */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Wrapper che si attiva solo dopo che AuthProvider ha caricato lo stato
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
        <Router />
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

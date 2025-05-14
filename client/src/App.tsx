import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ArticlePage from "@/pages/ArticlePage";
import { SectionProvider } from "./contexts/SectionContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article/:section/:id" component={ArticlePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <SectionProvider>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </SectionProvider>
  );
}

export default App;

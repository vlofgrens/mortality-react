import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateScenario from "./pages/CreateScenario";
import Results from "./pages/Results";
import History from "./pages/History";
import ModelAlignmentReport from "./pages/ModelAlignmentReport";
import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/create-scenario"
              element={
                <Layout>
                  <CreateScenario />
                </Layout>
              }
            />
            <Route
              path="/results/:id"
              element={
                <Layout>
                  <Results />
                </Layout>
              }
            />
            <Route
              path="/history"
              element={
                <Layout>
                  <History />
                </Layout>
              }
            />
            <Route
              path="/report"
              element={
                <Layout>
                  <ModelAlignmentReport />
                </Layout>
              }
            />
            <Route
              path="*"
              element={
                <Layout>
                  <NotFound />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);

export default App;

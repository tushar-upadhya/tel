
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import HomePage from "./pages/home/HomePage";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

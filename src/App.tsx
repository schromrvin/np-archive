import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Home } from "@/pages/Home";
import { HuntDashboard } from "@/features/scavenger-hunt/HuntDashboard";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Leaderboard } from "@/features/scavenger-hunt/Leaderboard";

function AppLayout() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-np-gold/30">
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-70"></div>
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent opacity-70"></div>

        <Outlet />
      </main>
      <NavBar />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/scavenger-hunt" element={<HuntDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/heritage"
            element={
              <PlaceholderPage
                title="Heritage Map"
                description="Explore the rich history of Ngee Ann Polytechnic through an interactive map of our campus landmarks."
              />
            }
          />
          <Route
            path="/memory"
            element={
              <PlaceholderPage
                title="Memory Hub"
                description="A collection of stories, photos, and memories from past and present students."
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

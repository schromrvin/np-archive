import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Home } from "@/pages/Home";
import { Timeline } from "@/pages/Timeline";
import { HuntDashboard } from "@/features/scavenger-hunt/HuntDashboard";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { Leaderboard } from "@/features/scavenger-hunt/Leaderboard";
import { MemoryHubLayout } from "@/features/memory-hub/layout/MemoryHubLayout";
import { CampusWall } from "@/features/memory-hub/pages/CampusWall";
import { StudentVoices } from "@/features/memory-hub/pages/StudentVoices";
import { TimeCapsule } from "@/features/memory-hub/pages/TimeCapsule";
import { NPWrapped } from "@/features/memory-hub/pages/NPWrapped";
import { Navigate } from "react-router-dom";
import { Chatbot } from "@/features/chatbot/Chatbot";

function AppLayout() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-np-gold/30">
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent opacity-70"></div>
        <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-100/30 via-transparent to-transparent opacity-70"></div>

        <Outlet />
      </main>
      <NavBar />
      <Chatbot />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/scavenger-hunt" element={<HuntDashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/explore"
            element={
              <PlaceholderPage
                title="Heritage Map"
                description="Explore the rich history of Ngee Ann Polytechnic through an interactive map of our campus landmarks."
              />
            }
          />
          <Route path="/memory" element={<MemoryHubLayout />}>
            <Route index element={<Navigate to="wall" replace />} />
            <Route path="wall" element={<CampusWall />} />
            <Route path="voices" element={<StudentVoices />} />
            <Route path="capsule" element={<TimeCapsule />} />
            <Route path="wrapped" element={<NPWrapped />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

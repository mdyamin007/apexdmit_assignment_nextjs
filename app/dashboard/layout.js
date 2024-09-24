import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata = {
    title: "Dashboard",
    description: "Dashboard | Apex DMIT Ltd.",
};

export default function DashboardLayout({ children }) {
    return (
        <ProtectedRoute>
            <header>
                <NavBar />
            </header>
            <main>
                {children}
            </main>
        </ProtectedRoute>

    );
}

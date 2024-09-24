import NavBar from "@/components/NavBar";

export const metadata = {
    title: "Dashboard",
    description: "Dashboard | Apex DMIT Ltd.",
};

export default function DashboardLayout({ children }) {
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                {children}
            </main>
        </>

    );
}

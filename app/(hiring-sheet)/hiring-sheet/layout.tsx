import AuthProvider from "@/components/shared/AppProvider";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Sidebar from "@/app/(dashboard)/components/shared/sidebar";
import Header from "@/app/(dashboard)/components/shared/header";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  
  
    return (
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar/>

              <div className="flex flex-col">
                <Header/>
              {children}
              </div>
              </div>
            </AuthProvider>
          </ThemeProvider>

    );
  }
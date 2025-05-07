import { Outlet } from '@tanstack/react-router';
import Footer from '@/components/ui/layout/footer.tsx';
import Header from '@/components/ui/layout/header.tsx';
import { AppSidebar } from '@/components/ui/layout/sidebar/app-sidebar.tsx';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar.tsx';

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}

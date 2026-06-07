import { PlaybookSubsidebar } from "../components/Sidebar";

interface PlaybookLayoutProps {
  children: React.ReactNode;
}

export function PlaybookLayout({ children }: PlaybookLayoutProps) {
  return (
    <div className="playbook-shell">
      <PlaybookSubsidebar />
      <div className="playbook-pages">{children}</div>
    </div>
  );
}

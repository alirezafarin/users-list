import type { ReactNode } from "react";

const PageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) => (
  <main className="min-h-screen bg-slate-50/50">
    <div className="max-w-screen-xl mx-auto px-4 py-8 md:px-6 md:py-12 lg:px-8">
      {title && (
        <header className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
        </header>
      )}
      {children}
    </div>
  </main>
);

export default PageLayout;

import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="layout">
            <header className="header container">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        <a className="logo">MOVIE<span className="text-primary">EXPLORER</span></a>
                    </Link>
                    <nav>
                        <Link href="/favorites">
                            <a className="nav-link">FAVORITES</a>
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="main container">
                {children}
            </main>
            <footer className="footer text-center p-4">
                &copy; {new Date().getFullYear()} Movie Explorer
            </footer>
            <style jsx>{`
        .header {
          padding-top: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #333;
        }
        .logo {
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -1px;
        }
        .text-primary {
          color: var(--primary-color);
        }
        .nav-link {
          font-weight: 600;
          margin-left: 1rem;
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: white;
        }
        .main {
          min-height: 80vh;
          padding-top: 2rem;
        }
        .footer {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }
      `}</style>
        </div>
    );
}

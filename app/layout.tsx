import type { Metadata } from 'next'
// TypeScript may complain about side-effect CSS imports in some setups.
// @ts-ignore
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
    title: 'Sandhyarani Jena | Full Stack Developer',
    description:
        'Full Stack Developer with 2+ years of experience building scalable, real-time web applications using Next.js, React.js, Node.js, FastAPI, MySQL, and modern cloud technologies. Based in Bengaluru.',
    keywords: [
        'Sandhyarani Jena',
        'Full Stack Developer',
        'Next.js',
        'React',
        'Node.js',
        'FastAPI',
        'Bengaluru',
        'Portfolio',
    ],
    authors: [{ name: 'Sandhyarani Jena' }],
    openGraph: {
        title: 'Sandhyarani Jena | Full Stack Developer',
        description:
            'Full Stack Developer with 2+ years experience in Next.js, React, Node.js, FastAPI, and cloud technologies.',
        type: 'website',
        locale: 'en_IN',
        siteName: 'Sandhyarani Jena Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sandhyarani Jena | Full Stack Developer',
        description:
            'Full Stack Developer building scalable real-time web applications.',
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                <ThemeProvider>
                    <div className="flex min-h-screen">
                        <Sidebar />
                        {/* Main content shifts right on desktop to clear the fixed sidebar */}
                        <div className="flex-1 lg:ml-72 min-w-0">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}

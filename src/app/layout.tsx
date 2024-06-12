import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "note.sh",
  description: "Note-taking made easy: intelligent, seamless, and effortlessly organized.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black font-mono`}>
        <nav className="flex flex-row justify-center bg-gray-900 p-6">             
          <div className="flex flex-row justify-start text-white w-3/4">
            <a href="/" className="font-semibold text-2xl text">note<span className="text-green-400">.sh</span></a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

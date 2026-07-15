import "./globals.css";
import Link from "next/link";
import { Star } from "lucide-react";
export const metadata = { title: "Five Star and Why", description: "Real ratings. Better reasons." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><header><Link className="brand" href="/"><Star fill="currentColor"/> Five Star <i>and Why</i></Link><nav><Link href="/discover">Discover</Link><Link href="/blog">Author’s Blog</Link><Link href="/submit">Write a Review</Link><Link className="pill" href="/login">Sign In</Link></nav></header><main>{children}</main><footer><div className="brand"><Star fill="currentColor"/> Five Star <i>and Why</i></div><p>Real ratings. Better reasons.</p><p>© 2026 Five Star and Why</p></footer></body></html> }

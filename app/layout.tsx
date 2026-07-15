import "./globals.css";
import "./extras.css";
import { Star } from "lucide-react";
import Header from "@/components/Header";
export const metadata = { title: "Five Star and Why", description: "Real ratings. Better reasons." };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><Header/><main>{children}</main><footer><div className="brand"><Star fill="currentColor"/> Five Star <i>and Why</i></div><p>Real ratings. Better reasons.</p><p>© 2026 Five Star and Why</p></footer></body></html> }

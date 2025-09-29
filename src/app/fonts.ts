/* import { Cairo } from 'next/font/google'

export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  display: 'swap',
  variable: '--font-cairo',
})
 */
import { Comfortaa as NextComfortaa } from "next/font/google";

export const comfortaa = NextComfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Light → Bold
  variable: "--font-comfortaa",
});
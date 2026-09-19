import { Fraunces, Inter } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${fraunces.variable} ${inter.variable}`}>
      <Head>
        <title>Prompt2Fit — Describe a vibe, wear the outfit</title>
        <meta
          name="description"
          content="Prompt2Fit turns a sentence about your mood, occasion, or aesthetic into a complete AI-styled outfit — full breakdown, palette, and lookbook visual."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

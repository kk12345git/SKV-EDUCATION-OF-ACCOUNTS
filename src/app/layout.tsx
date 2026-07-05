import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SKV Education of Accounts | Best Accounting Institute in Chennai",
  description: "Become Job-Ready in Accounting & Finance. Master Tally Prime, GST, SAP, Income Tax Returns, ESI & PF, Advanced Excel, and TDS/TCS with practical training in Perambur, Chennai. 100% Placement Support and Flexible Batch Timings.",
  keywords: [
    "Accounting classes Chennai",
    "Best Tally Institute Chennai",
    "GST Training Chennai",
    "SAP Training Chennai",
    "Advanced Excel Chennai",
    "Income Tax Course Chennai",
    "Accounting Institute Perambur",
    "Tally Prime with GST Perambur",
    "SAP FICO training Chennai"
  ],
  authors: [{ name: "SKV Education of Accounts" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://skveduaccounts.com",
    title: "SKV Education of Accounts | Best Accounting Institute in Chennai",
    description: "Master Tally Prime, GST, SAP, and Advanced Excel with hands-on practice. Get certified and secure high-paying placements.",
    siteName: "SKV Education of Accounts",
    images: [
      {
        url: "/SKV LOGO.jpeg",
        width: 800,
        height: 800,
        alt: "SKV Education of Accounts Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKV Education of Accounts | Chennai's Premium Accounting Academy",
    description: "Practical accounting courses including Tally, GST, SAP, and Income Tax with placement support.",
    images: ["/SKV LOGO.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SKV Education of Accounts",
    "description": "Premium accounting training institute specializing in Tally Prime, GST, SAP, and practical taxation classes.",
    "image": "/SKV LOGO.jpeg",
    "url": "https://skveduaccounts.com",
    "telephone": "+919384662036",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "11/2 (5/2/A) Patel Road, Perambur",
      "addressLocality": "Chennai",
      "postalCode": "600011",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.1118,
      "longitude": 80.2372
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919384662036",
        "contactType": "admissions",
        "areaServed": "IN",
        "availableLanguage": ["English", "Tamil"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+917010813836",
        "contactType": "student support",
        "areaServed": "IN",
        "availableLanguage": ["English", "Tamil"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/skv_education_of_accounts"
    ]
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

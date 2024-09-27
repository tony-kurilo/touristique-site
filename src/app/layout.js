import "./globals.css";


export const metadata = {
    title: "Touristique",
    description: "tourism agency site",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body

        >
        {children}
        </body>
        </html>
    );
}

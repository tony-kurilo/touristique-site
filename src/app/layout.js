import "./styles/globals.css";


export const metadata = {
    title: "Touristique",
    description: "tourism agency site",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/icons/earth.png"/>
        </head>
        <body

        >
        {children}
        </body>
        </html>
    );
}

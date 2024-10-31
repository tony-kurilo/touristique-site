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
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap" rel="stylesheet"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
            <link href="https://fonts.googleapis.com/css2?family=Geologica:wght@100..900&display=swap"
                  rel="stylesheet"/>
        </head>
        <body

        >
        {children}
        </body>
        </html>
    );
}

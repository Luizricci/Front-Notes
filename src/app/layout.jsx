import "../styles/globals.css";


export const metadata = {
  title: "Web Notes",
  icons: {
    icon: "/favicon.ico",
  },
  description: "Anotações rápidas na web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body >
        {children}
      </body>
    </html>
  );
}






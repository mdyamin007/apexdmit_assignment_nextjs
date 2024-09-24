import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "Sign in",
  description: "Sign in | Apex DMIT Ltd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

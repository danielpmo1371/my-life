import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Brain Context Canvas",
  description: "A space to mirror your mind and keep a context to revisit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}

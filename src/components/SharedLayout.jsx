import { Suspense } from "react";
import Navigation from "./Navigation/Navigation";

export default function SharedLayout({ children }) {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
    </div>
  );
}

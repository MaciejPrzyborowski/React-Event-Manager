import { Suspense } from "react";

const LazyLoad = ({ children }) => {
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {children}
    </Suspense>
  );
};

export default LazyLoad;

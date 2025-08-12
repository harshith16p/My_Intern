import HeaderWrapper from "@/components/HeaderWrapper/HeaderWrapper";
import { Suspense } from "react";
import Loader from "@/components/Cards/Loader";

const Layout = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderWrapper/>
      </Suspense>
      {children}
    </>
  );
};

export default Layout;

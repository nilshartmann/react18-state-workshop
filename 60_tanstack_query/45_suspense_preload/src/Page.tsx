import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";

export default function Page() {
  return (
    <div className="App">
      <AppHeader />
      <div className="Page">
        <div className="Main">
          <Suspense fallback={<h1>Fallback!</h1>}>
            <Outlet />
          </Suspense>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

import Navbar from "./comps/navbar/navbar.jsx";
import Header from "./comps/header/header.jsx";
import Footer from "./comps/footer/footer.jsx";
import Introsec from "./comps/introsec/introsec.jsx";
import CategorySec from "./comps/categorySec/categorySec.jsx";
import Frontpage from "./pages/frontpage.jsx";
import Employees from "./pages/employees.jsx";
import Cart from "./pages/cart.jsx";
import Contact from "./pages/contact.jsx";
import DishPage from "./pages/dishPage.jsx";
import Backoffice from "./pages/backoffice.jsx";
import { BrowserRouter, useRoutes } from "react-router-dom";
import ErrorBox from "./comps/errorBox/errorBox.jsx";
import LoadingSpinner from "./comps/spinner/spinner.jsx";

export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Frontpage />,
    },
    {
      path: "/employees",
      element: <Employees />,
    },
    {
      path: "/basket",
      element: <Cart />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path: "/backoffice",
      element: <Backoffice />,
    },
  ]);

  return (
    <>
      <Navbar />
      <main>{routes}</main>
      <Footer />
    </>
  );
}

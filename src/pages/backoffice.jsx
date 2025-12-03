import { useState } from "react";
import BackofficeEmployees from "../comps/backofficeComps/BackofficeEmployees/Employees";
import BackofficeNav from "../comps/backofficeComps/backofficeNav/backofficeNav";

export default function Backoffice({}) {


  const dontSHow = useState(true);

  const [page, setPage] = useState(<BackofficeEmployees></BackofficeEmployees>)

  return <>
  {
    dontSHow ? "" :
    <>
  <BackofficeNav setter={setPage} />
  {page}
  </>
  }
  </>;
}

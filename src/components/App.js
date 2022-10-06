import "./../css/app.css";
import Menu from "./Menu.js";
import Add from "./Add.js";
import Home from "./Home.js";
import Statement from "./Statement.js";
import { useState } from "react";
import { useEffect } from "react";

const user = "Kuba";

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [body, setBody] = useState(false);
  const [statement, setStatement] = useState(false);

  function choosePage(page) {
    switch (page) {
      case "lern":
        setBody(<p>Uczenie się - w przygotowaniu</p>);
        break;
      case "add":
        setBody(<Add choosePage={choosePage} openStatement={openStatement} />);
        break;
      case "set":
        setBody(<p>Wybieranie talii - w przygotowaniu</p>);
        break;
      case "edit":
        setBody(<p>Edytowanie talii - w przygotowaniu</p>);
        break;
      default:
        setBody(<Home user={user} />);
    }
    setOpenMenu(false);
  }

  function menuTrigger() {
    setOpenMenu((prev) => !prev);
  }

  function openStatement(data) {
    setStatement(data);
  }

  function closeStatus() {
    setStatement(false);
  }

  if (!body) choosePage();

  useEffect(() => {
    console.log("odświerzamy statement");
  }, [statement]);

  return (
    <div className="App">
      <Menu
        user={user}
        menuTrigger={menuTrigger}
        choosePage={choosePage}
        openMenu={openMenu}
      />
      {body}
      {statement !== false && (
        <Statement
          text={statement.text}
          status={statement.status}
          closeStatus={closeStatus}
        />
      )}
    </div>
  );
}

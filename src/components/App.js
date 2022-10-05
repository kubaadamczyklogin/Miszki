import "./../css/app.css";
import Menu from "./Menu.js";
import Add from "./Add.js";
import { useState } from "react";

export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const [body, setBody] = useState(<Add choosePage={choosePage} />);

  function choosePage(page) {
    switch (page) {
      case "lern":
        setBody(<p>Uczenie się - w przygotowaniu</p>);
        break;
      case "add":
        setBody(<Add choosePage={choosePage} />);
        break;
      case "set":
        setBody(<p>Wybieranie talii - w przygotowaniu</p>);
        break;
      case "edit":
        setBody(<p>Edytowanie talii - w przygotowaniu</p>);
        break;
      default:
        setBody(<p>Strona główna</p>);
    }
    setOpenMenu(false);
  }

  function menuTrigger() {
    setOpenMenu((prev) => !prev);
  }

  return (
    <div className="App">
      <Menu
        menuTrigger={menuTrigger}
        choosePage={choosePage}
        openMenu={openMenu}
      />
      {body}
    </div>
  );
}

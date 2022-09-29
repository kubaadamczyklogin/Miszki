export default function Menu(props) {
  return (
    <div>
      <div onClick={props.menuTrigger}>{props.openMenu ? "✕" : "☰"}</div>
      {props.openMenu ? <MenuList choosePage={props.choosePage} /> : null}
    </div>
  );
}

function MenuList(props) {
  return (
    <nav>
      <div
        onClick={() => {
          props.choosePage("lern");
        }}
      >
        Ucz się
      </div>
      <div
        onClick={() => {
          props.choosePage("add");
        }}
      >
        Dodaj talię
      </div>
      <div
        onClick={() => {
          props.choosePage("set");
        }}
      >
        Wybierz talie
      </div>
      <div
        onClick={() => {
          props.choosePage("edit");
        }}
      >
        Edytuj talie
      </div>
    </nav>
  );
}

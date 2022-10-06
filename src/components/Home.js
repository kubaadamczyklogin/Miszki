export default function Home(props) {
  const { user } = props;

  return (
    <div className="home">
      <div className="cont">
        <h1>Miszki</h1>
        <p className="greetings">Witaj {user}!</p>
      </div>
    </div>
  );
}

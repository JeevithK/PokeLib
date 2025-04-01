export default function Header({ handletogglemenu }) {
  return (
    <header>
      <button className="open-nav-button" onClick={handletogglemenu}>
        <i className="fa-solid fa-bars"></i>
      </button>
      <h1 className="text-gradient">Pokedex</h1>
    </header>
  );
}

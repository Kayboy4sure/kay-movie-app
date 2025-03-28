import hero from "/src/assets/hero.png"

export default function Header() {
  return (
    <header>
      <img src={hero} alt="Hero Banner" />
      <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
    </header>
  )
}
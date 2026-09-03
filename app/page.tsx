import HeroFilm from "./HeroFilm";
import ArcadeGame from "./ArcadeGame";

function AgeBadge() {
  return <span className="age-badge" aria-label="Film classifications U, PG, 12, 15 and 18"><b>U</b><b>PG</b><b>12</b><b>15</b><b>18</b></span>;
}

export default function Home() {
  return <main id="top" className="house-site">
    <header className="masthead">
      <a className="brand" href="#top"><AgeBadge /><span>AMERICAN BEAR</span></a>
      <nav className="token-nav" aria-label="American Bear house navigation"><a href="#living-room">LIVING ROOM</a><a href="#kitchen">KITCHEN</a><a href="#bedroom">BEDROOM</a><a href="#token">TOKEN: TBA</a></nav>
    </header>

    <section className="living-room" id="living-room" aria-label="The American Bear living room">
      <HeroFilm />
      <aside className="meme-sticker tv-meme" aria-label="American Bear watching television"><i aria-hidden="true"/></aside>
      <p className="room-marker">01 / THE LIVING ROOM</p>
    </section>

    <section className="house-room bedroom-room" id="bedroom" aria-label="The American Bear bedroom">
      <div className="bedroom-copy"><p>03 / THE BEDROOM</p><h2>THE WALL<br/>OF FAME.</h2><span>POSTERS, VHS TAPES AND THE AMERICAN NIGHT SHIFT.</span></div>
      <figure className="bedroom-feature"><img src="/art/america-rushmore-satoshi-restored-v1.png" alt="American Bear King Kong and Mount Rushmore collage" /></figure>
      <div className="poster-wall postcard-wall" aria-label="American Bear postcard wall">
        <figure className="wall-poster postcard postcard-hollywood"><img src="/art/america-movie-collage-cowboy-removed-final.png" alt="Hollywood movie collage" /></figure>
        <figure className="wall-poster postcard postcard-sports"><img src="/art/america-sports-postcard-v1.png" alt="American sports collage" /></figure>
        <figure className="wall-poster postcard postcard-tv"><img src="/art/america-tv-postcard-v1.png" alt="American television collage" /></figure>
        <figure className="wall-poster postcard postcard-politics"><img src="/art/america-politics-postcard-v1.png" alt="American political history collage" /></figure>
        <figure className="wall-poster postcard postcard-music"><img src="/art/america-music-postcard-v1.png" alt="American music collage" /></figure>
      </div>
      <div className="meme-gap-stickers" aria-label="American Bear meme notes"><aside className="meme-sticker meme-sport"><i aria-hidden="true"/></aside><aside className="meme-sticker meme-tv"><i aria-hidden="true"/></aside><aside className="meme-sticker meme-music"><i aria-hidden="true"/></aside></div>
    </section>

    <section className="house-room kitchen-room" id="kitchen" aria-label="The American Bear kitchen">
      <div className="room-copy"><p>04 / THE KITCHEN</p><h1>MEMES<br/>ON THE MENU.</h1><span>THE $BEAR DEN IS OPEN. COFFEE, CULTURE AND A LITTLE CHAOS.</span><a href="#token">TOKEN STATUS →</a></div>
      <figure className="room-art kitchen-art"><img src="/art/america-modern-meme-class-v31.png" alt="American Bear meme culture café scene" /></figure>
      <div className="kitchen-details" aria-hidden="true"><i/><i/><i/><b>HOT COFFEE · COLD TAKES</b></div>
      <aside className="meme-sticker kitchen-meme" aria-label="American Bear with food"><i aria-hidden="true"/></aside>
    </section>

    <section className="house-room arcade-room" aria-label="The American Bear arcade room">
      <div className="arcade-copy"><p>05 / THE ARCADE</p><h2>INSERT<br/>COIN.</h2></div>
      <ArcadeGame artwork="/art/american-bear-arcade-v8.png" />
    </section>

    <section className="token" id="token"><p>AMERICAN BEAR MEME TOKEN</p><h2>$BEAR</h2><strong>COMING SOON</strong><span>Contract address: TBA. Ignore unofficial links.</span><aside className="meme-sticker token-meme" aria-label="American Bear meme"><i aria-hidden="true"/></aside><div className="token-status"><b>TICKER <em>$BEAR</em></b><b>COMMUNITY <em>THE DEN</em></b><b>STATUS <em>NOT LIVE</em></b></div></section>
    <footer><div className="brand"><AgeBadge/><span>AMERICAN BEAR</span></div><p>SATIRE WITH AFFECTION. © 2026</p></footer>
  </main>;
}

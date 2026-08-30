import HeroFilm from "./HeroFilm";
import ArcadeGame from "./ArcadeGame";

function AgeBadge() {
  return <span className="age-badge" aria-label="Film classifications U, PG, 12, 15 and 18"><b>U</b><b>PG</b><b>12</b><b>15</b><b>18</b></span>;
}

const chapters = [
  { id:"movies", era:"1776 — NOW", kicker:"POWER · MONEY · MYTH · MEDIA · FREEDOM · FAME", title:"THIS IS AMERICA.", src:"/art/america-movie-collage-v1.png", alt:"A panoramic American movie universe with action, science fiction, adventure, horror and western characters", note:"Movies, sport, television, late nights, money and mythology now share one American backlot.", rating:"11/10", badge:"FINAL FINAL CUT" },
  { id:"power", era:"CAMPAIGN SEASON · EVERY SEASON", kicker:"POLITICS · MEDIA · PATRIOTISM · MOONSHOT", title:"EVERY PROMISE COMES WITH FIREWORKS.", src:"/art/america-politics-moonshot-v6.png", alt:"American political figures, media spectacle and an Apollo moon landing displayed as presidential history", note:"Campaign buses, flag pins, television maps and an Apollo moonshot preserved as presidential history. Broad satire; no party gets the good lighting.", rating:"8.4", badge:"FREEDOM MAXIMUM" },
  { id:"streets", era:"1980s — 1990s", kicker:"STREETS · RADIO · AUTHORITY · PROTEST", title:"THE CAMERA NEVER BLINKS.", src:"/art/bear-police-lights-40.webp", alt:"American Bear and musicians in a satirical police scene", note:"A harder, louder chapter about music, policing and who gets to control the story. Satire stays aimed at institutions and media spectacle.", rating:"8.8", badge:"LIVE FROM AMERICA" },
  { id:"now", era:"RIGHT NOW · UPDATED CONSTANTLY", kicker:"CRYPTO · MEMES · MEDIA · BOXING · MOBILITY", title:"THE FUTURE HAS A SALES PITCH.", src:"/art/america-modern-meme-class-v31.png", alt:"A coffee-bar scene with meme characters, seated patrons and four men under arrest beside police", note:"Coffee, crypto and meme culture share one bar: everyone settles in with a latte or frappé, while four arrested men remain exactly where the police left them.", rating:"9.0", badge:"APP OF THE FREE" },
];

const biggestShowImages = [
  { src:"/art/america-money-guns-reframed-v1.png", alt:"A sharply detailed American panorama of Hollywood, Mount Rushmore, stacks of dollar bills and a collection of firearms", label:"THIS IS AMERICA" },
  { src:"/art/america-movie-collage-v1.png", alt:"A panoramic American movie universe with action, science fiction, adventure, horror and western characters", label:"THE MOVIES" },
  { src:"/art/america-sports-bear-supporter-v11.png", alt:"American Bear among boxing, football, baseball, basketball, NASCAR, athletics and rodeo", label:"THE SPORTS" },
  { src:"/art/america-tv-icons-muppets-v1.png", alt:"Classic American television icons including Knight Rider, the A-Team, Alf, Kermit and Miss Piggy", label:"LIVING COLOR" },
  { src:"/art/america-crime-cinema-chuck-v1.png", alt:"American crime cinema and action television scene", label:"LATE NIGHT" },
];

export default function Home() {
  return <main id="top">
    <header className="masthead"><a className="brand" href="#top"><AgeBadge /><span>AMERICAN BEAR</span></a><nav className="token-nav" aria-label="American Bear navigation"><a href="#token">TOKEN</a><a href="#memes">MEMES</a><a href="#chapters">LORE</a><a href="#token">CONTRACT: TBA</a></nav></header>
    <HeroFilm />
    <section className="meme-launch" id="memes" aria-label="American Bear meme token">
      <div className="meme-launch-copy"><p>THE ALL-AMERICAN MEME TOKEN</p><h1>$BEAR</h1><strong>BUILT FOR THE TIMELINE.</strong><span>NO ROADMAP THEATRE. JUST MEMES, CULTURE AND THE DEN.</span></div>
      <div className="meme-launch-actions"><a href="#token">TOKEN STATUS</a><a href="#chapters">ENTER THE LORE</a></div>
      <div className="meme-ticker" aria-label="American Bear ticker"><span>$BEAR</span><b>MEMES OVER MEETINGS</b><span>COMMUNITY FIRST</span><b>CONTRACT: TBA</b><span>AMERICAN BEAR</span></div>
    </section>

    <nav className="timeline" aria-label="American chapters">{chapters.map((chapter,index)=><a href={`#${chapter.id}`} key={chapter.id}><b>{String(index+1).padStart(2,"0")}</b><span>{chapter.id}</span></a>)}</nav>

    <section className="chapters">
      {chapters.map((chapter,index)=><article className={`chapter chapter-${index}`} id={chapter.id} key={chapter.id}>
        <header className="chapter-head"><div><small>{chapter.era}</small><p>{chapter.kicker}</p></div><h2>{chapter.title}</h2></header>
        {chapter.id === "movies" ? <div className="show-gallery" aria-label="The Biggest Show on Earth gallery">
          <div className="show-triptych">{biggestShowImages.map((image)=><figure className="show-polaroid" key={image.src}><img src={image.src} alt={image.alt}/><figcaption>{image.label}</figcaption></figure>)}</div>
        </div> : <figure className="chapter-art">
          <div className="vhs-case">
            <span className="vhs-sticker vhs-sticker-left">VHS</span>
            <span className="vhs-sticker vhs-sticker-right">HI-FI</span>
            <span className="vhs-title">AMERICAN BEAR · {chapter.id.toUpperCase()} · HOME VIDEO</span>
            <div className={`vhs-window ${""}`}><img src={chapter.src} alt={chapter.alt}/></div>
            <span className="vhs-spool vhs-spool-left" aria-hidden="true"/><span className="vhs-spool vhs-spool-right" aria-hidden="true"/>
            <span className="chapter-number">{String(index+1).padStart(2,"0")}</span>
          </div>
        </figure>}
        <div className="chapter-foot"><details><summary>OPEN THE FILE +</summary><p>{chapter.note}</p></details><div className="rating"><span>BEAR’S TOTALLY OBJECTIVE RATING</span><b>{chapter.rating}</b></div><strong className="badge">★ {chapter.badge}</strong></div>
        {chapter.id==="appetite"&&<ArcadeGame artwork="/art/american-bear-arcade-v8.png"/>}
      </article>)}
      <ArcadeGame artwork="/art/american-bear-arcade-v8.png" />
    </section>

    <section className="token" id="token"><p>AMERICAN BEAR MEME TOKEN</p><h2>$BEAR</h2><strong>COMING SOON</strong><span>Contract address: TBA. Ignore unofficial links.</span><div className="token-status"><b>TICKER <em>$BEAR</em></b><b>COMMUNITY <em>THE DEN</em></b><b>STATUS <em>NOT LIVE</em></b></div></section>
    <footer><div className="brand"><AgeBadge/><span>AMERICAN BEAR</span></div><p>SATIRE WITH AFFECTION. © 2026</p></footer>
  </main>;
}

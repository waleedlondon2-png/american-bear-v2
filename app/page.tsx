import HeroFilm from "./HeroFilm";
import ArcadeGame from "./ArcadeGame";

function AgeBadge() {
  return <span className="age-badge" aria-label="Film classifications U, PG, 12, 15 and 18"><b>U</b><b>PG</b><b>12</b><b>15</b><b>18</b></span>;
}

const chapters = [
  { id:"movies", era:"1930s — NOW", kicker:"HOLLYWOOD · TELEVISION · HORROR · ACTION", title:"THE BIGGEST SHOW ON EARTH.", src:"/art/america-movie-collage-v1.png", alt:"A panoramic American movie universe with action, science fiction, adventure, horror and western characters", note:"Cowboys, aliens, slashers, fighter jets and impossible heroes share one backlot. The Bear has read the script and requested a larger trailer.", rating:"11/10", badge:"FINAL FINAL CUT" },
  { id:"sport", era:"ROUND ONE — OVERTIME", kicker:"BOXING · FOOTBALL · BASEBALL · BASKETBALL · NASCAR · ATHLETICS · RODEO", title:"EVERY GAME DECIDES CIVILISATION.", src:"/art/america-sports-bear-supporter-v11.png", alt:"Muhammad Ali front and center with young 1980s Mike Tyson beside Don King in the background, while American Bear cheers among baseball, football, basketball, NASCAR, athletics, bulls, cowboys and a small hockey scene", note:"Ali commands center ring while a young Tyson stands beside Don King in the background. NASCAR charges forward, sprinters own the track, bulls and cowboys fill the rodeo—and American Bear cheers from the front row.", rating:"9.9", badge:"NATIONAL OVERREACTION" },
  { id:"screen", era:"PRIME TIME — LATE NIGHT", kicker:"KITT · THE A-TEAM · MIAMI · CRIME", title:"AMERICA, NOW IN LIVING COLOR.", src:"/art/america-tv-icons-muppets-v1.png", companion:"/art/america-crime-cinema-chuck-v1.png", alt:"Knight Rider, the A-Team, Alf, Kermit, Miss Piggy, Chuck Norris and Miami crime-cinema scenes paired together", note:"Two intact scenes, one broadcast nation: heroic machines on one channel, dangerous white suits on another, and the Bear somehow has a producer credit.", rating:"9.3", badge:"REMOTE CONTROL" },
  { id:"power", era:"CAMPAIGN SEASON · EVERY SEASON", kicker:"POLITICS · MEDIA · PATRIOTISM · MOONSHOT", title:"EVERY PROMISE COMES WITH FIREWORKS.", src:"/art/america-politics-moonshot-v6.png", alt:"American political figures, media spectacle and an Apollo moon landing displayed as presidential history", note:"Campaign buses, flag pins, television maps and an Apollo moonshot preserved as presidential history. Broad satire; no party gets the good lighting.", rating:"8.4", badge:"FREEDOM MAXIMUM" },
  { id:"streets", era:"1980s — 1990s", kicker:"STREETS · RADIO · AUTHORITY · PROTEST", title:"THE CAMERA NEVER BLINKS.", src:"/art/bear-police-lights-40.webp", alt:"American Bear and musicians in a satirical police scene", note:"A harder, louder chapter about music, policing and who gets to control the story. Satire stays aimed at institutions and media spectacle.", rating:"8.8", badge:"LIVE FROM AMERICA" },
  { id:"now", era:"RIGHT NOW · UPDATED CONSTANTLY", kicker:"CRYPTO · MEMES · MEDIA · BOXING · MOBILITY", title:"THE FUTURE HAS A SALES PITCH.", src:"/art/america-modern-meme-class-v31.png", alt:"A coffee-bar scene with meme characters, seated patrons and four men under arrest beside police", note:"Coffee, crypto and meme culture share one bar: everyone settles in with a latte or frappé, while four arrested men remain exactly where the police left them.", rating:"9.0", badge:"APP OF THE FREE" },
];

export default function Home() {
  return <main id="top">
    <header className="masthead"><a className="brand" href="#top"><AgeBadge /><span>AMERICAN BEAR</span></a><a href="#chapters">ENTER THE SHOW ↓</a></header>
    <HeroFilm />

    <section className="money-break" id="chapters" aria-label="This is America: money and mythology">
      <header className="money-title"><div><small>1776 — NOW</small><p>POWER · MONEY · MYTH · MEDIA · FREEDOM · FAME</p></div><h1>THIS IS AMERICA.</h1></header>
      <img src="/art/america-money-guns-rushmore-jets-v9.png" alt="A sharply detailed American panorama of Hollywood, Mount Rushmore, stacks of dollar bills and a collection of firearms"/>
    </section>

    <nav className="timeline" aria-label="American chapters">{chapters.map((chapter,index)=><a href={`#${chapter.id}`} key={chapter.id}><b>{String(index+1).padStart(2,"0")}</b><span>{chapter.id}</span></a>)}</nav>

    <section className="chapters">
      {chapters.map((chapter,index)=><article className={`chapter chapter-${index}`} id={chapter.id} key={chapter.id}>
        <header className="chapter-head"><div><small>{chapter.era}</small><p>{chapter.kicker}</p></div><h2>{chapter.title}</h2></header>
        <figure className={chapter.companion ? "chapter-art paired" : "chapter-art"}>
          <div className="vhs-case">
            <span className="vhs-sticker vhs-sticker-left">VHS</span>
            <span className="vhs-sticker vhs-sticker-right">HI-FI</span>
            <span className="vhs-title">AMERICAN BEAR · {chapter.id.toUpperCase()} · HOME VIDEO</span>
            {chapter.companion ? <div className="vhs-window postcard-pair">
              <div className="postcard postcard-left"><img src={chapter.src} alt={chapter.alt}/></div>
              <div className="postcard postcard-right"><img src={chapter.companion} alt="Scarface and Eddie Murphy in their original crime-cinema composition"/></div>
            </div> : <div className="vhs-window"><img src={chapter.src} alt={chapter.alt}/></div>}
            <span className="vhs-spool vhs-spool-left" aria-hidden="true"/><span className="vhs-spool vhs-spool-right" aria-hidden="true"/>
            <span className="chapter-number">{String(index+1).padStart(2,"0")}</span>
          </div>
        </figure>
        <div className="chapter-foot"><details><summary>OPEN THE FILE +</summary><p>{chapter.note}</p></details><div className="rating"><span>BEAR’S TOTALLY OBJECTIVE RATING</span><b>{chapter.rating}</b></div><strong className="badge">★ {chapter.badge}</strong></div>
        {chapter.id==="appetite"&&<ArcadeGame artwork="/art/american-bear-arcade-v8.png"/>}
      </article>)}
    </section>

    <section className="token" id="token"><p>AMERICAN BEAR</p><h2>$BEAR</h2><strong>COMING SOON</strong><span>No contract yet. Ignore unofficial links.</span></section>
    <footer><div className="brand"><AgeBadge/><span>AMERICAN BEAR</span></div><p>SATIRE WITH AFFECTION. © 2026</p></footer>
  </main>;
}

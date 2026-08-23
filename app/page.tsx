import HeroFilm from "./HeroFilm";
import ArcadeGame from "./ArcadeGame";

function AgeBadge() {
  return <span className="age-badge" aria-label="Film classifications U, PG, 12, 15 and 18"><b>U</b><b>PG</b><b>12</b><b>15</b><b>18</b></span>;
}

const chapters = [
  { id:"movies", era:"1930s — NOW", kicker:"HOLLYWOOD · TELEVISION · SPORT · HORROR · ACTION", title:"THE BIGGEST SHOW ON EARTH.", src:"/art/america-movies-pixel.png", alt:"A rough pixel-art American movie universe", note:"Movies, sports and prime-time television all share one giant American backlot. The Bear has read the script and requested a larger trailer.", rating:"11/10", badge:"FINAL FINAL CUT" },
  { id:"power", era:"CAMPAIGN SEASON · EVERY SEASON", kicker:"POLITICS · MEDIA · PATRIOTISM · MOONSHOT", title:"EVERY PROMISE COMES WITH FIREWORKS.", src:"/art/america-politics-pixel.png", alt:"Rough pixel art of American political media and a moonshot", note:"Campaign buses, flag pins, television maps and an Apollo moonshot preserved as presidential history. Broad satire; no party gets the good lighting.", rating:"8.4", badge:"FREEDOM MAXIMUM" },
  { id:"streets", era:"1980s — 1990s", kicker:"STREETS · RADIO · AUTHORITY · PROTEST", title:"THE CAMERA NEVER BLINKS.", src:"/art/america-police-pixel.png", alt:"Rough pixel art of an American Bear police scene with flashing lights", note:"A harder, louder chapter about music, policing and who gets to control the story. Satire stays aimed at institutions and media spectacle.", rating:"8.8", badge:"LIVE FROM AMERICA" },
  { id:"now", era:"RIGHT NOW · UPDATED CONSTANTLY", kicker:"CRYPTO · MEMES · MEDIA · BOXING · MOBILITY", title:"THE FUTURE HAS A SALES PITCH.", src:"/art/america-modern-pixel.png", alt:"Rough pixel art of a coffee, crypto and meme-culture bar", note:"Coffee, crypto and meme culture share one bar: everyone settles in with a latte or frappé, while four arrested men remain exactly where the police left them.", rating:"9.0", badge:"APP OF THE FREE" },
];

const biggestShowImages = [
  { src:"/art/america-movies-pixel.png", alt:"A rough pixel-art American movie universe", label:"THE MOVIES" },
  { src:"/art/america-sports-pixel.png", alt:"Rough pixel art of American Bear sports scenes", label:"THE SPORTS" },
  { src:"/art/america-tv-pixel.png", alt:"Rough pixel art of classic American television icons", label:"LIVING COLOR" },
  { src:"/art/america-crime-pixel.png", alt:"Rough pixel art of American late-night crime cinema", label:"LATE NIGHT" },
];

export default function Home() {
  return <main id="top">
    <header className="masthead"><a className="brand" href="#top"><AgeBadge /><span>AMERICAN BEAR</span></a><a href="#chapters">ENTER THE SHOW ↓</a></header>
    <HeroFilm />

    <section className="money-break" id="chapters" aria-label="This is America: money and mythology">
      <header className="money-title"><div><small>1776 — NOW</small><p>POWER · MONEY · MYTH · MEDIA · FREEDOM · FAME</p></div><h1>THIS IS AMERICA.</h1></header>
      <div className="logo-stamped-art"><img src="/art/america-money-pixel.png" alt="A rough pixel-art American panorama of Hollywood, Mount Rushmore, money and cinematic spectacle"/><span>AMERICAN<br/>BEAR</span></div>
    </section>

    <section className="bear-photo-scatter" aria-label="American Bear picture cards">
      <figure><img src="/art/american-bear-hiphop-pixel.png" alt="American Bear in hip-hop style"/><figcaption>AMERICAN<br/>BEAR</figcaption></figure>
      <figure><img src="/art/american-bear-nightlife-pixel.png" alt="American Bear at a night-time marquee with two women"/><figcaption>AMERICAN<br/>BEAR</figcaption></figure>
    </section>

    <nav className="timeline" aria-label="American chapters">{chapters.map((chapter,index)=><a href={`#${chapter.id}`} key={chapter.id}><b>{String(index+1).padStart(2,"0")}</b><span>{chapter.id}</span></a>)}</nav>

    <section className="chapters">
      {chapters.map((chapter,index)=><article className={`chapter chapter-${index}`} id={chapter.id} key={chapter.id}>
        <header className="chapter-head"><div><small>{chapter.era}</small><p>{chapter.kicker}</p></div><h2>{chapter.title}</h2><span className={`bear-cameo bear-cameo-${index + 1}`} aria-hidden="true"/></header>
        {chapter.id === "movies" ? <div className="show-polaroids" aria-label="The Biggest Show on Earth gallery">
          {biggestShowImages.map((image)=><figure className="show-polaroid" key={image.src}><img src={image.src} alt={image.alt}/><figcaption>{image.label}</figcaption><span className="picture-logo">AMERICAN<br/>BEAR</span></figure>)}
        </div> : <figure className="chapter-art">
          <div className="vhs-case">
            <span className="vhs-sticker vhs-sticker-left">VHS</span>
            <span className="vhs-sticker vhs-sticker-right">HI-FI</span>
            <span className="vhs-title">AMERICAN BEAR · {chapter.id.toUpperCase()} · HOME VIDEO</span>
            <div className={`vhs-window ${chapter.id === "streets" ? "police-flash" : ""}`}><img src={chapter.src} alt={chapter.alt}/><span className="picture-logo">AMERICAN<br/>BEAR</span></div>
            <span className="vhs-spool vhs-spool-left" aria-hidden="true"/><span className="vhs-spool vhs-spool-right" aria-hidden="true"/>
            <span className="chapter-number">{String(index+1).padStart(2,"0")}</span>
          </div>
        </figure>}
        <div className="chapter-foot"><details><summary>OPEN THE FILE +</summary><p>{chapter.note}</p></details><div className="rating"><span>BEAR’S TOTALLY OBJECTIVE RATING</span><b>{chapter.rating}</b></div><strong className="badge">★ {chapter.badge}</strong></div>
        {chapter.id==="appetite"&&<ArcadeGame artwork="/art/american-bear-arcade-v8.png"/>}
      </article>)}
      <ArcadeGame artwork="/art/american-bear-arcade-v8.png" />
    </section>

    <section className="token" id="token"><p>AMERICAN BEAR</p><h2>$BEAR</h2><strong>COMING SOON</strong><span>No contract yet. Ignore unofficial links.</span></section>
    <footer><div className="brand"><AgeBadge/><span>AMERICAN BEAR</span></div><p>SATIRE WITH AFFECTION. © 2026</p></footer>
  </main>;
}

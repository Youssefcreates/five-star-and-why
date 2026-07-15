import Link from "next/link";
const categories=["All","Places","Movies","Food","Books","Travel","Products"];
export default function Discover(){return <section className="section"><div className="eyebrow">Find your next favorite</div><h2>Discover reviews</h2><div className="filters">{categories.map(x=><Link href={`/discover?category=${x.toLowerCase()}`} key={x}>{x}</Link>)}</div><div className="notice">Community reviews will appear here as members publish them. The database connection is included in this project.</div></section>}

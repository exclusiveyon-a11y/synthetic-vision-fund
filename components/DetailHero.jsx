export default function DetailHero({ title, episode, image }) {
    return (
      <section className="svf-detail-top">
  
        <p className="svf-detail-episode">{episode}</p>
  
        <h1 className="svf-detail-title" style={{ textDecoration: "none" }}>
          {title}
        </h1>
  
        <div className="svf-detail-hero">
          <img src={image} alt={title} />
        </div>
  
      </section>
    );
  }
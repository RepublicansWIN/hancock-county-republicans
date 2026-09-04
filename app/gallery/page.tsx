import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import gallery from '@/content/gallery.json';
import { publicAsset } from '@/lib/public-asset';

export default function GalleryPage() {
  const photos = gallery.photos.filter(photo => photo.active && photo.image);

  return <main><SiteHeader /><PageHeader eyebrow={gallery.eyebrow} title={gallery.headline} intro={gallery.introduction} />
    <section className="gallery-section">
      {photos.length === 0 ? <div className="public-empty"><h2>Photos are coming soon.</h2><p>Committee and community photographs will be posted here.</p></div> : <div className="gallery-grid">
        {photos.map((photo, index) => <figure key={`${photo.image}-${index}`} className={index === 0 ? 'gallery-featured' : ''}>
          <img src={publicAsset(photo.image)} alt={photo.altText || photo.caption || photo.title} />
          <figcaption><div><h2>{photo.title}</h2>{photo.caption && <p>{photo.caption}</p>}</div>{(photo.date || photo.credit) && <small>{[photo.date, photo.credit].filter(Boolean).join(' · ')}</small>}</figcaption>
        </figure>)}
      </div>}
    </section><SiteFooter /></main>;
}

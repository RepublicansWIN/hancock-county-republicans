import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import candidates from '@/content/candidates.json';
import { publicAsset } from '@/lib/public-asset';

export default function CandidatesPage() {
  const active = candidates.filter(candidate => candidate.active);
  return <main><SiteHeader /><PageHeader eyebrow="Meet the candidates" title="Get to know the people stepping forward." intro="Candidate information is maintained by the committee. Use the editing dashboard to add profiles, update priorities, change photos, reorder candidates, or hide past races." />
    <section className="candidate-section"><div className="candidate-grid">{active.map((candidate, index) => <article className={`candidate-card ${candidate.featured ? 'featured' : ''}`} key={`${candidate.name}-${index}`}>
      <div className="candidate-photo">{candidate.photo ? <img src={publicAsset(candidate.photo)} alt={candidate.name} /> : <><span>Photo</span><small>Candidate portrait placeholder</small></>}</div>
      <div className="candidate-copy"><p className="candidate-office">{candidate.office} · {candidate.district}</p><h2>{candidate.name}</h2><p className="candidate-summary">{candidate.summary}</p><p>{candidate.bio}</p>
        <h3>Priorities</h3><ul>{candidate.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul>
        {candidate.endorsement && <blockquote>“{candidate.endorsement}”</blockquote>}
        <div className="candidate-links">{candidate.website && <a href={candidate.website}>Website</a>}{candidate.email && <a href={`mailto:${candidate.email}`}>Email</a>}{candidate.facebook && <a href={candidate.facebook}>Facebook</a>}</div>
      </div></article>)}</div>
      <aside className="editor-note"><strong>Designed for easy updates</strong><p>Each candidate has editable fields for their portrait, race, district, introduction, biography, priorities, quotation, website, email, Facebook link, featured status, and active status.</p></aside>
    </section><SiteFooter /></main>;
}

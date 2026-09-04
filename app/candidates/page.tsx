import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import candidates from '@/content/candidates.json';
import { publicAsset } from '@/lib/public-asset';

export default function CandidatesPage() {
  const active = candidates.filter(candidate => candidate.active);
  return <main><SiteHeader /><PageHeader eyebrow="Meet the candidates" title="Republican candidates serving our communities." intro="Candidate profiles and campaign information for races affecting Hancock County." />
    <section className="candidate-section">{active.length === 0 ? <div className="public-empty"><h2>Candidate information is coming soon.</h2><p>Profiles will be posted here as candidates and races are announced.</p></div> : <div className="candidate-grid">{active.map((candidate, index) => <article className={`candidate-card ${candidate.featured ? 'featured' : ''}`} key={`${candidate.name}-${index}`}>
      <div className="candidate-photo">{candidate.photo ? <img src={publicAsset(candidate.photo)} alt={candidate.name} /> : <><span>Photo</span><small>Candidate portrait placeholder</small></>}</div>
      <div className="candidate-copy"><p className="candidate-office">{candidate.office} · {candidate.district}</p><h2>{candidate.name}</h2><p className="candidate-summary">{candidate.summary}</p><p>{candidate.bio}</p>
        <h3>Priorities</h3><ul>{candidate.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul>
        {candidate.endorsement && <blockquote>“{candidate.endorsement}”</blockquote>}
        <div className="candidate-links">{candidate.website && <a href={candidate.website}>Website</a>}{candidate.email && <a href={`mailto:${candidate.email}`}>Email</a>}{candidate.facebook && <a href={candidate.facebook}>Facebook</a>}</div>
      </div></article>)}</div>}
    </section><SiteFooter /></main>;
}

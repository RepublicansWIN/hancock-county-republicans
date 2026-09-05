import Image from 'next/image';
import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import candidates from '@/content/candidates.json';
import districts from '@/content/districts.json';
import { publicAsset } from '@/lib/public-asset';

function initials(name: string) {
  return name.split(/\s+/).filter(part => !['Jr.', 'II'].includes(part)).slice(0, 2).map(part => part[0]).join('');
}

function CandidateCard({ candidate }: { candidate: (typeof candidates)[number] }) {
  const district = districts.find(item => item.office === candidate.office && item.district === candidate.district);
  const coverage = district?.hancockCommunities.join(' · ') ?? 'All Hancock County communities';
  const officeLabel = candidate.district === 'Statewide' ? candidate.office : `${candidate.office} · District ${candidate.district}`;

  return <article className="candidate-profile republican">
    <div className="candidate-portrait">{candidate.photo ? <Image src={publicAsset(candidate.photo)} alt={`${candidate.name} profile portrait`} width={144} height={176} style={{ objectPosition: candidate.photoPosition }} /> : <span className="photo-needed" aria-label={`Profile photo needed for ${candidate.name}`}><b aria-hidden="true">{initials(candidate.name)}</b><small>Photo coming soon</small></span>}</div>
    <div className="candidate-profile-copy">
      <p className="candidate-office">{officeLabel}</p>
      <h3>{candidate.name}</h3>
      <p className="candidate-residence">Republican · {candidate.residence}</p>
      {candidate.bio && <p className="candidate-bio">{candidate.bio}</p>}
      <div className="candidate-coverage"><strong>Hancock County coverage</strong><p>{coverage}</p>{district && district.otherCommunities.length > 0 && <small>Also: {district.otherCommunities.join(' · ')}</small>}</div>
      <div className="candidate-links">{candidate.website && <a href={candidate.website} target="_blank" rel="noopener noreferrer">Candidate webpage</a>}{candidate.email && <a href={`mailto:${candidate.email}`}>Email</a>}{candidate.facebook && <a href={candidate.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}</div>
    </div>
  </article>;
}

export default function CandidatesPage() {
  const active = candidates.filter(candidate => candidate.active && candidate.party === 'Republican');
  const groups = [
    { title: 'Statewide & federal', intro: 'Governor, United States Senate, and Maine’s 2nd Congressional District.', offices: ['Governor', 'U.S. Senate', 'U.S. House'] },
    { title: 'Maine Senate', intro: 'Republican nominees in state Senate districts that contain Hancock County communities.', offices: ['Maine Senate'] },
    { title: 'Maine House', intro: 'Republican nominees in state House districts that contain Hancock County communities.', offices: ['Maine House'] },
  ];

  return <main><SiteHeader /><PageHeader eyebrow="2026 general election" title="Republican candidates for Hancock County." intro="Meet the Republican nominees on Hancock County ballots—from governor and Congress to the Maine Legislature." />
    <section className="candidate-section">
      <div className="candidate-groups">
        {groups.map(group => {
          const groupCandidates = active.filter(candidate => group.offices.includes(candidate.office));
          return <section className="candidate-group" key={group.title}>
            <header><div><p className="eyebrow">2026 Republican nominees</p><h2>{group.title}</h2></div><p>{group.intro}</p></header>
            <div className="candidate-compact-grid">{groupCandidates.map(candidate => <CandidateCard candidate={candidate} key={candidate.name} />)}</div>
          </section>;
        })}
      </div>
    </section><SiteFooter /></main>;
}

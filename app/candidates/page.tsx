import Image from 'next/image';
import { PageHeader, SiteFooter, SiteHeader } from '@/components/site-shell';
import candidates from '@/content/candidates.json';
import districts from '@/content/districts.json';
import { publicAsset } from '@/lib/public-asset';

const candidateListUrl = 'https://www1.maine.gov/sos/elections-voting/upcoming-elections';
const senateDistrictsUrl = 'https://legislature.maine.gov/statutes/21-a/title21-Asec1203-C.html';
const houseDistrictsUrl = 'https://legislature.maine.gov/statutes/21-a/title21-Asec1204-C.html';

function initials(name: string) {
  return name.split(/\s+/).filter(part => !['Jr.', 'II'].includes(part)).slice(0, 2).map(part => part[0]).join('');
}

export default function CandidatesPage() {
  const active = candidates.filter(candidate => candidate.active);

  return <main><SiteHeader /><PageHeader eyebrow="2026 general election" title="Candidates in Hancock County’s legislative districts." intro="Every Maine Senate and Maine House race whose district includes part of Hancock County, with the communities in each district." />
    <section className="candidate-section">
      <div className="candidate-note">
        <strong>About this list</strong>
        <p>Republican candidates are highlighted. All other candidates in the Maine Secretary of State’s current general-election list are included for completeness. Candidate information was reviewed September 3, 2026.</p>
        <div><a href={candidateListUrl} target="_blank" rel="noopener noreferrer">Official candidate list</a><a href={senateDistrictsUrl} target="_blank" rel="noopener noreferrer">Senate districts</a><a href={houseDistrictsUrl} target="_blank" rel="noopener noreferrer">House districts</a></div>
      </div>

      <div className="district-list">
        {districts.map(district => {
          const districtCandidates = active
            .filter(candidate => candidate.office === district.office && candidate.district === district.district)
            .sort((a, b) => Number(b.party === 'Republican') - Number(a.party === 'Republican'));
          const hasRepublican = districtCandidates.some(candidate => candidate.party === 'Republican');

          return <article className="district-card" key={`${district.office}-${district.district}`}>
            <header className="district-heading">
              <div><p className="candidate-office">{district.office}</p><h2>District {district.district}</h2></div>
              <span>{districtCandidates.length} {districtCandidates.length === 1 ? 'candidate' : 'candidates'}</span>
            </header>

            {!hasRepublican && <p className="no-republican">No Republican candidate appears in the current official general-election list.</p>}

            <div className="district-candidates">
              {districtCandidates.map(candidate => <section className={`candidate-profile ${candidate.party === 'Republican' ? 'republican' : ''}`} key={candidate.name}>
                <div className="candidate-portrait">{candidate.photo ? <Image src={publicAsset(candidate.photo)} alt={candidate.name} width={168} height={208} /> : <span aria-hidden="true">{initials(candidate.name)}</span>}</div>
                <div>
                  <p className={`party-badge party-${candidate.party.toLowerCase()}`}>{candidate.party}</p>
                  <h3>{candidate.name}</h3>
                  <p className="candidate-residence">Residence: {candidate.residence}</p>
                  {candidate.bio && <p>{candidate.bio}</p>}
                  {candidate.priorities.length > 0 && <ul>{candidate.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul>}
                  <div className="candidate-links">{candidate.website && <a href={candidate.website} target="_blank" rel="noopener noreferrer">Campaign website</a>}{candidate.email && <a href={`mailto:${candidate.email}`}>Email</a>}{candidate.facebook && <a href={candidate.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}</div>
                </div>
              </section>)}
            </div>

            <div className="district-communities">
              <div><h3>Hancock County communities</h3><p>{district.hancockCommunities.join(' · ')}</p></div>
              {district.otherCommunities.length > 0 && <div><h3>Elsewhere in the district</h3><p>{district.otherCommunities.join(' · ')}</p></div>}
            </div>
          </article>;
        })}
      </div>
    </section><SiteFooter /></main>;
}

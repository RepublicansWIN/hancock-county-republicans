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
  const active = candidates.filter(candidate => candidate.active && candidate.party === 'Republican');
  const republicanDistricts = districts.filter(district => active.some(candidate => candidate.office === district.office && candidate.district === district.district));

  return <main><SiteHeader /><PageHeader eyebrow="2026 general election" title="Republican candidates for Hancock County." intro="Meet the Republican candidates running in Maine Senate and Maine House districts that include Hancock County communities." />
    <section className="candidate-section">
      <div className="candidate-note">
        <strong>About this list</strong>
        <p>This page lists Republican candidates in legislative districts that include part of Hancock County. Candidate information was reviewed September 3, 2026.</p>
        <div><a href={candidateListUrl} target="_blank" rel="noopener noreferrer">Official candidate list</a><a href={senateDistrictsUrl} target="_blank" rel="noopener noreferrer">Senate districts</a><a href={houseDistrictsUrl} target="_blank" rel="noopener noreferrer">House districts</a></div>
      </div>

      <div className="district-list">
        {republicanDistricts.map(district => {
          const districtCandidates = active
            .filter(candidate => candidate.office === district.office && candidate.district === district.district);

          return <article className="district-card" key={`${district.office}-${district.district}`}>
            <header className="district-heading">
              <div><p className="candidate-office">{district.office}</p><h2>District {district.district}</h2></div>
              <span>{districtCandidates.length} {districtCandidates.length === 1 ? 'candidate' : 'candidates'}</span>
            </header>

            <div className="district-candidates">
              {districtCandidates.map(candidate => <section className="candidate-profile republican" key={candidate.name}>
                <div className="candidate-portrait">{candidate.photo ? <Image src={publicAsset(candidate.photo)} alt={`${candidate.name} profile portrait`} width={168} height={208} /> : <span className="photo-needed" aria-label={`Profile photo needed for ${candidate.name}`}><b aria-hidden="true">{initials(candidate.name)}</b><small>Photo coming soon</small></span>}</div>
                <div>
                  <p className={`party-badge party-${candidate.party.toLowerCase()}`}>{candidate.party}</p>
                  <h3>{candidate.name}</h3>
                  <p className="candidate-residence">Residence: {candidate.residence}</p>
                  {candidate.bio && <p>{candidate.bio}</p>}
                  {candidate.priorities.length > 0 && <ul>{candidate.priorities.map(priority => <li key={priority}>{priority}</li>)}</ul>}
                  <div className="candidate-links">{candidate.website && <a href={candidate.website} target="_blank" rel="noopener noreferrer">Visit candidate webpage</a>}{candidate.email && <a href={`mailto:${candidate.email}`}>Email</a>}{candidate.facebook && <a href={candidate.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}</div>
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

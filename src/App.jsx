import { useMemo, useState } from 'react';
import {
  Activity, ArrowRight, BriefcaseBusiness, Check, CheckCircle2, ChevronDown,
  CircleHelp, GraduationCap, Languages, MapPin, Search, ShieldCheck, Sparkles,
  Target, TrendingUp, UserRound, Wrench, BookOpen, Clock3
} from 'lucide-react';

const jobs = [
  { id: 1, title: 'Quality Inspection Trainee', sector: 'Glass & Manufacturing', location: 'Firozabad', type: 'Demo role profile', skills: ['quality inspection', 'attention to detail', 'basic computer'], level: 'Entry level', source: 'Illustrative role profile', salary: 'Not verified' },
  { id: 2, title: 'Computer Operator', sector: 'Office Operations', location: 'Firozabad', type: 'Demo role profile', skills: ['MS Excel', 'typing', 'data entry'], level: 'Entry level', source: 'Illustrative role profile', salary: 'Not verified' },
  { id: 3, title: 'Warehouse Assistant', sector: 'Logistics', location: 'Firozabad', type: 'Demo role profile', skills: ['inventory', 'basic computer', 'communication'], level: 'Entry level', source: 'Illustrative role profile', salary: 'Not verified' },
  { id: 4, title: 'Junior Web Developer', sector: 'IT & Digital', location: 'Firozabad / Remote', type: 'Demo role profile', skills: ['HTML', 'CSS', 'JavaScript', 'Git'], level: 'Beginner', source: 'Illustrative role profile', salary: 'Not verified' },
  { id: 5, title: 'Production Assistant', sector: 'Glass & Manufacturing', location: 'Firozabad', type: 'Demo role profile', skills: ['safety', 'quality inspection', 'teamwork'], level: 'Entry level', source: 'Illustrative role profile', salary: 'Not verified' }
];

const skillOptions = ['HTML', 'CSS', 'JavaScript', 'Git', 'MS Excel', 'typing', 'data entry', 'basic computer', 'quality inspection', 'inventory', 'communication', 'safety', 'attention to detail'];
const copy = {
  en: {
    eyebrow: 'LOCAL TALENT • REAL-WORLD SKILLS', title: 'Turn your skills into your next opportunity.',
    subtitle: 'Understand what you know, discover what roles ask for, and build a practical learning path — starting in Firozabad.',
    location: 'Pilot district', dashboard: 'Your skill dashboard', profile: 'Build your profile',
    profileHint: 'Select the skills you already have. Your matches update instantly.',
    skills: 'Your current skills', search: 'Search skills…', matches: 'Role matches',
    matchesHint: 'An explainable match based on the skills selected above.',
    roadmap: 'Your skill gap roadmap', roadmapHint: 'Focus on the missing skills that appear most often in your best matches.',
    allRoles: 'Explore role profiles', demo: 'DEMO DATA', demoNote: 'These are illustrative role profiles, not verified live vacancies. No employer, salary, or opening is being claimed.',
    match: 'match', missing: 'Skills to build', have: 'Skills you have', learn: 'Suggested next steps',
    step1: 'Choose one target role', step2: 'Learn one missing skill', step3: 'Build a small proof of work',
    noMatch: 'Select a few skills to see role matches.', source: 'Data transparency',
    sourceText: 'This prototype currently uses illustrative role profiles only. Live listings will be added only when a source URL and verification date can be shown.',
    footer: 'Built for the Firozabad pilot • Prototype v1.0'
  },
  hi: {
    eyebrow: 'स्थानीय प्रतिभा • काम आने वाले कौशल', title: 'अपने कौशल को अगले करियर अवसर में बदलें।',
    subtitle: 'जानें कि आपको क्या आता है, नौकरियों में कौन-से कौशल माँगे जाते हैं और सीखने का सही रास्ता बनाएँ — शुरुआत फिरोजाबाद से।',
    location: 'पायलट जिला', dashboard: 'आपका स्किल डैशबोर्ड', profile: 'अपनी प्रोफाइल बनाएँ',
    profileHint: 'जो कौशल आपको पहले से आते हैं, उन्हें चुनें। आपके मैच तुरंत अपडेट होंगे।',
    skills: 'आपके मौजूदा कौशल', search: 'कौशल खोजें…', matches: 'आपके लिए रोल मैच',
    matchesHint: 'आपके चुने हुए कौशल के आधार पर मैच का कारण भी दिखाया गया है।',
    roadmap: 'स्किल गैप रोडमैप', roadmapHint: 'अपने अच्छे मैच में बार-बार आने वाले नए कौशल पहले सीखें।',
    allRoles: 'सभी रोल प्रोफाइल देखें', demo: 'डेमो डेटा', demoNote: 'ये केवल उदाहरण के लिए रोल प्रोफाइल हैं, सत्यापित लाइव वैकेंसी नहीं। किसी कंपनी, वेतन या ओपनिंग का दावा नहीं किया जा रहा है।',
    match: 'मैच', missing: 'सीखने वाले कौशल', have: 'आपके पास हैं', learn: 'अगले कदम',
    step1: 'एक लक्ष्य रोल चुनें', step2: 'एक नया कौशल सीखें', step3: 'छोटा प्रोजेक्ट बनाकर दिखाएँ',
    noMatch: 'रोल मैच देखने के लिए कुछ कौशल चुनें।', source: 'डेटा की पारदर्शिता',
    sourceText: 'इस प्रोटोटाइप में अभी केवल उदाहरण वाले रोल हैं। लाइव लिस्टिंग तभी जोड़ी जाएगी जब उसका सोर्स URL और सत्यापन की तारीख दिखाई जा सके।',
    footer: 'फिरोजाबाद पायलट के लिए • प्रोटोटाइप v1.0'
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const [selected, setSelected] = useState(['HTML', 'CSS', 'JavaScript', 'MS Excel', 'basic computer']);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('dashboard');
  const t = copy[lang];

  const ranked = useMemo(() => jobs.map(job => {
    const matched = job.skills.filter(skill => selected.includes(skill));
    const missing = job.skills.filter(skill => !selected.includes(skill));
    return { ...job, matched, missing, score: Math.round((matched.length / job.skills.length) * 100) };
  }).sort((a, b) => b.score - a.score), [selected]);

  const topMatches = ranked.filter(job => job.score > 0).slice(0, 3);
  const skillCounts = {};
  topMatches.forEach(job => job.missing.forEach(skill => { skillCounts[skill] = (skillCounts[skill] || 0) + 1; }));
  const priorities = Object.entries(skillCounts).sort((a,b) => b[1]-a[1]).slice(0,4).map(([skill]) => skill);

  const toggleSkill = skill => setSelected(current => current.includes(skill) ? current.filter(s => s !== skill) : [...current, skill]);
  const filteredSkills = skillOptions.filter(skill => skill.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={() => setActive('dashboard')}><span className="brand-mark"><Target size={20}/></span><span>Skill<span className="brand-accent">Bridge</span><small>SKILL TO JOB MAPPER</small></span></a>
        <nav className="nav-links">
          <button className={active === 'dashboard' ? 'nav-active' : ''} onClick={() => setActive('dashboard')}>{t.dashboard}</button>
          <button className={active === 'roles' ? 'nav-active' : ''} onClick={() => setActive('roles')}>{t.allRoles}</button>
        </nav>
        <div className="top-actions"><span className="district"><MapPin size={14}/> Firozabad, UP</span><button className="lang-btn" onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}><Languages size={16}/>{lang === 'en' ? 'हिन्दी' : 'English'}</button></div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy"><div className="eyebrow"><span className="pulse"></span>{t.eyebrow}</div><h1>{t.title}</h1><p>{t.subtitle}</p><div className="hero-meta"><span><MapPin size={15}/> {t.location}: <b>Firozabad, Uttar Pradesh</b></span><span><ShieldCheck size={15}/> Explainable matching</span></div></div>
          <div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-icon"><Target size={54}/></div><div className="float-card float-one"><TrendingUp size={17}/><span><b>Skill-first</b><small>Career discovery</small></span></div><div className="float-card float-two"><CheckCircle2 size={17}/><span><b>Clear next steps</b><small>Learn with direction</small></span></div></div>
        </section>

        <div className="section-heading"><div><div className="eyebrow muted">01 / {t.dashboard}</div><h2>{t.profile}</h2><p>{t.profileHint}</p></div><div className="profile-chip"><UserRound size={17}/><span>Candidate profile</span><ChevronDown size={15}/></div></div>

        <section className="workspace">
          <div className="panel skill-panel">
            <div className="panel-title"><div className="panel-icon purple"><Wrench size={18}/></div><div><h3>{t.skills}</h3><p>{selected.length} skills selected</p></div></div>
            <div className="searchbox"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t.search}/></div>
            <div className="skill-list">{filteredSkills.map(skill => <button key={skill} onClick={() => toggleSkill(skill)} className={selected.includes(skill) ? 'skill selected' : 'skill'}>{selected.includes(skill) ? <Check size={14}/> : <span className="empty-check"/>}{skill}</button>)}</div>
            <div className="panel-foot"><CircleHelp size={15}/> You can change your skills anytime.</div>
          </div>
          <div className="panel insight-panel">
            <div className="panel-title"><div className="panel-icon green"><Activity size={18}/></div><div><h3>{t.matches}</h3><p>{t.matchesHint}</p></div></div>
            {topMatches.length ? <div className="match-list">{topMatches.map(job => <article className="match-card" key={job.id}><div className="match-top"><div><span className="sector">{job.sector}</span><h4>{job.title}</h4><small><MapPin size={12}/> {job.location}</small></div><div className="score"><strong>{job.score}%</strong><small>{t.match}</small></div></div><div className="progress"><span style={{width: job.score + '%'}}></span></div><div className="match-details"><span><CheckCircle2 size={13}/> {job.matched.length} {t.have}</span><span><BookOpen size={13}/> {job.missing.length} {t.missing}</span></div></article>)}</div> : <div className="empty-state"><BriefcaseBusiness size={28}/><p>{t.noMatch}</p></div>}
          </div>
        </section>

        <section className="lower-grid">
          <div className="panel roadmap-panel"><div className="panel-title"><div className="panel-icon orange"><GraduationCap size={19}/></div><div><h3>{t.roadmap}</h3><p>{t.roadmapHint}</p></div></div><div className="priority-list">{(priorities.length ? priorities : ['communication','Git','quality inspection']).map((skill,i) => <div className="priority" key={skill}><span className="priority-number">0{i+1}</span><div><b>{skill}</b><small>{t.learn}</small></div><span className="priority-tag">{i === 0 ? 'High priority' : 'Next'}</span></div>)}</div><div className="steps"><div><CheckCircle2 size={16}/>{t.step1}</div><div><BookOpen size={16}/>{t.step2}</div><div><Sparkles size={16}/>{t.step3}</div></div></div>
          <div className="panel transparency-panel"><div className="panel-title"><div className="panel-icon blue"><ShieldCheck size={18}/></div><div><h3>{t.source}</h3><p>Trust before recommendations</p></div></div><p className="transparency-copy">{t.sourceText}</p><div className="source-row"><span className="source-dot"></span><div><b>Role profile dataset</b><small>Illustrative • Not a live vacancy feed</small></div><span className="status-demo">{t.demo}</span></div><div className="source-row"><span className="source-dot grey"></span><div><b>Government & private sources</b><small>Integration planned after source validation</small></div><span className="status-pending">Planned</span></div></div>
        </section>

        <section className="roles-section"><div className="section-heading compact"><div><div className="eyebrow muted">02 / CAREER EXPLORER</div><h2>{t.allRoles}</h2><p>{t.demoNote}</p></div><span className="demo-badge"><span></span>{t.demo}</span></div><div className="role-grid">{ranked.map(job => <article className="role-card" key={job.id}><div className="role-card-top"><span className="role-icon"><BriefcaseBusiness size={18}/></span><span className="role-demo">{t.demo}</span></div><span className="sector">{job.sector}</span><h3>{job.title}</h3><p><MapPin size={13}/>{job.location} <span>•</span> {job.level}</p><div className="role-skills">{job.skills.map(s => <span className={selected.includes(s) ? 'skill-tag known' : 'skill-tag'} key={s}>{s}</span>)}</div><div className="role-bottom"><span>{job.source}</span><b>{job.score}% {t.match}</b></div></article>)}</div></section>
      </main>
      <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Target size={17}/></span><span>Skill<span className="brand-accent">Bridge</span></span></a><span>{t.footer}</span><span className="footer-note"><ShieldCheck size={14}/> No fabricated vacancy claims</span></footer>
    </div>
  );
}

export default App;
(() => {
'use strict';
const data = {"staffing": {"label": "Staffing & recruiting", "profile": "Alex Morgan \u00b7 Java consultant", "skills": ["Java", "Spring Boot", "SQL"], "role": "Java application developer", "required": ["Java", "Spring Framework", "SQL", "AWS"], "matches": ["Java", "Spring Boot \u2192 Spring Framework", "SQL"], "gap": "AWS experience needs review", "next": "Review the missing requirement before deciding whether to request Right-to-Represent.", "access": "Compare staffing plans", "href": "pricing.html"}, "education": {"label": "Education & placement", "profile": "Taylor Chen \u00b7 Data student", "skills": ["Python", "SQL", "Tableau"], "role": "Junior data analyst", "required": ["Python", "SQL", "Tableau", "Statistics"], "matches": ["Python", "SQL", "Tableau"], "gap": "Statistics evidence needs review", "next": "Discuss the gap with an advisor and update the profile before applying.", "access": "Discuss education access", "href": "demo.html?use_case=education"}, "individual": {"label": "My job search", "profile": "Jordan Lee \u00b7 Software developer", "skills": ["JavaScript", "React", "HTML"], "role": "Frontend developer", "required": ["JavaScript", "React", "HTML", "Accessibility"], "matches": ["JavaScript", "React", "HTML"], "gap": "Accessibility experience needs review", "next": "Add relevant project evidence and review your application shortlist.", "access": "Discuss individual access", "href": "demo.html?use_case=individual"}};
const params = new URLSearchParams(location.search);
let choice = Object.hasOwn(data, params.get('use_case')) ? params.get('use_case') : 'staffing';
const get = id => document.getElementById(id);
const event = (name) => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({event:name,use_case:choice}); };
function render() {
 const item=data[choice];
 document.querySelectorAll('[data-use-case]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.useCase===choice)));
 if (!get('sample-profile')) return;
 for (const [id,value] of Object.entries({'sample-profile':item.profile,'sample-skills':item.skills.join(' · '),'sample-role':item.role,'sample-required':item.required.join(' · ')})) get(id).textContent=value;
 get('sample-result').hidden=true;
 get('sample-book').href='demo.html?use_case='+choice;
 get('sample-access').href=item.href; get('sample-access').textContent=item.access+' →';
}
document.querySelectorAll('[data-use-case]').forEach(button => button.addEventListener('click',()=>{choice=button.dataset.useCase;render();event('jobseam_sample_goal_selected');}));
if(get('sample-run')) { get('sample-run').hidden=false; get('sample-run').addEventListener('click',()=>{
 const item=data[choice];get('sample-matches').textContent='Matches: '+item.matches.join(' · ');get('sample-gap').textContent=item.gap;get('sample-next').textContent=item.next;get('sample-result').hidden=false;event('jobseam_sample_explored');
}); render(); }
if(get('journey-demo-title') && Object.hasOwn(data,params.get('use_case'))) {
 get('journey-demo-title').textContent='See JobSeam for '+data[choice].label.toLowerCase()+'.';
 get('journey-demo-intro').textContent='In 20 minutes, explore your '+data[choice].label.toLowerCase()+' workflow, review a sample match, and discuss the right access option. Use our sample data or bring an anonymized resume.';
 if(choice!=='staffing') {get('journey-plan-copy').textContent='Discuss '+data[choice].label.toLowerCase()+' access, scope, and pricing with our team. Published staffing plans do not define this offer.';get('journey-plan-link').href='mailto:demo@quezaal.com';get('journey-plan-link').textContent='Discuss access options →';}
}
})();

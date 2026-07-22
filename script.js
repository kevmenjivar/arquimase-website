// PORTAFOLIO EDITABLE: agrega aquí la ruta de imagen y la información de cada proyecto.
// Guarda las fotografías dentro de assets/proyectos/ y escribe la ruta, por ejemplo:
// image: 'assets/proyectos/resort-costa.jpg'
const projects = [
  { title: 'Casa Vacacional Loma Verde', category: 'turismo', type: 'Turismo', location: 'El Salvador', description: 'Diseño y construcción de una residencia de descanso integrada al paisaje.', image: '' },
  { title: 'Planta de Tratamiento Norte', category: 'tratamiento', type: 'Plantas de tratamiento', location: 'San Salvador', description: 'Instalación y mantenimiento especializado para un desarrollo de uso mixto.', image: '' },
  { title: 'Remodelación Corporativa', category: 'remodelacion', type: 'Remodelación', location: 'Santa Tecla', description: 'Renovación integral de espacios de trabajo con enfoque funcional y contemporáneo.', image: '' },
  { title: 'Complejo Turístico Costa Azul', category: 'turismo', type: 'Turismo', location: 'Costa de El Salvador', description: 'Planificación y ejecución de áreas de hospitalidad, recreación y servicio.', image: '' },
  { title: 'Sistema Residencial de Agua', category: 'tratamiento', type: 'Plantas de tratamiento', location: 'La Libertad', description: 'Solución de tratamiento diseñada para una urbanización de alta demanda.', image: '' },
  { title: 'Renovación Casa Horizonte', category: 'remodelacion', type: 'Remodelación', location: 'San Salvador', description: 'Rediseño y construcción para mejorar circulación, luz y confort del hogar.', image: '' }
];

const projectGrid = document.querySelector('#project-grid');
let displayedProjects = [];
const categoryNames = { residencial: 'Residencial', comercial: 'Comercial', turistico: 'Turístico', turismo: 'Turístico', tratamiento: 'Comercial', remodelacion: 'Residencial' };
const normalizedCategory = project => ({ turismo: 'turistico', tratamiento: 'comercial', remodelacion: 'residencial' }[project.category] || project.category);
function renderProjects(filter = 'all') {
  const source = window.arquimaseProjects || projects;
  const visible = filter === 'all' ? source : source.filter(project => normalizedCategory(project) === filter);
  displayedProjects = visible;
  projectGrid.innerHTML = visible.map((project, index) => `
    <article class="project reveal in-view" style="--card-delay:${index * 85}ms">
      <div class="project-image ${project.image || project.coverImage ? 'has-image' : `placeholder p${(index % 3) + 1}`}" ${project.image || project.coverImage ? `style="background-image:url('${project.image || project.coverImage}')"` : ''}>
        ${project.image || project.coverImage ? '' : '<span>Imagen del proyecto</span>'}
      </div>
      <div class="project-meta"><div><p class="project-type">${categoryNames[normalizedCategory(project)] || project.type}</p><h3>${project.title}</h3></div><p class="project-location">${project.location}</p></div>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">${(Array.isArray(project.tags) && project.tags.length ? project.tags : String(project.type || '').split(' · ').filter(Boolean)).map(tag => `<span>${tag}</span>`).join('')}</div>
      <button class="project-more" data-project-index="${index}">Ver caso completo <span>→</span></button>
    </article>`).join('');
}
async function loadBackendContent() {
  try { const content = await (await fetch('/api/content')).json(); window.arquimaseProjects = content.projects?.length ? content.projects : projects; const grid=document.querySelector('.client-grid'); if(content.clients?.length)grid.innerHTML=content.clients.map(c=>`<div class="client-logo"><img src="${c.logo}" alt="${c.name}"></div>`).join(''); const hero=document.querySelector('[data-site-image="hero"]'); if(content.siteImages?.hero){hero.style.backgroundImage=`url('${content.siteImages.hero}')`;hero.classList.add('has-custom-image');} } catch {} renderProjects();
}
loadBackendContent();
async function loadFooterLinks(){try{const data=await (await fetch('/api/settings')).json(),settings=data.settings||{};[['instagram','instagram_url'],['linkedin','linkedin_url'],['tiktok','tiktok_url']].forEach(([name,key])=>{const link=document.querySelector(`#social-${name}`);if(link&&settings[key])link.href=settings[key]})}catch{}}loadFooterLinks();

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => { const opened = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', opened); });
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button)); renderProjects(button.dataset.filter); }));

document.querySelectorAll('[data-application]').forEach(button => button.addEventListener('click', () => {
  const application = button.dataset.application;
  document.querySelectorAll('[data-application]').forEach(item => item.classList.toggle('active', item === button));
  document.querySelectorAll('[data-application-panel]').forEach(panel => {
    const active = panel.dataset.applicationPanel === application;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  });
}));

const modal = document.querySelector('#project-modal');
const modalBody = document.querySelector('#modal-body');
function openProject(index) { const project = displayedProjects[index]; if (!project) return; const image = project.image || project.coverImage || ''; const comparison = project.beforeAfter ? `<div class="modal-comparison"><figure><img src="${project.beforeAfter.before}" alt="Antes de ${project.title}"/><figcaption>Antes</figcaption></figure><figure><img src="${project.beforeAfter.after}" alt="Después de ${project.title}"/><figcaption>Después</figcaption></figure></div>${project.beforeAfter.description ? `<p class="modal-note">${project.beforeAfter.description}</p>` : ''}` : ''; const phases = project.phases?.length ? `<div class="modal-phases">${project.phases.map((phase,i)=>`<article><span>Fase ${i+1}</span><img src="${phase.image}" alt="${phase.title}"/><h4>${phase.title}</h4><p>${phase.description}</p></article>`).join('')}</div>` : ''; modalBody.innerHTML = `<img class="modal-hero" src="${image}" alt="${project.title}"/><p class="project-type">${project.type}</p><h2 id="modal-title">${project.title}</h2><p class="modal-location">${project.location || ''}</p><p class="modal-description">${project.description}</p>${comparison}${phases}`; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function closeProject(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
projectGrid.addEventListener('click', event => { const button = event.target.closest('.project-more'); if (button) openProject(Number(button.dataset.projectIndex)); });
document.querySelectorAll('[data-close-modal]').forEach(button=>button.addEventListener('click',closeProject));
document.addEventListener('keydown', event => { if(event.key==='Escape') closeProject(); });
document.querySelector('#projects-prev').addEventListener('click',()=>projectGrid.scrollBy({left:-projectGrid.clientWidth*.82,behavior:'smooth'}));
document.querySelector('#projects-next').addEventListener('click',()=>projectGrid.scrollBy({left:projectGrid.clientWidth*.82,behavior:'smooth'}));

const serviceSelect = document.querySelector('select[name="service"]');
document.querySelectorAll('.service-open').forEach(button => button.addEventListener('click', () => { serviceSelect.value = button.dataset.service; document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' }); }));

document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); document.querySelector('.form-message').textContent = '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.'; event.target.reset(); });

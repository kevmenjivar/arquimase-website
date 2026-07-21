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
function renderProjects(filter = 'all') {
  const source = window.arquimaseProjects || projects;
  const visible = filter === 'all' ? source : source.filter(project => project.category === filter);
  projectGrid.innerHTML = visible.map((project, index) => `
    <article class="project reveal in-view" style="--card-delay:${index * 85}ms">
      <div class="project-image ${project.image || project.coverImage ? 'has-image' : `placeholder p${(index % 3) + 1}`}" ${project.image || project.coverImage ? `style="background-image:url('${project.image || project.coverImage}')"` : ''}>
        ${project.image || project.coverImage ? '' : '<span>Imagen del proyecto</span>'}
      </div>
      <div class="project-meta"><div><p class="project-type">${project.type}</p><h3>${project.title}</h3></div><p class="project-location">${project.location}</p></div>
      <p class="project-description">${project.description}</p>
      ${project.format === 'beforeAfter' && project.beforeAfter ? `<div class="before-after"><div><span>Antes</span><img src="${project.beforeAfter.before}" alt="${project.title} antes" /></div><div><span>Después</span><img src="${project.beforeAfter.after}" alt="${project.title} después" /></div></div>${project.beforeAfter.description ? `<p class="transformation">${project.beforeAfter.description}</p>` : ''}` : ''}
      ${project.format === 'phases' && project.phases?.length ? `<div class="phase-gallery">${project.phases.map(phase => `<article><img src="${phase.image}" alt="${phase.title}" /><h4>${phase.title}</h4><p>${phase.description}</p></article>`).join('')}</div>` : ''}
    </article>`).join('');
}
async function loadBackendContent() {
  try { const content = await (await fetch('/api/content')).json(); window.arquimaseProjects = content.projects?.length ? content.projects : projects; const grid=document.querySelector('.client-grid'); if(content.clients?.length)grid.innerHTML=content.clients.map(c=>`<div class="client-logo"><img src="${c.logo}" alt="${c.name}"></div>`).join(''); const hero=document.querySelector('[data-site-image="hero"]'); if(content.siteImages?.hero)hero.style.backgroundImage=`url('${content.siteImages.hero}')`; } catch {} renderProjects();
}
loadBackendContent();

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => { const opened = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', opened); });
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in-view'); }), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button)); renderProjects(button.dataset.filter); }));

const serviceSelect = document.querySelector('select[name="service"]');
document.querySelectorAll('.service-open').forEach(button => button.addEventListener('click', () => { serviceSelect.value = button.dataset.service; document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' }); }));

document.querySelector('#contact-form').addEventListener('submit', event => { event.preventDefault(); document.querySelector('.form-message').textContent = '¡Gracias! Recibimos tu solicitud y te contactaremos pronto.'; event.target.reset(); });

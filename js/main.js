// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav    = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

// Mark active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Animate progress bars on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.fill');
      if (fill) {
        const target = fill.dataset.width;
        fill.style.width = target;
      }
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.progress-bar').forEach(bar => observer.observe(bar));

// Filter buttons for devoirs, references, etc.
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.filter-group');
    if (group) {
      group.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const target = btn.dataset.target;
    const items  = document.querySelectorAll(`[data-category]`);

    items.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

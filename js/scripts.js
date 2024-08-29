document.addEventListener("DOMContentLoaded", () => {
    console.log("H1k0r website loaded.");

    // Smooth Scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.feature-card, .cta');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Infinite scroll implementation
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
            loadMorePosts();
        }
    });
});

function loadMorePosts() {
    // Simulate loading more posts
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    let page = 1;
    page++;
    fetch(`path/to/api/posts?page=${page}`)
        .then(response => response.json())
        .then(data => {
            data.posts.forEach(post => {
                // Create and insert new post elements
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <div class="post-info">
                        <h2><a href="${post.url}">${post.title}</a></h2>
                        <p class="post-meta">Published on ${post.date} by <a href="#">Admin</a></p>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <a href="${post.url}" class="btn-primary">Read More</a>
                    </div>
                `;
                document.querySelector('.blog-posts').appendChild(postElement);
            });
        });
}

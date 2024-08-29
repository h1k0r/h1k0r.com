// scripts.js

document.addEventListener("DOMContentLoaded", () => {
    // Your JavaScript code here
    console.log("H1k0r website loaded.");
});



// JavaScript to add interactivity and animations

// Example: Smooth Scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort');
    const loadMoreBtn = document.getElementById('load-more-btn');
    let page = 1;

    function filterPosts() {
        const category = categorySelect.value.toLowerCase();
        const searchQuery = searchInput.value.toLowerCase();
        const sortOrder = sortSelect.value;

        document.querySelectorAll('.post-card').forEach(post => {
            const postTitle = post.querySelector('h2 a').textContent.toLowerCase();
            const postCategory = post.getAttribute('data-category').toLowerCase();

            if ((category === 'all' || postCategory.includes(category)) && 
                (searchQuery === '' || postTitle.includes(searchQuery))) {
                post.style.display = 'flex';
            } else {
                post.style.display = 'none';
            }
        });

        let posts = Array.from(document.querySelectorAll('.post-card'));
        posts.sort((a, b) => {
            if (sortOrder === 'latest') {
                return new Date(b.querySelector('.post-meta').textContent) - new Date(a.querySelector('.post-meta').textContent);
            } else if (sortOrder === 'popular') {
                return b.querySelector('.post-excerpt').textContent.length - a.querySelector('.post-excerpt').textContent.length;
            } else {
                return new Date(a.querySelector('.post-meta').textContent) - new Date(b.querySelector('.post-meta').textContent);
            }
        });
        posts.forEach(post => document.querySelector('.blog-posts').appendChild(post));
    }

    function loadMorePosts() {
        // Simulate loading more posts
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

    categorySelect.addEventListener('change', filterPosts);
    searchBtn.addEventListener('click', filterPosts);
    sortSelect.addEventListener('change', filterPosts);
    loadMoreBtn.addEventListener('click', loadMorePosts);

    // Infinite scroll implementation
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
            loadMorePosts();
        }
    });
});

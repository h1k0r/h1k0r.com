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













// Select elements
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');
const blogPostsContainer = document.getElementById('blog-posts');

// Event listeners
categorySelect.addEventListener('change', filterPosts);
searchBtn.addEventListener('click', searchPosts);
sortSelect.addEventListener('change', sortPosts);
loadMoreBtn.addEventListener('click', loadMorePosts);

// Filter posts by category
function filterPosts() {
  const selectedCategory = categorySelect.value;
  const posts = document.querySelectorAll('.post-card');
  posts.forEach((post) => {
    if (post.dataset.category === selectedCategory || selectedCategory === 'all') {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// Search posts
function searchPosts() {
  const searchTerm = searchInput.value.toLowerCase();
  const posts = document.querySelectorAll('.post-card');
  posts.forEach((post) => {
    const postTitle = post.querySelector('.post-info h2').textContent.toLowerCase();
    const postExcerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
    if (postTitle.includes(searchTerm) || postExcerpt.includes(searchTerm)) {
      post.style.display = 'block';
    } else {
      post.style.display = 'none';
    }
  });
}

// Sort posts
function sortPosts() {
  const selectedSort = sortSelect.value;
  const posts = document.querySelectorAll('.post-card');
  if (selectedSort === 'latest') {
    posts.sort((a, b) => {
      const dateA = new Date(a.querySelector('.post-meta').textContent);
      const dateB = new Date(b.querySelector('.post-meta').textContent);
      return dateB - dateA;
    });
  } else if (selectedSort === 'popular') {
    // Add logic to sort by popularity (e.g., number of comments, views, etc.)
  } else if (selectedSort === 'oldest') {
    posts.sort((a, b) => {
      const dateA = new Date(a.querySelector('.post-meta').textContent);
      const dateB = new Date(b.querySelector('.post-meta').textContent);
      return dateA - dateB;
    });
  }
  blogPostsContainer.innerHTML = '';
  posts.forEach((post) => {
    blogPostsContainer.appendChild(post);
  });
}

// Load more posts
function loadMorePosts() {
  // Add logic to load more posts (e.g., AJAX request, etc.)
  // For demonstration purposes, we'll just append a new post
  const newPost = document.createElement('div');
  newPost.classList.add('post-card');
  newPost.innerHTML = `
    <img src="images/new-post.jpg" alt="New Post">
    <div class="post-info">
      <h2>New Post Title</h2>
      <p class="post-meta">Published on ${new Date().toLocaleDateString()} by <a href="#">Admin</a></p>
      <p class="post-excerpt">This is a new post excerpt.</p>
      <a href="#" class="btn-primary">Read More</a>
    </div>
  `;
  blogPostsContainer.appendChild(newPost);
}

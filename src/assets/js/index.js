import 'bootstrap';
import '../scss/main.scss';

(async function () {
    const feedUrl = 'https://medium.com/feed/@shashi.gharti';
    const postsContainer = document.getElementById('container__posts');    

    if (!postsContainer) {
        return;
    }
    postsContainer.innerHTML = '';

    function removeHTMLTags(inputString){
        return inputString.replace(/<[^>]*>/g, '');
    }
    /**
     * Add a new post element
     * @param {Object} post - The post object containing title, description, and link.
     * @returns {HTMLElement} The post element.
     */
    function addPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const title = document.createElement('h3');
        const link = document.createElement('a');
        link.href = post.link;
        link.target = '_blank';
        link.textContent = post.title;

        const excerpt = document.createElement('p');
        const description = removeHTMLTags(post.description || '');
        excerpt.textContent = description.slice(0, 400) + '...'; 

        title.appendChild(link);
        postElement.appendChild(title);
        postElement.appendChild(excerpt);

        return postElement;
    }  

    const errorElement = document.createElement('div');
    errorElement.innerHTML = "No posts found.";

    const others = [
        {
            title: 'Deploying a Model Using Docker as Endpoint in a Pathology Mobile App',
            description: `The article shows steps for deploying a model with Flask, creating a Docker container so that it can be easily deployed in the cloud, and creating an offline pathology mobile app to be used in places without a stable internet connection, like some areas in Africa.`,
            link: 'https://www.omdena.com/blog/pathology-mobile-app'
        }
    ];

    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`);
        const data = await response.json();

        if (data.status === 'ok') {
            // Add posts from the fetched RSS feed
            data.items.forEach((post) => {
                const postElement = addPost(post);
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.appendChild(errorElement);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.appendChild(errorElement);
    }

    // Add "others" posts manually
    others.forEach(post => {
        const postElement = addPost(post);
        postsContainer.appendChild(postElement);
    });
})();
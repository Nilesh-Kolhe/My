import './Blog.css';

const posts = [
  {
    id: 1,
    title: 'Harnessing the Power of Angular 17’s New Features',
    href: 'https://medium.com/@Nilesh_Kolhe/harnessing-the-power-of-angular-17s-new-features-ef1519ae303d',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*h6glzEV36j6DBz5Sp7WjLg.jpeg',
    description:
      'Angular continues to evolve, bringing powerful updates and optimisations that make development faster, more scalable, and developer-friendly. With Angular 17, we see significant improvements in performance, reactivity, and developer experience. This blog will explore the latest features, and how you can leverage them to enhance your projects.',
    date: 'Feb 10, 2025',
    datetime: '2020-03-16',
    category: { title: 'Angular', href: '#' },
    author: {
      name: 'Nilesh Kolhe',
      role: 'Software Developer',
      href: 'https://medium.com/@Nilesh_Kolhe',
      imageUrl:
        'https://miro.medium.com/v2/resize:fill:176:176/1*wNX9bqs822LXkA3D0U2FTQ.png',
    },
  },
  {
    id: 2,
    title: 'Leveraging Higher-Order Components (HOCs) in React',
    href: '#',
    imageUrl:
        'https://cdn-images-1.medium.com/max/1600/1*vlprKj0wh0zLhj4WXcdxqg.jpeg',
    description:
      'Higher-Order Components (HOCs) are a powerful design pattern in React that helps in code reusability, abstraction, and logic sharing across multiple components. They allow us to encapsulate behaviour and inject additional functionality without modifying the original component.',
    date: 'Feb 13, 2025',
    datetime: '2020-03-16',
    category: { title: 'React', href: '#' },
    author: {
      name: 'Nilesh Kolhe',
      role: 'Software Developer',
      href: '#',
      imageUrl:
        'https://miro.medium.com/v2/resize:fill:176:176/1*wNX9bqs822LXkA3D0U2FTQ.png',
    },
  }
]

const Blog = () => {
  return (
    <div className="blog-container bg-black py-8 sm:py-8">
        <div className='section-headline'>
          Blogs <i class="bi bi-backpack-fill"></i>
        </div>
        <hr />
        <div className="article-container mx-auto h-300-px grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-4 sm:pt-4">
          {posts.map((post) => (
            <article key={post.id} className='flex gap-x-4 align-items-center'>
              <div style={{flex:'max-content'}} className='w-100 h-100'>
                <img alt="" src={post.imageUrl} className="w-100 h-100 rounded" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-white">
                    {post.date}
                  </time>
                  <span
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-800"
                  >
                    {post.category.title}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-gray-600">
                    <a className="post-title" href={post.href} target='_blank'>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm/6 text-white">{post.description}</p>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                  <div className="text-sm/6">
                    <p className="font-semibold text-white">
                      <a className="post-title" href={post.author.href} target='_blank'>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-white">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>
  )
}

export default Blog;
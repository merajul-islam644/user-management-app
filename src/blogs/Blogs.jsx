import React, { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const blogs = [
  {
    id: 1,
    title: "Building a User Management Dashboard with React",
    excerpt:
      "An overview of how this project was structured, including component design, state management, and UI decisions.",
    tag: "Architecture",
    content: `
    Building a User Management Dashboard involves careful component structuring, state management, and UI decisions.

    - Designed reusable components for users, modals, and pagination.
    - Managed global state efficiently using React Context API.
    - Ensured responsiveness and accessibility for different screen sizes.
    - Implemented loading and empty states to improve UX.

    This structure helps scale the app and keeps it maintainable.
    `
  },
  {
    id: 2,
    title: "Implementing Pagination and Search in React",
    excerpt:
      "A breakdown of how pagination and search were implemented efficiently using offset-based logic and Context API.",
    tag: "Logic",
    content: `
    To make the dashboard scalable:

    - Pagination splits users into pages (10 users per page).
    - Current page is tracked with Context API.
    - Search filters users in real-time.
    - Pagination adapts dynamically to search results.

    This ensures smooth performance and better user experience even with many users.
    `
  },
  {
    id: 3,
    title: "Why I Used Context API Instead of Redux",
    excerpt:
      "Explaining the decision to use Context API for global state and when it makes sense over heavier solutions.",
    tag: "State Management",
    content: `
    Context API was chosen because:

    - The project is medium-sized; Redux would be overkill.
    - Context API provides a simple way to share global state across components.
    - It simplifies CRUD operations, search, and pagination state management.
    - Reduces boilerplate code compared to Redux.

    This keeps the codebase lightweight and maintainable.
    `
  },
  {
    id: 4,
    title: "Improving UX with Modals and Confirmation Dialogs",
    excerpt:
      "How confirmation modals help prevent destructive actions and improve overall user experience.",
    tag: "UX",
    content: `
    UX enhancements included:

    - Confirmation modals for delete and update actions.
    - Disabled buttons when no further navigation is possible.
    - Empty state messages guide users when no data is present.
    - Responsive layout ensures usability on all devices.

    These small details significantly improve user satisfaction.
    `
  }
]

const Blogs = () => {
  const [expandedBlogId, setExpandedBlogId] = useState(null)

  const toggleExpand = (id) => {
    if (expandedBlogId === id) {
      setExpandedBlogId(null)
    } else {
      setExpandedBlogId(id)
    }
  }

  return (
    <div className="min-h-screen px-6 py-16 bg-gradient-to-r from-sky-100 to-pink-100">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Project Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Engineering notes and design decisions behind the User Management Dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {blogs.map((blog) => {
          const isExpanded = expandedBlogId === blog.id
          return (
            <Card
              key={blog.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <CardHeader>
                <span className="text-xs text-sky-600 font-semibold uppercase">
                  {blog.tag}
                </span>

                <CardTitle className="text-xl font-semibold mt-2 mb-3">
                  {blog.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>

                <p
                  className="text-sky-500 text-sm mt-4 cursor-pointer hover:underline"
                  onClick={() => toggleExpand(blog.id)}
                >
                  {isExpanded ? "Show Less ↑" : "Read more →"}
                </p>

                {isExpanded && (
                  <div className="mt-4 text-gray-700 text-sm whitespace-pre-lin">
                    {blog.content}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-14">
        This blog documents the development process of a portfolio project.
      </p>
    </div>
  )
}

export default Blogs
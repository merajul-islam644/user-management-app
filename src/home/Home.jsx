
const Home = () => {
  const features = ["Create & Edit Users", "Delete with Confirmation","Search & Pagination","Context API State Management","Reusable Components", "Responsive UI"]
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-sky-100 px-6 pt-24">

      <h1 className="text-4xl font-bold text-center mb-4">
        User Management Dashboard
      </h1>

      <p className="text-gray-700 text-center max-w-xl mb-6">
        A modern CRUD application built with React and Context API.
        Manage users with pagination, search, modals, and clean UI interactions.
      </p>

      <h2 className="text-2xl font-semibold mb-10 text-center">
        Key Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">

        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-md text-center"
          >
            <p className="font-medium">{feature}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
        <p className="text-gray-600">
          React • Context API • Tailwind CSS • Component-based Architecture
        </p>
      </div>

    </div>
  )
}

export default Home;
import { UsersContext } from '@/context/UsersContext'
import { useContext } from 'react'

const Pagination = () => {
  const {users } = useContext(UsersContext)

  const USERS_PER_PAGE = 10
  const pageCount = Math.ceil(users.length / USERS_PER_PAGE)
  const currentPage =  10 / USERS_PER_PAGE + 1

  return (
    <div className="flex gap-3 justify-center items-center py-1.5 border-t bg-pink-300 fixed bottom-0 w-full">
      <button
        disabled={0}
        onClick={() => console.log("count")}
        className="
          border px-2 text-white rounded bg-pink-300
          hover:bg-pink-400
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-pink-300
        "
      >
        {"<"}
      </button>

      <p className="text-xs">
        Page {currentPage} of {pageCount}
      </p>

      <button
        disabled={currentPage === pageCount}
        onClick={() => console.log("count-2")}
        className="
          border px-2 text-white rounded bg-pink-300
          hover:bg-pink-400
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:bg-pink-300
        "
      >
        {">"}
      </button>

    </div>
  )
}

export default Pagination;

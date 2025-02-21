import { useState } from "react"
import { SearchIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { getGameByTitle } from "@/models/game-service"
import Link from "next/link";
import Image from "next/image";

export default function Search() {
  const [input, setInput] = useState(String);
  // 添加搜索结果状态
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // 添加下拉菜单显示状态
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term.trim() === "") {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    const games = getGameByTitle(term);
    setSearchResults(games);
    setIsDropdownOpen(true);
  }, 300);

  return (
    <div className="pr-4">
      <div className="relative">
        <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-700 focus:border-2 focus:outline-none focus:ring-blue-700 dark:focus:ring-blue-700">
          <SearchIcon className="absolute left-2 w-5 h-5 text-gray-500" />
          <input
            value={input}
            className="text-base w-72 pl-8 pr-2 py-1.5 border-none rounded-lg dark:bg-gray-900 dark:text-white"
            type="text"
            placeholder="Search Game..."
            onChange={(e) => {
              const newValue = e.target.value;
              setInput(newValue);
              handleSearch(newValue);
            }}
          />
        </div>
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 max-h-72 w-72 overflow-y-auto border-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-gray-700 dark:border-gray-100 z-50">
            {searchResults.length > 0 ? (
              searchResults.map((game, index) => (
                <Link
                  href={`/${game.name}`}
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                  onClick={() => {
                    setInput("");
                    setSearchResults([]);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Image src={game.image} alt={game.name} width={40} height={40} className="rounded mr-2" />
                  <span className="text-base dark:text-white hover:scale-105">{game.name}</span>
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                Not found!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

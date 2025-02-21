import { getCategories } from "@/models/category-service";
import Link from "next/link";

export default async function TagPannel() {
    const categories = await getCategories();
    return (
        <>
            <div className="mx-auto w-[80%] flex flex-col lg:flex-row items-center justify-center my-4 rounded-lg p-2 shadow-md gap-4">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-bookmark"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                    <span className="text-lg font-bold text-main rounded bg-orange-400 px-2 mr-4">Categories</span>
                </div>
                <div className="grid grid-cols-3 gap-x-4 gap-y-2 md:grid-cols-5 lg:grid-cols-8">
                    {categories.map(category => (
                        <Link
                            key={category}
                            href={`/category/${category}`}
                            className="
                                w-[100px]
                                px-3 
                                py-1 
                                text-sm 
                                font-medium 
                                bg-gray-600 
                                text-center
                                rounded-full 
                                hover:bg-gray-400 
                                transition-colors 
                                duration-300
                                border-2
                                border-transparent
                                bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                                bg-clip-padding
                                backdrop-filter backdrop-blur-xl
                                hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:scale-105
                            "
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
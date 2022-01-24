import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "../../models/Post";
import { fetchCategories } from "../../services";

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories().then((result: { node: Category }[]) => {
      const categories = result.map((category) => category.node);
      setCategories(categories);
    });
  }, []);

  return (
    <ul className="bg-white rounded-lg px-4 py-2 shadow-lg mt-8">
      <header className="py-4 flex items-center text-gray-600 border-b w-full">
        <h2 className="">Categories</h2>
      </header>
      {categories.map((category) => (
        <li key={category.slug} className="py-3">
          <Link passHref href={`/category/${category.slug}`}>
            <span className="font-medium  cursor-pointer transition duration-700 hover:text-blue-500 text-gray-600">
              {category.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Categories;

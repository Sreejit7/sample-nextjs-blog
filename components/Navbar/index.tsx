import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "../../models/Post";
import { fetchCategories } from "../../services";

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((result: { node: Category }[]) => {
      const categories = result.map((category) => category.node);
      setCategories(categories);
    });
  }, []);

  return (
    <header className="container mx-auto px-10 mb-8">
      <section className="border-b w-full inline-block py-8">
        <section className="text-center md:float-left block">
          <Link passHref href="/">
            <span
              data-testid="title"
              className="cursor-pointer font-bold text-3xl md:text-4xl text-white"
            >
              {`Sreejit's Tech Blog`}
            </span>
          </Link>
        </section>
        <nav className="hidden md:float-left md:contents">
          {categories.map((category) => (
            <Link
              passHref
              key={category.slug}
              href={`/category/${category.slug}`}
            >
              <span
                className="md:float-right mt-2 align-middle ml-4 font-semibold cursor-pointer text-white"
                data-testid={`category-${category.slug}`}
              >
                {category.name}
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </header>
  );
};

export default Navbar;

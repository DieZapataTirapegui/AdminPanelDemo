import { useState } from "react";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import { Product } from "../types/Product";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Mouse Razer Basilisk",
      price: 89990,
      stock: 12,
      category: "Periféricos",
      image: "https://via.placeholder.com/60",
      status: "Activo"
    },
  ]);

  const [open, setOpen] = useState<boolean>(false);

  const addProduct = (product: Omit<Product, "id" | "status">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      status: "Activo"
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Productos</h1>
        <button onClick={() => setOpen(true)} className="bg-purple-600 px-4 py-2 rounded">
          + Agregar
        </button>
      </div>

      <ProductTable products={products} onDelete={deleteProduct} />
      {open && <ProductModal onClose={() => setOpen(false)} onSave={addProduct} />}
    </div>
  );
}
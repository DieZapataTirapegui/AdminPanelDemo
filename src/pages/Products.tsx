import { useState } from "react";
import { Product } from "../types/Product";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Mouse Gamer RGB",
      price: 29990,
      stock: 12,
      category: "Periféricos",
      image: "https://via.placeholder.com/60",
      status: "active"
    },
    {
      id: "2",
      name: "Teclado Mecánico Pro",
      price: 79990,
      stock: 4,
      category: "Periféricos",
      image: "https://via.placeholder.com/60",
      status: "active"
    },
    {
      id: "3",
      name: "Monitor 27'' 165Hz",
      price: 249990,
      stock: 2,
      category: "Monitores",
      image: "https://via.placeholder.com/60",
      status: "active"
    }
  ]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ➕ Crear
  const addProduct = (newProduct: Omit<Product, "id" | "status">) => {
    const product: Product = {
      ...newProduct,
      id: crypto.randomUUID(),
      status: "active"
    };
    setProducts(prev => [...prev, product]);
    setIsModalOpen(false);
  };

  // ✏️ Editar
  const updateProduct = (updated: Omit<Product, "id" | "status">) => {
    if (!editingProduct) return;

    setProducts(prev =>
      prev.map(p =>
        p.id === editingProduct.id ? { ...p, ...updated } : p
      )
    );

    setEditingProduct(null);
    setIsModalOpen(false);
  };

  // ❌ Eliminar
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // 🔍 Buscar
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveProduct = (
    data: Omit<Product, "id" | "status">,
    id?: string
  ) => {
    if (id) {
      // ✏️ EDITAR
      setProducts(prev =>
        prev.map(p => p.id === id ? { ...p, ...data } : p)
      );
    } else {
      // ➕ CREAR
      setProducts(prev => [
        ...prev,
        { ...data, id: crypto.randomUUID(), status: "active" }
      ]);
    }
  
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>

      {/* Barra superior */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="bg-gray-800 p-2 rounded w-64 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700"
        >
          + Nuevo Producto
        </button>
      </div>

      {/* Tabla */}
      <ProductTable
        products={filteredProducts}
        onEdit={(p) => {
          setEditingProduct(p);
          setIsModalOpen(true);
        }}
        onDelete={deleteProduct}
      />

      {/* Modal */}
      {isModalOpen && (
        <ProductModal
          productToEdit={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
} 
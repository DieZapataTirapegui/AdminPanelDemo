import { useState } from "react";
import { Product } from "../../types/Product";

interface Props {
  onClose: () => void;
  onSave: (product: Omit<Product, "id" | "status">) => void;
}

export default function ProductModal({ onClose, onSave }: Props) {
  const [form, setForm] = useState<Omit<Product, "id" | "status">>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded w-96">
        <h2 className="text-xl mb-4">Nuevo Producto</h2>

        {(["name", "category", "price", "stock", "image"] as const).map(field => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full mb-2 p-2 rounded bg-gray-800"
          />
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancelar</button>
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
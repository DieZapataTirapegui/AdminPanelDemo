import { useState, useEffect } from "react";
import { Product } from "../../types/Product";

interface Props {
  onClose: () => void;
  onSave: (product: Omit<Product, "id" | "status">, id?: string) => void;
  productToEdit?: Product | null;
}

const brands = ["Logitech", "Razer", "ROG", "HyperX", "Corsair", "SteelSeries"];
const categories = ["Mouse", "Teclado", "Audífonos", "Monitor", "Periférico"];

export default function ProductModal({ onClose, onSave, productToEdit }: Props) {
  const [form, setForm] = useState<Omit<Product, "id" | "status">>({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    image: ""
  });

  const [preview, setPreview] = useState<string | null>(null);

  // 🔥 Cargar datos si estamos editando
  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name,
        price: productToEdit.price,
        stock: productToEdit.stock,
        category: productToEdit.category,
        brand: productToEdit.brand,
        image: productToEdit.image
      });
      setPreview(productToEdit.image);
    }
  }, [productToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock") {
      const numeric = value.replace(/[^0-9]/g, "");
      setForm(prev => ({ ...prev, [name]: Number(numeric) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm(prev => ({ ...prev, image: url }));
  };

  const handleSubmit = () => {
    onSave(form, productToEdit?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-xl w-[420px] space-y-4">

        <h2 className="text-xl font-semibold">
          {productToEdit ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <input
          name="name"
          value={form.name}
          placeholder="Nombre del producto"
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800"
        />

        {/* MARCAS */}
        <div>
          <p className="text-sm mb-1 text-gray-400">Marca</p>
          <div className="flex flex-wrap gap-2">
            {brands.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, brand: b }))}
                className={`px-3 py-1 rounded-full text-sm border ${
                  form.brand === b
                    ? "bg-indigo-600 border-indigo-400"
                    : "border-gray-600 hover:bg-gray-800"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* CATEGORÍAS */}
        <div>
          <p className="text-sm mb-1 text-gray-400">Categoría</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, category: c }))}
                className={`px-3 py-1 rounded-full text-sm border ${
                  form.category === c
                    ? "bg-purple-600 border-purple-400"
                    : "border-gray-600 hover:bg-gray-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* PRECIO + STOCK */}
        <div className="flex gap-2">
          <input
            name="price"
            type="text"
            value={form.price === 0 ? "" : form.price}
            placeholder="Precio"
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-gray-800"
          />
          <input
            name="stock"
            type="text"
            value={form.stock === 0 ? "" : form.stock}
            placeholder="Stock"
            onChange={handleChange}
            className="w-1/2 p-2 rounded bg-gray-800"
          />
        </div>

        {/* IMAGEN */}
        <div>
          <p className="text-sm mb-1 text-gray-400">Imagen del producto</p>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-4 rounded cursor-pointer hover:border-indigo-400 transition">
            <span className="text-xs text-gray-400">Click para subir imagen</span>
            <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
          </label>

          {preview && (
            <img src={preview} className="mt-3 w-full h-32 object-cover rounded" />
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-700 rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-indigo-600 rounded">
            {productToEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
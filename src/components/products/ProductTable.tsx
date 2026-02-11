import { Product } from "../../types/Product";

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView?: (product: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onView }: Props) {
  return (
    <div className="bg-gray-900 rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-800 text-gray-400">
          <tr>
            <th className="px-6 py-3">Foto</th>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Categoría</th>
            <th className="px-6 py-3">Precio</th>
            <th className="px-6 py-3">Stock</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-10 text-gray-500">
                No hay productos aún
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition"
              >
                <td className="px-6 py-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-xs text-gray-500">Sin imagen</div>
                  )}
                </td>

                <td className="px-6 py-4 font-medium text-white">
                  {product.name}
                </td>

                <td className="px-6 py-4">{product.category}</td>

                <td className="px-6 py-4">
                  ${product.price.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.stock > 10
                        ? "bg-green-500/20 text-green-400"
                        : product.stock > 0
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td className="px-6 py-4 space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(product)}
                      className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/30"
                    >
                      Ver
                    </button>
                  )}

                  <button
                    onClick={() => onEdit(product)}
                    className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded hover:bg-yellow-500/30"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
                        onDelete(product.id);
                      }
                    }}
                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
import { Product } from "../../types/Product";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductTable({ products, onDelete }: Props) {
  return (
    <table className="w-full bg-gray-900 rounded">
      <thead>
        <tr className="text-left border-b border-gray-700">
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Estado</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id} className="border-b border-gray-800">
            <td><img src={p.image} className="w-12" /></td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>${p.price}</td>
            <td>{p.stock}</td>
            <td className={p.stock > 0 ? "text-green-400" : "text-red-400"}>
              {p.stock > 0 ? "Disponible" : "Sin stock"}
            </td>
            <td>
              <button onClick={() => onDelete(p.id)} className="text-red-500">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
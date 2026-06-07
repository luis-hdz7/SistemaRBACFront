import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  const {user}= useAuthStore();
  //! OTRAS DE LAS PARTES IMPORTANTES DONDE LA MATEMATICA SE TRADUCE A CODIGO
  const canEdit=user?.role==='EMPLOYEE' || user?.role==='ADMIN';
  const canDelete=user?.role==="ADMIN";
  return (
  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    {/* IMAGEN DEL PRODUCTO */}
    <figure className="relative pt-[56.25%]">
      <img
        src={product.image}
        alt={product.name}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </figure>
    <div className="card-body">
      {/* INFORMACION DEL PRODUCTO */}
      <h2 className="card-title text-lg font-semibold">{product.name}</h2>
      <p className="text-2xl font-bold text-primary">
        ${Number(product.price).toFixed(2)}
      </p>
      <p className="text-sm text-base-content/70">
        Stock: {product.stock}
      </p>
      {/* CARD ACTIONS */}
      <div className="card-actions justify-end mt-4">
        {canEdit && (//*Employee y Admin pueden realizar esta accion
          <Link
            to={`/product/${product.id_product}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <EditIcon className="size-4" />
          </Link>
        )}
        {canDelete && (//*Solo Admin pueden realizar esta accion
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteProduct(product.id_product)}
          >
            <Trash2Icon className="size-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);
}
export default ProductCard;
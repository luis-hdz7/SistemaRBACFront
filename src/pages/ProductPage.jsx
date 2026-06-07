import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import {ArrowLeftIcon, SaveIcon, Trash2Icon,} from "lucide-react";
function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();

  const { user } =useAuthStore();

  const navigate =useNavigate();

  const { id } =useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const canDelete =user?.role ==="ADMIN";

  const handleDelete =
    async () => {
      if (
        window.confirm(
          "Are you sure you want to delete this product?"
        )
      ) {
        await deleteProduct(id);
        navigate("/");
      }
    };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }
  if (!currentProduct) {
    console.log({
      id,
      currentProduct,
      formData,
      loading,
      error,
    });
    return (
      <div className="text-center mt-10">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => navigate("/")}
        className="btn btn-ghost mb-8"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Volver a Productos
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGEN DEL PRODUCTO */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img
            src={formData?.image || ""}
            alt={formData?.name || ""}
            className="size-full object-cover"
          />
        </div>
        {/* FORMULARIO DEL PRODUCTO */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">
              Editar Producto
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* Nombre del Producto*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Nuevo Nombre
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name:
                        e.target.value,
                    })
                  }
                />
              </div>
              {/* Precio del Producto */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Precio
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={formData?.price || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price:
                        e.target.value,
                    })
                  }
                />
              </div>
              {/* STOCK */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Stock
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  className="input input-bordered w-full"
                  value={formData?.stock || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock:
                        Number(
                          e.target.value
                        ),
                    })
                  }
                />
              </div>
              {/* PRODUCT IMAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    URL Imagen
                  </span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={formData?.image || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image:
                        e.target.value,
                    })
                  }
                />
              </div>
              {/* Botones de Acciones */}
              <div className="flex justify-between mt-8">
                {canDelete && (
                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    className="btn btn-error"
                  >
                    <Trash2Icon className="size-4 mr-2" />
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={
                    loading ||
                    !formData?.name ||
                    !formData?.price ||
                    !formData?.stock ||
                    !formData?.image
                  }
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
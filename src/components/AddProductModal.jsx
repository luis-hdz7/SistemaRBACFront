import {
  DollarSignIcon,
  ImageIcon,
  Package2Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";
function AddProductModal() {
  const {
    addProduct,
    formData,
    setFormData,
    loading,
  } = useProductStore();
  return (
    <dialog id="add_product_modal" className="modal">
      <form
        onSubmit={addProduct}
        className="modal-box space-y-6"
      >
        {/* Boton para cerrar */}
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() =>
            document.getElementById("add_product_modal").close()
          }
        >
          X
        </button>

        <h3 className="font-bold text-xl mb-8">
          Agregar Nuevo Producto
        </h3>

        <div className="grid gap-6">

          {/* nombre del producto */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Nombre del Producto
              </span>
            </label>

            <div className="relative">
              <Package2Icon className="absolute left-3 top-3 size-5" />

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="input input-bordered w-full pl-10"
              />
            </div>
          </div>

          {/* precio */}
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({
                ...formData,
                price: e.target.value,
              })
            }
            className="input input-bordered"
          />

          {/* STOCK */}
          <input 
            type="number"
            min="0"
            placeholder="Cantidad Disponible"
            className="
              input
              input-bordered
              w-full
              py-3
              focus:input-primary
            " 
            value={formData.stock}
            onChange={(e)=>
              setFormData({
                ...formData,
                stock: Number(e.target.value),
              })
            }
            />

          {/* imagen */}
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.value,
              })
            }
            className="input input-bordered"
          />
        </div>

        <div className="modal-action">

          {/* CANCELAR */}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() =>
              document
                .getElementById("add_product_modal")
                .close()
            }
          >
            Cancelar
          </button>

          {/* CONFIRMAR */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              !formData.name ||
              !formData.price ||
              !formData.image ||
              loading
            }
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <PlusCircleIcon className="size-5 mr-2" />
                Agregar Producto
              </>
            )}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default AddProductModal;
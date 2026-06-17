import { create } from "zustand";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

// La URL sera dinamica, esto dependera del "environmet"
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";
export const useProductStore = create((set, get) => ({
  // estados del produto
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state
  formData: {
    name: "",
    price: "",
    stock: "",
    image: "",
  },
  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", stock:"", image: "" } }),
  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await api.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Producto Agregado Exitosamente");
      document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Algo Salio Mal");
    } finally {
      set({ loading: false });
    }
  },
//*Funcion para obtener todos los productos
  fetchProducts: async () => {
  set({ loading: true });
  try {
    const response = await api.get(`${BASE_URL}/api/products`);
    console.log(response.data);
    set({
      products: Array.isArray(response.data.data.products)
        ? response.data.data.products
        : [],
      error: null,
    });
  } catch (err) {
    console.log(err);

    set({
      error:
        err.response?.status === 429
          ? "Rate limit exceeded"
          : "Something went wrong",
      products: [],
    });
  } finally {
    set({ loading: false });
  }
},
//*Funcion para eliminar un producto
  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await api.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id_product !== id) }));
      toast.success("Producto eliminado exitosamente");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Algo Salió Mal");
    } finally {
      set({ loading: false });
    }
  },
//*Funcion para actualizar un producto
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await api.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Producto Actualizado exitosamente");
    } catch (error) {
      toast.error("Algo Salió Mal");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },
//*Funcion para obtener un producto en especifico
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response =await api.get(`/api/products/${id}`);
      console.log(response.data);
      set({
        currentProduct:
          response.data.data,
        formData:
          response.data.data,
        error: null,
      });
    } catch (error) {
      console.log(
        "Error in fetchProduct",
        error
      );

      set({
        error:
          "Something went wrong",
        currentProduct:
          null,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
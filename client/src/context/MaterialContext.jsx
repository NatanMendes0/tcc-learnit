import React, { createContext, useEffect, useState } from "react";
import api from "../api/index";
import { useAuth } from "./AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MaterialContext = createContext();

const MaterialProvider = ({ children }) => {
    const auth = useAuth();
    const [token, setToken] = useState("");

    useEffect(() => {
        if (auth.user.token) {
            setToken(auth.user.token);
        }
    }, [auth.user.token]);

    const [materials, setMaterials] = useState([]);

    const register = async (info) => {
        try {
            const response = await api.post("/materials/", info, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Material criado com sucesso!");
                setMaterials(response.data);
                return response.data;
            }
        } catch (err) {
            throw new Error(
                err.response?.data?.message || "Ocorreu um erro ao criar o material"
            );
        }
    };

    const list = async () => {
        try {
            const response = await api.get("/materials/get-materials", {
            });
            setMaterials(response.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const get = async (id) => {
        try {
            const response = await api.get(`materials/get-material/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const update = async (id, data) => {
        try {
            const response = await api.put(`/materials/edit-material/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            const updatedMaterial = response.data;
            const updatedMaterials = materials.map((material) =>
                material._id === id ? updatedMaterial : material
            );
            setMaterials(updatedMaterials);
            toast.success("Material atualizado com sucesso!");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Erro ao atualizar o material"
            );
        }
    };

    const remove = async (id) => {
        try {
            await api.delete(`/materials/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

            const newMaterials = materials.filter(
                (material) => material._id !== id
            );
            setMaterials(newMaterials);
            toast.success("Material removido com sucesso!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const registerStep = async (info, id) => {
        const response = await api.post(`/materials/add-step/${id}`, info, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    };

    const getStep = async (id, stepId) => {
        try {
            const response = await api.get(
                `/materials/get-step/${id}/${stepId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const updateStep = async (id, stepId, data) => {
        try {
            const response = await api.put(
                `/materials/edit-step/${id}/${stepId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const updatedStep = response.data;
            const updatedMaterials = materials.map((material) => {
                if (material._id === id) {
                    return {
                        ...material,
                        steps: material.steps.map((step) =>
                            step._id === stepId ? updatedStep : step
                        ),
                    };
                }
                return material;
            });
            setMaterials(updatedMaterials);
        } catch (error) {
            toast.error(
                error.response?.data?.message
            );
        }
    };

    const deleteStep = async (id, stepId) => {
        try {
            await api.delete(`/materials/delete-step/${id}/${stepId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const newMaterials = materials.map((material) => {
                if (material._id === id) {
                    return {
                        ...material,
                        steps: material.steps.filter((step) => step._id !== stepId),
                    };
                }
                return material;
            });            
            setMaterials(newMaterials);
            toast.success("Passo removido com sucesso!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <MaterialContext.Provider
            value={{
                materials,
                register,
                list,
                get,
                remove,
                update,
                registerStep,
                getStep,
                updateStep,
                deleteStep,
            }}
        >
            {children}
            <ToastContainer />
        </MaterialContext.Provider>
    );
};

const useMaterial = () => {
    const context = React.useContext(MaterialContext);

    if (context === undefined) {
        throw new Error("useMaterial must be used within a MaterialProvider");
    }

    return context;
};

export { MaterialProvider, useMaterial };

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";

import { UserCircleIcon } from '@heroicons/react/20/solid';

import api from '../../api/index';

function Material() {
    const { id } = useParams();
    const [material, setMaterial] = useState({ content: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageUrl, setModalImageUrl] = useState('');

    const openModal = (imageUrl) => {
        setModalImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalImageUrl('');
    };


    const getMaterial = async () => {
        try {
            const response = await api.get(`/materials/get-Material/${id}`);
            console.log("Dados retornados:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching Materials", error);
            toast.error(error.response.data.message);
            return [];
        }
    };

    useEffect(() => {
        async function fetchMaterial() {
            const MaterialData = await getMaterial();
            setMaterial(MaterialData);
        }
        fetchMaterial();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await api.post(`/materials/rating/${id}`, {
                comment: data.comment,
            });
            toast.success(response.data.message);
            window.location.reload();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            {/* {material && material.map((materialItem) => (
                materialItem.content.map((contentItem) => (
                    <div key={contentItem._id}>
                        <h2>{contentItem.stepContent.title}</h2>
                        <p>{contentItem.stepContent.text}</p>
                        <img src={contentItem.stepContent.file} alt="Imagem do conteúdo" />
                        <p>{contentItem.stepContent.note}</p>
                    </div>
                ))
            ))} */}
            {material && material.content.map((materialItem) => (
                <div key={materialItem._id}>
                    <h2>{materialItem.stepContent.title}</h2>
                    <p>{materialItem.stepContent.text}</p>
                    <img src={`http://localhost:5000/Public/Images/${materialItem.stepContent.file}`} alt="Imagem do conteúdo" onClick={() => openModal(materialItem.stepContent.file)} />
                    <p>{materialItem.stepContent.note}</p>
                </div>
            ))}
        </>
    );
}

export default Material;
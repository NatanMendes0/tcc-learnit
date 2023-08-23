import { useForm } from "react-hook-form";
import { usePost } from "../../context/PostContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const postContext = usePost();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await postContext.register(data);
      toast.success("Tópico criado com sucesso!");
      navigate("../forum", { replace: true });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Criar um tópico</h1>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-1">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Título"
            {...register("title", {
              required: "Campo obrigatório",
              minLength: {
                value: 3,
                message: "Digite um título com ao menos 3 caracteres",
              },
              maxLength: {
                value: 30,
                message: "Máximo de 30 caracteres",
              },
            })}
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
        </div>

        <div className="mt-1">
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Descrição"
            {...register("description", {
              required: "Campo obrigatório",
            })}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="mt-1">
          <input
            id="file"
            name="file"
            type="file"
            placeholder="Imagem"
            {...register("file", {
              required: "Campo obrigatório",
            })}
          />
          {errors.file && (
            <span className="text-sm text-red-500">{errors.file.message}</span>
          )}
        </div>

        <button type="submit">Registrar-se</button>
      </form>
    </div>
  );
};

export default Create;

// import { Fragment, useState } from "react";
// import { Listbox, Transition } from "@headlessui/react";
// import {
//   CalendarIcon,
//   PaperClipIcon,
//   TagIcon,
//   UserCircleIcon,
// } from "@heroicons/react/20/solid";

// const assignees = [
//   { name: "Unassigned", value: null },
//   {
//     name: "Wade Cooper",
//     value: "wade-cooper",
//     avatar:
//       "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   // More items...
// ];
// const labels = [
//   { name: "Unlabelled", value: null },
//   { name: "Engineering", value: "engineering" },
//   // More items...
// ];
// const dueDates = [
//   { name: "No due date", value: null },
//   { name: "Today", value: "today" },
//   // More items...
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Create() {
//   const [assigned, setAssigned] = useState(assignees[0]);
//   const [labelled, setLabelled] = useState(labels[0]);
//   const [dated, setDated] = useState(dueDates[0]);

//   return (
//     <>
//       <div className="mt-auto justify-center lg:mx-80 py-10 sm:px-6 lg:px-8">
//         <form action="#" className="relative">
//           <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-primary focus-within:ring-1">
//             <label htmlFor="title" className="sr-only">
//               Título
//             </label>
//             <input
//               type="text"
//               name="title"
//               id="title"
//               className="block w-full border-0 pt-4 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
//               placeholder="Título"
//             />
//             <label htmlFor="description" className="sr-only">
//               Descrição
//             </label>
//             <textarea
//               rows={2}
//               name="description"
//               id="description"
//               className="block w-full resize-none border-0 pb-80 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//               placeholder="Escreva uma descrição..."
//               defaultValue={""}
//             />

//             {/* Spacer element to match the height of the toolbar */}
//             <div aria-hidden="true">
//               <div className="h-px" />
//               <div className="py-2">
//                 <div className="py-px">
//                   <div className="h-9" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="absolute inset-x-px bottom-0">
//             {/* TODO: Ajeitar botão de envio de input*/}
//             <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
//               <div className="flex">
//                 <input
//                   id="file"
//                   name="file"
//                   type="file"
//                   placeholder="Imagem"
//                 />
//               </div>
//               <div className="flex-shrink-0">
//                 <button
//                   type="submit"
//                   className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:bg-sky-700"
//                 >
//                   Inserir
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

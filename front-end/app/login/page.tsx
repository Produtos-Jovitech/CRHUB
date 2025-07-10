"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

// Importe suas imagens corretamente
import logoCRHub from "@/public/image/logoCRHub.png";
import logoCr from "@/public/image/2.png"
// import logoMalhas from "@/public/logoMalhas.png";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  const inputUserRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const btnLoginRef = useRef<HTMLButtonElement>(null);

  // const handleKeyPress = (e: React.KeyboardEvent, field: string) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();

  //     const focusMap: { [key: string]: React.RefObject<any> | null } = {
  //       user: inputPasswordRef,
  //       password: btnLoginRef,
  //     };

  //     if (field === "login") {
  //       const fakeFormEvent = {
  //         preventDefault: () => {},
  //       } as FormEvent<HTMLFormElement>;

  //       handleLogar(fakeFormEvent);
  //     }

  //     const targetRef = focusMap[field];

  //     if (targetRef && targetRef.current) {
  //       targetRef.current.focus();
  //     }
  //   } else if (e.key === "ArrowUp") {
  //     e.preventDefault();

  //     const prevFocusMap: { [key: string]: React.RefObject<any> | null } = {
  //       password: inputUserRef,
  //       login: inputPasswordRef,
  //     };
  //     const prevTargetRef = prevFocusMap[field];

  //     if (prevTargetRef && prevTargetRef.current) {
  //       prevTargetRef.current.focus();
  //     }
  //   }
  // };

  function handleLogar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user !== "" && pass !== "") {
      // Aqui você pode implementar a lógica de login real
      router.push("/(pages)");
    } else {
      alert("Preencha todos os campos");
      inputUserRef.current?.focus();
    }
  }

  return (
<div className="flex w-screen min-h-screen justify-center items-center bg-gray-100">
  <div className="bg-white w-[90vw] h-auto sm:h-[85vh] rounded-xl flex shadow-2xl overflow-hidden">
    
    {/* Lado do formulário com fundo diferenciado */}
    <div className="md:w-1/2 w-full px-6 sm:px-10 py-10 flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Bem-vindo</h2>
        <p className="text-lg text-center text-gray-500 mb-6">Faça login para acessar o sistema</p>

        <form onSubmit={handleLogar} className="flex flex-col w-full">
          <label className="mb-2 text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="text"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            ref={inputUserRef}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#222222]"
            required
          />

          <label className="mb-2 text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            name="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            ref={inputPasswordRef}
            className="mb-4 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-[#222222]"
            required
          />

          <div className="text-right mb-4">
            <a href="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-5 h-12 text-xl font-medium text-white rounded-lg hover:brightness-110 focus:outline-none focus:ring-2"
            style={{ backgroundColor: "#10a3d7", borderColor: "#10a3d7", cursor:"pointer" }}
            ref={btnLoginRef}
          >
            Entrar
          </button>

        </form>
      </div>
    </div>

    {/* Lado da imagem */}
    <div className="w-1/2 hidden md:block h-full">
      <Image
        className="h-full w-full object-cover rounded-e-xl"
        src={logoCr}
        alt="Login visual"
      />
    </div>
  </div>
</div>


  );
}

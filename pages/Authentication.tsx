"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";

interface Credentials {
  email: string;
  password: string;
}

export default function AuthenticationPage() {
  const router = useRouter();

  const [loading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState({} as Credentials);

  const toggleVisibility = useCallback(
    () => setIsVisible(!isVisible),
    [isVisible]
  );

  const handlechange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  const onSubmit = useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      setIsLoading(true);

      const { email, password } = input;
      const response = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/painel",
        redirect: false,
      });

      if (response?.error) {
        setIsLoading(false);
        alert(response.error);
      }
      if (response?.url) router.push(response.url);
    },
    [input]
  );

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Faça login em sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <div className="mt-2">
              <Input
                isRequired
                name="email"
                type="email"
                label="E-mail"
                variant="bordered"
                placeholder="Entre com seu e-mail"
                value={input.email}
                onChange={handlechange}
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <Input
                isRequired
                name="password"
                label="Senha"
                variant="bordered"
                placeholder="Entre com sua senha"
                value={input.password}
                onChange={handlechange}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

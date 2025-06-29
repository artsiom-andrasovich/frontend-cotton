import { API_URL } from "@/constants";
import { saveTokenStorage } from "@/services/auth-token.service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type TOAuth = "GOOGLE";
//TODO: страницу сервера сделать через env
export function useOAuth() {
  const { push } = useRouter();

  const openPopup = (provider: TOAuth) => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      `${API_URL}/auth/${provider.toLowerCase()}`,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no,status=no`
    );

    if (!popup) return;

    const listener = (event: MessageEvent) => {
      if (event.origin !== API_URL) return;
      if (!event.data?.accessToken) return; // ✅ Проверяем, что есть токен
      saveTokenStorage(event.data.accessToken);
      window.removeEventListener("message", listener);
      toast.success("Successfully login");
      popup.close();
      push("/");
    };

    window.addEventListener("message", listener);
  };

  return { openPopup };
}

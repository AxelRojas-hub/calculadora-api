import { token } from "./token";


interface ApiResponse {
  d: string;
  v: number;
}

const fetchData = async (): Promise<ApiResponse[] | undefined> => {
  const apiUrl: string = "usd";
  const proxyUrl: string = "https://bcra-proxy-cors.vercel.app";

  try {
    const response = await fetch(`${proxyUrl}/${apiUrl}`, {
      headers: {
        Authorization: `BEARER ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP! Status: ${response.status}`);
    }

    const data: ApiResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

document.querySelector('.btn')?.addEventListener('click', function () {
  fetchData().then((data) => {
    if (data) {
      const lastData = data.pop();
      if (lastData) {
        const numero = (document.getElementById("inputNumber") as HTMLInputElement).value;
        const resultado = Number(numero) * lastData.v; // Ejemplo de cálculo
        let moneda: string = "dolares";
        if (Number(numero) == 1) { moneda = "dolar" }
        document.getElementById("resultado")!.innerText = `${numero} ${moneda} equivale a: ${resultado} pesos argentinos.`;
        document.querySelector('.small')!.textContent = `(Cotizacion ${lastData.d} = ${lastData.v})`
      }
    }
  });
})


interface ApiResponse {
  d: string;
  v: number;
}

let fetched = false; // Marca para saber si ya hizo fetch a la api
let lastData: ApiResponse | undefined; // Almacena el ultimo elemento de la coll recibida

async function fetchData(): Promise<void>{
  const apiUrl: string = "usd";
  const proxyUrl: string = "https://bcra-proxy-cors.vercel.app";

  try {
    const response = await fetch(`${proxyUrl}/${apiUrl}`, {
      headers: {
        Authorization: `BEARER ${import.meta.env.VITE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error HTTP! Status: ${response.status}`);
    }

    const data: ApiResponse[] = await response.json();
    lastData = data.pop();
    fetched= true;
  } catch (error) {
    console.error(error);
  }
};

function realizarCalculo(): void{
  if(lastData){
    const numero= (document.getElementById("inputNumber")as HTMLInputElement).value;
    const resultado = Number(numero)*lastData.v;
    let moneda:string= "dolares";
    if(Number(numero)=== 1){moneda = "dolar"};
    document.getElementById("resultado")!.innerText =`${numero} ${moneda} equivale a: ${resultado} pesos argentinos.`;
    document.querySelector('.small')!.textContent = `(Cotización Dólar Blue ${lastData.d} = ${lastData.v})`;
  }
}

document.querySelector('.btn')?.addEventListener('click', function () {
  if(!fetched){
    fetchData().then(()=>{
      realizarCalculo();
    });
  } else{
    realizarCalculo();
  }
})


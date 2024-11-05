import CryptoJS from 'crypto-js'

async function getAndDecryptData() {
  const response = await fetch('/galaxies');
  
  
}

function decryptFernet(key: string, data: ArrayBuffer): string {
  // Convertendo a chave para base64 e decodificando os dados para bytes
  const decodedKey = CryptoJS.enc.Base64.parse(key);
  const encryptedBytes = CryptoJS.lib.WordArray.create(data);

  // Descriptografando os dados
  const decryptedBytes = CryptoJS.AES.decrypt(
    { ciphertext: encryptedBytes },
    decodedKey,
    { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
  );

  // Convertendo de volta para string
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

// Chama a função para obter e descriptografar os dados
getAndDecryptData().catch((error) => {
  console.error('Erro ao obter e descriptografar dados:', error);
});


export default defineEventHandler(async (event) => {
    try {
        const response: any = await $fetch('http://localhost:8000/galaxies')


        
        const encryptedData = await response.arrayBuffer();
        
        const key = 'DJG-daEhmXNx5KWAsUjvC7uLsMD7K2wU4kKBKYN6zXY='; // Substitua pela sua chave real
        
        const decryptedData = decryptFernet(key, encryptedData);
        
        const decodedJson = JSON.parse(decryptedData);
        
        console.log(decodedJson);
        return decodedJson;

    } catch (error) {
        console.error('Erro ao descriptografar ou buscar dados:', error)
        return { error: 'Erro ao processar os dados.' }
  }
})

export const extractNumberFromUrl = (url) => {
    const match = url.match(/\/(\d+)\/$/);
    return match ? match[1] : null;
};

export const formatDate = (data) => {
  const partes = data.split('-');
  const dataFormatada = `${partes[2]}/${partes[1]}/${partes[0]}`;
  return dataFormatada;
};
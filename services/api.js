// --- Arquivo: src/services/api.js ---

// Simula uma chamada de API que busca os dados para o dashboard.
export const getDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        carteira: {
          saldo: 2623.40,
        },
        grafico1: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [{ data: [4000, 3000, 3900, 1000] }],
        },
        grafico2: [
          { name: 'Alimentação', population: 200, color: '#f39c12', legendFontColor: '#333', legendFontSize: 12 },
          { name: 'Lazer', population: 150, color: '#9b59b6', legendFontColor: '#333', legendFontSize: 12 },
          { name: 'Transporte', population: 100, color: '#2ecc71', legendFontColor: '#333', legendFontSize: 12 },
          { name: 'Outros', population: 80, color: '#e74c3c', legendFontColor: '#333', legendFontSize: 12 },
        ],
      });
    }, 1500); // Atraso de 1.5 segundos para simular a rede
  });
};
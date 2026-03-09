// Função para parsear CSV respeitando aspas
function parseCSV(csvText) {
  const linhas = csvText.trim().split('\n');
  const headers = parseCSVLine(linhas[0]);
  
  return linhas.slice(1).map(linha => {
    const valores = parseCSVLine(linha);
    const objeto = {};
    headers.forEach((header, index) => {
      objeto[header] = valores[index] || '';
    });
    return objeto;
  });
}

// Função auxiliar para parsear uma linha CSV respeitando aspas
function parseCSVLine(linha) {
  const resultado = [];
  let campo = '';
  let dentroDeAspas = false;
  
  for (let i = 0; i < linha.length; i++) {
    const char = linha[i];
    
    if (char === '"') {
      dentroDeAspas = !dentroDeAspas;
    } else if (char === ',' && !dentroDeAspas) {
      resultado.push(campo.trim().replace(/^"|"$/g, ''));
      campo = '';
    } else {
      campo += char;
    }
  }
  
  resultado.push(campo.trim().replace(/^"|"$/g, ''));
  return resultado;
}

// Carregar e processar o CSV
fetch('itens.csv')
  .then(response => response.text())
  .then(csvText => {
    const resultados = parseCSV(csvText);
    console.log(resultados); // Array de objetos com os dados
    // Faça algo com os dados aqui
  })
  .catch(error => console.error('Erro ao carregar CSV:', error));
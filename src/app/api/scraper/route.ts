import {NextRequest, NextResponse} from 'next/server';
import * as cheerio from 'cheerio';

type Resultado = {
  nome: string;
  endereco: string | null;
  horario: string | null;
  site: string | null;
  telefone: string | null;
};

// Mapeia o texto do 'aria-label' ou parte do 'data-test-id' para o campo correspondente
const dataMap: {[key: string]: keyof Resultado} = {
  'Endereço': 'endereco',
  'Horário': 'horario',
  'Website': 'site',
  'Telefone': 'telefone',
};

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const busca = searchParams.get('busca');
  const cidade = searchParams.get('cidade');

  if (!busca || !cidade) {
    return NextResponse.json(
      {error: 'Parâmetros "busca" e "cidade" são obrigatórios.'},
      {status: 400}
    );
  }

  const searchQuery = `${busca} em ${cidade}`;
  const url = `https://www.google.com/search?q=${encodeURIComponent(
    searchQuery
  )}&tbm=lcl`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar a página: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const resultados: Resultado[] = [];

    $('div.VkpGBb, div[jscontroller="xkZ6Lb"]').each((i, el) => {
      const nome = $(el).find('div[role="heading"]').text().trim();
      if (!nome) return; // Pula se não encontrar o nome

      const resultado: Resultado = {
        nome,
        endereco: null,
        horario: null,
        site: null,
        telefone: null,
      };

      // Procura por todas as informações adicionais
      $(el)
        .find('div.rllt__details > div')
        .each((j, detailEl) => {
          const detailHtml = $(detailEl).html();
          if (!detailHtml) return;

          for (const key in dataMap) {
            if (detailHtml.includes(`aria-label="${key}"`) || detailHtml.includes(`data-test-id="${key}"`)) {
              const field = dataMap[key];
              if (!resultado[field]) {
                resultado[field] = $(detailEl).text().trim();
                break; 
              }
            }
          }
        });
        
       // Tenta extrair o telefone de um link `tel:` se não foi encontrado
      if (!resultado.telefone) {
        $(el).find('a[href^="tel:"]').each((j, phoneEl) => {
            const phoneText = $(phoneEl).text().trim();
            if(phoneText) {
                resultado.telefone = phoneText;
                return false; // para de procurar depois de encontrar o primeiro
            }
        });
      }


      resultados.push(resultado);
    });

    return NextResponse.json(resultados);
  } catch (error: any) {
    console.error('Erro no scraper:', error);
    return NextResponse.json(
      {error: 'Ocorreu um erro ao processar a busca.'},
      {status: 500}
    );
  }
}

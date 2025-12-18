import {NextResponse} from 'next/server';
import {chromium} from 'playwright';

export async function POST(req: Request) {
  let browser = null;

  try {
    const {cidade, busca} = await req.json();
    console.log(`🚀 Iniciando busca: ${busca} em ${cidade}`);

    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const context = await browser.newContext({
      viewport: {width: 1920, height: 1080},
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    const page = await context.newPage();

    const query = encodeURIComponent(`${busca} em ${cidade}`);
    await page.goto(`https://www.google.com/maps/search/${query}`, {
      waitUntil: 'domcontentloaded',
      timeout: 90000,
    });

    console.log('✅ Página carregada. Procurando lista de resultados...');

    try {
      await page.waitForSelector('div[role="feed"]', {timeout: 20000});
      console.log('✅ Feed de resultados encontrado.');
    } catch (e) {
      console.log(
        "⚠️ Não encontrou o feed. Verificando se há um único resultado..."
      );
      // Strategy for single result pages
      const h1Text = await page
        .locator('h1.font-display')
        .first()
        .textContent();
      if (h1Text) {
        console.log('✅ Encontrado resultado único:', h1Text);
        const url = page.url();
        await browser.close();
        return NextResponse.json({
          data: [{nome: h1Text, info: `Detalhes em: ${url}`}],
        });
      }
      throw new Error('Não foi possível encontrar o feed de resultados.');
    }

    const feedSelector = 'div[role="feed"]';
    for (let i = 0; i < 3; i++) {
      console.log(`🔄 Rolando a página... (vez ${i + 1})`);
      await page.evaluate(selector => {
        const feed = document.querySelector(selector);
        if (feed) feed.scrollTop = feed.scrollHeight;
      }, feedSelector);
      await page.waitForTimeout(2500); // Wait for content to load
    }

    console.log('📝 Extraindo dados...');

    const listings = await page.$$('div[role="article"]');
    console.log(`🔎 Encontrados ${listings.length} artigos.`);

    const resultados = [];
    for (const item of listings) {
      const nome = (await item.getAttribute('aria-label')) || 'Nome não encontrado';

      if (nome && !nome.includes('Anúncio')) {
        let infoText = 'Informações adicionais não encontradas.';
        // Try to get more details like address or category from inner elements
        const infoElement = await item.locator('div.font-body-2').first();
        if (await infoElement.count()) {
          const innerTexts = await infoElement.allInnerTexts();
          infoText = innerTexts.join(', ').replace(/\n/g, ' ');
        }

        resultados.push({
          nome: nome,
          info: infoText.substring(0, 150),
        });
      }
    }

    console.log(`🏁 Encontrados: ${resultados.length} itens.`);

    if (resultados.length === 0) {
      console.log('Nenhum resultado encontrado após a extração.');
    }

    await browser.close();
    return NextResponse.json({data: resultados});
  } catch (error: any) {
    console.error('❌ ERRO CRÍTICO NO SCRAPER:', error);

    if (browser) await browser.close();

    return NextResponse.json(
      {error: 'Erro ao processar busca', details: error.message},
      {status: 500}
    );
  }
}

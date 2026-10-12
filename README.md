# PIB Campo Mourão

Site responsivo da Primeira Igreja Batista de Campo Mourão, criado com React, TypeScript e Vite.

## Rodar localmente

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

Para gerar a versão de produção:

```sh
npm run build
npm run preview
```

Os arquivos finais são gerados em `dist/` e podem ser publicados em qualquer hospedagem estática.

## Atualizar conteúdo

- `src/content.ts`: endereço, Instagram, Google Maps, programação e reflexões.
- `src/App.tsx`: textos e seções da página.
- `src/styles.css`: identidade visual e adaptação para celular.
- `public/logo-pib.png`: logo enviada pelo usuário, com as margens externas recortadas.
- `public/images/`: imagens locais. Fontes, autores e licenças em `ASSETS.md`.
- `public/fonts/`: fontes locais Manrope e Lora, acompanhadas das licenças.

## Informações confirmadas

Instagram e programação foram fornecidos pelo responsável durante a criação:

| Dia | Horário | Encontro |
| --- | --- | --- |
| Quarta-feira | 20h | Culto de oração |
| Sábado | 19h | Reunião de jovens |
| Domingo | 18h | Escola bíblica |
| Domingo | 19h | Culto de celebração |

Instagram: https://www.instagram.com/pibcm_oficial/

Endereço: Av. Comendador Norberto Marcondes, 813, Campo Mourão–PR. A grafia completa da avenida foi conferida em documento público assinado pela igreja: https://www.cajati.sp.gov.br/public/admin/globalarq/licitacao/arquivo/be7afd0f4d9188906d4dd5e61d1f5631.pdf .

As fotografias do culto e da fachada foram enviadas pelo responsável e representam a igreja real. A imagem da Bíblia é ilustrativa, sob licença Unsplash. Fotos ilustrativas alternativas continuam disponíveis em `public/images/`, com os créditos em `ASSETS.md`. As reflexões são textos de apresentação, e não mensagens atribuídas a pastores da igreja. Não há coleta de dados pessoais nem formulários com envio simulado.

## Funcionalidades

Navegação entre seções, menu para celular, orientação para primeira visita, programação semanal, rota no Google Maps, Instagram, perguntas frequentes e três reflexões com temas selecionáveis. Um botão de sol/lua no cabeçalho alterna entre os modos claro e escuro. A preferência fica salva no navegador; na primeira visita, o site respeita a aparência do sistema. O atributo `data-theme` e a paleta ficam no próprio `.site-shell`, para funcionar também em prévias encapsuladas. As cores estão em `src/theme.css`.

A programação usa uma lista responsiva com dias, horários e ações alinhados, entrada escalonada e animações nos ícones e botões. Os textos animados preservam palavras inteiras ao quebrar linhas. A rolagem vertical e as âncoras usam Lenis, respeitando movimento reduzido e pausando enquanto uma janela está aberta. As janelas usam o elemento nativo `dialog`, com foco contido e fechamento pela tecla Escape. Há link para pular ao conteúdo. Os alinhamentos, espaços e disposição responsiva das seções estão em `src/layout.css` e os cartões da programação em `src/schedule-list.css`.

## Página da juventude

A página `/juventude/` possui entrada HTML própria (`juventude/index.html`), apresentação, galeria com treze fotos enviadas pelo responsável e informações da reunião de jovens. O acesso aparece no menu e no rodapé. Cabeçalho, rodapé e tema são compartilhados com a página principal. A juventude possui entradas escalonadas, efeitos nas fotos e botões, fundo decorativo animado e indicador de progresso da rolagem. As fotos abrem em um diálogo com navegação anterior/próxima, teclas de seta e Escape, foco contido e retorno à foto escolhida. As animações respeitam a preferência por movimento reduzido. O build gera `dist/juventude/index.html`, permitindo acesso direto e atualização da página sem configuração de rotas no servidor.

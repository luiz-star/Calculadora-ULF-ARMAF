# Calculadora de ULF – ARMAF

<img width="618" height="611" alt="image" src="https://github.com/user-attachments/assets/69f3ecc1-cc84-437f-9211-013cea360240" />

Como usar:
- Abra no navegador do seu celular ou computador:
  https://luiz-star.github.io/Calculadora-ULF-ARMAF/
- Ao acessar o link acima, a calculadora abrirá automaticamente. Não é necessário instalar nada.

Aplicação web para calcular ULFs (Unidades de Limpeza de Faixa) com base nas atividades e coeficientes definidos no contrato “Contrato - 4600012975-34-37.pdf”.  
A ferramenta permite selecionar a atividade, informar quantidade, associar código SAP e obter o total em ULF e o valor em R$.

- Valor de referência: 1 ULF = R$ 13,53
- Status PWA: sem botão de instalação. Manifest e Service Worker podem ser mantidos para cache/offline.

## Demo

- Produção (GitHub Pages):
  - https://luiz-star.github.io/Calculadora-ULF-ARMAF/

## Funcionalidades

- Seleção de atividades com descrição e unidade de medida.
- Cálculo automático de ULF por atividade e total do documento.
- Suporte a “Normal” e “HE” (definido pelo código SAP escolhido/digitado).
- Lista de itens adicionados, com remoção por linha.
- Conversão automática para valor em reais.
- Mapeamento de códigos SAP que preenche atividade e tipo.

## Estrutura do projeto

- index.html — Interface e lógica principal do cálculo. Inclui logo no topo um aviso com o link para abrir no navegador.
- manifest.webmanifest — Metadados do app (nome, tema, ícones). Opcional.
- service-worker.js — Cache básico para navegação/offline. Opcional.
- icons/ — Ícones de várias dimensões (se utilizados pelo manifest).

Observação: o botão de “Instalar app” foi removido. Mesmo assim, você pode manter manifest e service worker para melhorar desempenho/offline.

## Como usar localmente

1. Clone o repositório:
   - git clone https://github.com/SEU_USUARIO/Calculadora-ULF-ARMAF.git
   - cd Calculadora-ULF-ARMAF
2. Sirva a pasta em um servidor local (recomendado):
   - Python 3: python -m http.server 8080
   - Node (http-server): npx http-server -p 8080
3. Abra no navegador:
   - http://localhost:8080

Dica: Abrir diretamente o arquivo via file:// pode impedir o Service Worker e algumas features. Prefira um servidor.

## Publicação no GitHub Pages

1. Vá em Settings > Pages.
2. Em Build and deployment, escolha “Deploy from a branch”.
3. Selecione a branch main e a pasta root (/).
4. Salve; aguarde a URL ficar disponível.

## Personalização

- Valor do ULF: edite a constante ULF_VALUE no index.html.
- Atividades e coeficientes: edite os arrays atividades, coeficientes e sapMap no script do index.html.
- Ícones: atualize a pasta icons e os caminhos no manifest.webmanifest.

## Remover PWA/offline (opcional)

Se não quiser PWA:
- Exclua manifest.webmanifest e service-worker.js.
- No index.html, remova:
  - <link rel="manifest" href="manifest.webmanifest">
  - O script que registra o service worker.

## Roadmap (sugestões)

- Exportar a lista para CSV/PDF.
- Campo de observações por item.
- Persistência da lista no localStorage.
- Filtros/pesquisa por atividade e SAP.
- Tema claro/escuro alternável.

## Desenvolvimento

- HTML, CSS e JavaScript puro.
- Responsivo e otimizado para uso em campo (mobile).

## Licença

Defina a licença do projeto (por exemplo, MIT). Se desejar, crie um arquivo LICENSE.

## Suporte

Abra uma Issue neste repositório com:
- Passos para reproduzir
- Navegador e sistema operacional
- Prints (se possível)

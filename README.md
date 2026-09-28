# Landing Page Institucional — Semana Tecnológica da UCPel 2026

Projeto desenvolvido para o **Projeto Integrador IV-A** do curso de **Análise e Desenvolvimento de Sistemas da Universidade Católica de Pelotas (UCPel)**.

A proposta se baseia no desenvolvimento de uma landing page institucional para divulgar a **Semana Tecnológica da UCPel 2026**, reunindo em uma unica página informações sobre o evento, programação, palestrantes, oficinas, inscrições, localização, organização e canais de contato.

## Objetivo

Desenvolver uma página simples, organizada, responsiva e acessível para facilitar o acesso às principais informações da Semana Tecnológica, com boa experiência de navegação tanto em computadores quanto em dispositivos móveis.

## Funcionalidades

- Menu de navegação com acesso às principais seções;
- Menu hambúrguer em dispositivos móveis;
- Banner rotativo com três slides;
- Botões de chamada para inscrição;
- Programação separada em palestras e oficinas;
- Carrosséis horizontais de atividades;
- Cards com informações adicionais no verso;
- Navegação dos cards pelo mouse e pelo teclado;
- Seção de palestrantes com navegação por setas;
- Contador regressivo para o início do evento;
- Mapa com a localização da UCPel;
- Seção de organização do evento;
- Formulário de contato com validação;
- Links para redes sociais;
- Botão para retornar ao topo da página.

## Tecnologias utilizadas

- **HTML5** — estrutura da página;
- **CSS3** — estilização, componentes e responsividade;
- **JavaScript** — interatividade e validações;
- **Git** — controle de versão;
- **GitHub** — armazenamento do código-fonte;
- **Cloudflare** — publicação da landing page.

## Organização do projeto

```text
/
├── index.html
├── script.js
└── src/
    ├── style.css
    ├── banner.css
    ├── botoes.css
    ├── cards.css
    ├── carrosseis.css
    ├── footer.css
    ├── formulario.css
    ├── header.css
    ├── responsivo.css
    ├── swiper.css
    └── img/
```

Os arquivos CSS foram separados por componentes para facilitar a organização e manutenção do projeto.

## Responsividade

A interface foi desenvolvida para se adaptar a diferentes tamanhos de tela.

Entre os principais ajustes estão:

- substituição do menu horizontal por menu hambúrguer em telas menores;
- reorganização de conteúdos em colunas;
- adaptação dos cards da programação;
- reorganização da seção de palestrantes;
- formulário e canais de contato empilhados no mobile;
- rodapé reorganizado em uma coluna;
- imagens e mapa adaptáveis à largura disponível.

## Acessibilidade

Foram aplicadas algumas boas práticas de acessibilidade, como:

- textos alternativos em imagens;
- uso de `aria-label`;
- uso de `aria-expanded`;
- navegação dos cards com **Enter** e **Espaço**;
- foco visível em elementos interativos;
- rótulos nos campos do formulário;
- mensagens de validação;
- consideração da preferência `prefers-reduced-motion`.

## Testes realizados

Foram realizados testes manuais de:

- navegação pelo menu;
- menu mobile;
- banner e carrosséis;
- cards interativos;
- navegação por teclado;
- formulário válido e inválido;
- contador regressivo;
- mapa;
- responsividade em desktop e dispositivo móvel;
- links;
- rodapé.


## Publicação

A versão final da landing page foi publicada utilizando a **Cloudflare**.

**Link da página:**

https://landing-page-institucional-semana-tecnologica-ucpel.gabriela-rickes.workers.dev/

O acesso à página publicada é protegido e pode exigir autenticação com e-mail autorizado.

## Repositório

https://github.com/gabrielarickes/Landing-Page-Institucional-Semana-Tecnologica-UCPel

## Autora

**Gabriela Angelita Hessler Rickes**  
Análise e Desenvolvimento de Sistemas — UCPel

## Projeto acadêmico

Projeto desenvolvido para o **Projeto Integrador IV-A**, com orientação dos professores **Carlos Vinícius Rasch Alves** e **Morgana Macedo Azevedo da Rosa**.

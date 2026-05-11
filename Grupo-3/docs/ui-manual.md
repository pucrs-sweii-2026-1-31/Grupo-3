# Manual de UI e Design System - Projeto Chave

## Introdução
Este guia define os padrões visuais baseados na biblioteca **Material-UI (MUI)** adotada no projeto, buscando consistência nas aplicações front-end (Host e Remotes). O objetivo é uma estética corporativa (Enterprise UI), moderna e adaptável.

## Paleta de Cores e Temas
A aplicação deve suportar **Light Mode** e **Dark Mode**.

- **Primária (Primary):** Azul corporativo escuro (`#1976d2`).
- **Secundária (Secondary):** Tonalidades de destaque (`#dc004e`).
- **Background (Light):** Tons pastéis ou branco absoluto (`#ffffff` / `#f4f6f8`).
- **Background (Dark):** Cinza escuro ou preto suavizado (`#121212`).

## Tipografia
- Fonte base recomendada: **Inter** ou **Roboto**.
- Cabeçalhos (H1 a H6) com pesos variando de `400` a `700`.
- Texto padrão do corpo com tamanho legível (e.g., `1rem` base).

## Espaçamentos e Layouts
- **Grid de 8px:** Todo o layout segue a escala de 8px (margins, paddings). Ex: `theme.spacing(1) = 8px`, `theme.spacing(2) = 16px`.
- **Componentes Centrais:**
  - `Navbar`: Fixada no topo com elevação sutil (box-shadow).
  - `Sidebar`: Responsiva (drawer fixo no desktop, overlay no mobile).
  - `Dashboard/Containers`: Utilizam `<Container maxWidth="lg">` para limitação de largura e legibilidade.

## Componentes Reutilizáveis
- **Botões:** Padrões `contained`, `outlined` e `text` previstos no MUI.
- **Campos de Formulário (TextField):** Variante `outlined` ativada por padrão com suporte a validação e mensagens de erro integradas (vermelho para erros).
- **Cards:** Com bordas arredondadas (radius leve, ex: `8px`) e sombras sutis para sensação de profundidade e glassmorphism se aplicável.

## Responsividade
- Utilizar breakpoints do MUI (`xs`, `sm`, `md`, `lg`, `xl`).
- Ocultar Sidebars em tamanhos menores (`xs` e `sm`) em favor de um menu *Hamburger*.
- Tabelas de dados devem utilizar scroll horizontal ou colapsar colunas menos importantes em telas pequenas.

## Melhores Práticas e UI Patterns
- **Feedback Visual**: Sempre exibir um `LinearProgress` ou `CircularProgress` durante chamadas de API.
- **Snackbars/Alerts**: Utilizar notificações para sucessos (`Success`) e erros críticos (`Error`).
- **Empty States**: Páginas sem dados devem exibir ilustrações ou mensagens amigáveis em vez de uma tela vazia.
- **Botão de Ação Principal (FAB)**: Usar com moderação para ações de criação global.

## Ícones
- Utilizar exclusivamente a biblioteca `@mui/icons-material`.
- Manter consistência: 
  - Lixeira para `Excluir`.
  - Lápis para `Editar`.
  - Check para `Confirmar`.

## Acessibilidade (a11y)
- Contraste de cores deve seguir o padrão WCAG AA.
- Todos os campos de formulário devem possuir `label` e `aria-label`.
- Navegação via teclado deve ser fluida e o foco visual deve ser nítido.

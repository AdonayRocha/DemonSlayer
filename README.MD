# Demon Slayer App

Este projeto é um aplicativo React Native (Expo) que exibe uma lista de personagens do anime Demon Slayer, permitindo visualizar detalhes de cada personagem.

## Funcionalidades
- Listagem de personagens com imagem e nome
- Navegação para tela de detalhes do personagem
- Exibição de informações detalhadas: nome, idade, raça, gênero, descrição e citação
- Layout responsivo e visual inspirado no anime

## Estrutura de Pastas
- `components/` — Componentes reutilizáveis (ex: `CharacterCard`)
- `screens/` — Telas principais do app (`CharacterListScreen`, `CharacterDetailScreen`)
- `assets/` — Imagens e ícones
- `App.tsx` — Configuração de navegação

## Como rodar o projeto

1. **Pré-requisitos:**
   - Node.js instalado
   - Expo CLI instalado globalmente (`npm install -g expo-cli`)

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o projeto:**
   ```bash
   npm start
   ```
   Ou use:
   - `npm run android` para rodar no emulador Android
   - `npm run ios` para rodar no simulador iOS
   - `npm run web` para rodar no navegador

4. **Abra o app:**
   - Use o app Expo Go no seu celular para escanear o QR Code exibido no terminal ou navegador.

## Observações
- O app consome a API pública https://www.demonslayer-api.com para buscar os personagens.
- O layout foi inspirado em exemplos de referência para melhor experiência visual.

---

Desenvolvido por Adonay Rocha.

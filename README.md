# 📝 Web Notes

> Um sistema de notas inteligente e moderno, inspirado no bloco de notas do celular

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/Editor-Tiptap-green?style=for-the-badge)

## 🚀 Sobre o Projeto

Web Notes é uma aplicação web moderna que replica a experiência de uso de um bloco de notas de celular. Os usuários podem criar, editar, visualizar e excluir suas notas com uma interface intuitiva e responsiva.

### ✨ Funcionalidades

- 📱 **Interface Mobile-First**: Design responsivo inspirado em apps nativos
- ✏️ **Editor Rico**: Powered by Tiptap com formatação avançada
- 🔍 **Busca Inteligente**: Encontre suas notas rapidamente
- 💾 **Auto-save**: Salve suas alterações automaticamente
- 🎨 **Interface Limpa**: Design minimalista e intuitivo
- ⚡ **Performance**: Carregamento rápido com Next.js
- 🔄 **CRUD Completo**: Criar, Ler, Editar, Deletar notas

### 🎯 Recursos do Editor

- **Formatação de Texto**: Negrito, itálico, riscado
- **Listas**: Numeradas e com marcadores
- **Títulos**: H1, H2 para organização
- **Histórico**: Desfazer/Refazer ações
- **Preview**: Visualização em tempo real

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.2** - Framework React com SSR
- **React 19.1.0** - Biblioteca JavaScript para UI
- **Tiptap** - Editor de texto rico e moderno
- **Axios** - Cliente HTTP para comunicação com API
- **CSS Modules** - Estilização isolada e modular

### Editor
- **@tiptap/react** - Integração React do Tiptap
- **@tiptap/starter-kit** - Extensões básicas do editor
- **@tiptap/pm** - ProseMirror core

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Backend API funcionando

### 1. Clone o repositório
```bash
git clone https://github.com/Luizricci/Front-Notes.git &&
cd web-notes
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as variáveis de ambiente
```bash
# Crie o arquivo .env.local
NEXT_PUBLIC_API_URL= url_que_está_rodando_o_back-End
```

### 4. Execute o projeto
```bash
# Desenvolvimento
npm run dev
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev
```

## 🌐 API Integration

A aplicação se comunica com uma API REST que deve fornecer os seguintes endpoints:

```javascript
// Buscar todas as notas
GET /api/notes

// Criar nova nota
POST /api/notes
{
  "title": "Título da nota",
  "content": "<p>Conteúdo HTML</p>",
  "createdAt": "2025-09-09T10:00:00Z"
}

// Atualizar nota
PUT /api/notes/:id
{
  "title": "Título atualizado",
  "content": "<p>Conteúdo atualizado</p>",
  "updatedAt": "2025-09-09T10:00:00Z"
}

// Deletar nota
DELETE /api/notes/:id
```

## 🎛️ Configurações

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:3030/api` |

### Editor Tiptap

O editor pode ser customizado modificando as extensões em `src/app/home/page.jsx`:

```javascript
const editor = useEditor({
  extensions: [
    StarterKit,
    // Adicione mais extensões aqui
  ],
  // Outras configurações...
});
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Luiz Henrique**
- GitHub: [@Luizricci](https://github.com/Luizricci)
- Projeto: [Front-Notes](https://github.com/Luizricci/Front-Notes)

---

⭐ Se este projeto te ajudou, dê uma estrela no repositório!

## 🔄 Changelog

### v0.1.0 (Atual)
- ✅ Sistema CRUD completo de notas
- ✅ Editor Tiptap integrado
- ✅ Interface responsiva
- ✅ Sistema de busca
- ✅ Integração com API REST
- ✅ Modo de edição inline
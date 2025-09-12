# Centro Assistencial Espírita Raphael Latorre - Website

Este é o repositório do site oficial do Centro Assistencial Espírita Raphael Latorre, uma instituição dedicada ao estudo e prática da doutrina espírita e ao trabalho de assistência social.

## Sobre o Projeto

O site foi desenvolvido para apresentar as atividades, a doutrina e os trabalhos assistenciais realizados pelo Centro, proporcionando informações claras e acessíveis aos visitantes.

## Estrutura do Projeto

```
llatorre/
├── css/                  # Arquivos de estilo CSS
│   ├── normalize.css     # Reset CSS para consistência entre navegadores
│   └── llatorre-main.css # Estilos consolidados do site (tema, componentes, responsivo)
├── images/               # Imagens e recursos visuais
│   ├── banner-bg.webp    # Imagem do banner principal
│   ├── placeholder-*.webp # Placeholders para diferentes seções
│   └── favicon.ico       # Ícone do site
├── js/                   # Arquivos JavaScript
│   ├── modern-interactions.js # Comportamentos e interações (carrossel acessível, navegação, etc.)
│   └── legacy/                 # (opcional) Arquivos legados, não utilizados em produção
├── pages/                # Páginas do site além da home
│   ├── sobre.html        # Página sobre o centro
│   ├── doutrina.html     # Página sobre doutrina espírita
│   ├── atividades.html   # Página de atividades do centro
│   ├── assistencia-social.html # Página de projetos sociais
│   └── contato.html      # Página de contato
└── index.html            # Página inicial
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- WebP para imagens (otimização de performance)
- FontAwesome para ícones
- Design responsivo para todos os dispositivos

## Funcionalidades

- Apresentação institucional do Centro
- Informações sobre as atividades regulares
- Explicações sobre a doutrina espírita
- Detalhes sobre os projetos de assistência social
- Formulário de contato e localização
- Design responsivo para acesso em dispositivos móveis e desktop

## Imagens Placeholder

O site utiliza uma série de imagens placeholder que seguem o padrão:

- `placeholder-centro.webp` - Fachada do Centro
- `placeholder-contato.webp` - Imagem para a seção de contato
- `placeholder-livro-*.webp` - Imagens dos livros da codificação espírita
- `placeholder-palestra.webp`, `placeholder-passe.webp`, etc. - Imagens para as diversas atividades
- `placeholder-gestantes.webp`, `placeholder-roupas.webp`, etc. - Imagens para os projetos assistenciais

**Importante:** As imagens estão em formato WebP para melhor performance. Para browsers mais antigos que não suportam WebP, considere implementar fallbacks para JPG/PNG.

## Como Contribuir

Se você deseja contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Manutenção

Para atualizar o conteúdo do site, você pode editar os arquivos HTML correspondentes:

- Para eventos e notícias: modifique a seção apropriada no `index.html`
- Para alterar informações de atividades: edite `pages/atividades.html`
- Para atualizar projetos sociais: edite `pages/assistencia-social.html`

### Estilos e scripts canônicos

- Use apenas `css/llatorre-main.css` para estilos. Evite criar novos arquivos paralelos.
- Use apenas `js/modern-interactions.js` para comportamentos globais.

### Arquivos legados

O repositório pode conter arquivos de versões anteriores que não são usados pelas páginas atuais:

- `css/styles.css`
- `js/main.js`
- `js/main-modern.js`

Se necessário para referência histórica, mova-os para `js/legacy/` e `css/legacy/`. Em produção, garanta que somente `llatorre-main.css` e `modern-interactions.js` estejam referenciados.

## Contato

Para dúvidas sobre o website, entre em contato com o mantenedor do projeto.

---

&copy; 2025 Centro Assistencial Espírita Raphael Latorre - Todos os direitos reservados.

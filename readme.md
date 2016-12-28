### Instalação
Antes de tudo é necessário instalar os pacotes do gerenciador
```
$ npm install
```

### Correções Manuais em bibliotecas
A biblioteca do Google Analytics necessita ser alterada nas linhas ```442``` e ```444``` de ```http``` para ```https``` devido a politica de segurança da Google com links externos em Extensões Chrome.

```
Caminho: node_modules/angular-google-analytics/dist/angular-google-analytics.js
```

### Deploy
Antes de qualquer deploy é necessário rodar o Gulp em modo ```test``` para verificar possiveis erros e carregar a pasta de distribuição no navegador para verificar qualquer tipo de problema visual que possa ter ocorrido.

```
$ gulp test
```

```
$ gulp publish
```

### Gulp
Toda a estrutura de configuração das tarefas do Gulp estão no arquivo ```config.js```.

```
Caminho: gulp/config.js
```

Lista de todas as tarefas prontas no Gulp.

- ```Clean```: Limpa a pasta de destribuição e excluir o arquivo zip da extensão.
- ```Compress-css```: Unifica e comprime todos os arquivos css para ```styles.min.css```.
- ```Compress-js```: Unifica e comprime todos os arquivos js para ```all.min.js```.
- ```Concat-lib```: Unifica todos os arquivos js das bibliotecas já minificadas para ```lib.min.js```.
- ```Copy-files-extension```: Copia os arquivos utilizados para distribuição no formato extensão, ```manifest.json``` e o ```background.js``` para a pasta de distribuição.
- ```Copy-other-file```: Copia todos os arquivos fonts que não precisam passar por tratamente para a pasta de distribuição (imagens, html, fonts boostrap e o index de produção).
- ```Deploy```: Realiza a publicação do aplicativo para a loja da Chrome Store.
- ```Jshint```: Escaneia os arquivos js a procura de erros de syntax.
- ```Pack```: Realiza a compreensão da pasta de distrbuição para ```zipped_extension.zip```.
- ```Publish```: Realize todos os processos de verificação e publicação na loja.
- ```Test```: Realiza todos os processos de vericiação mas não publica na loja.
- ```Update-version```: Realiza a alteração da versão do arquivo ```manifest.json``` a cada deploy.
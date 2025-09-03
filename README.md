# Djeck Web Components 

Djeck Web Components ou DWC é um conjunto que conponentes que visa facilitar o desenvolvimento de aplicações

## 📗 DOCUMENTAÇÃO:

### dwc-preloader
Cria um pré carregador, veja como fazer isso:

``` html
<dwc-preloader></dwc-preloader>
```

Você pode usar diferentes variações, através do atributo `modo`. Os valores disponíveis são: `ios`,`miui` e `windows`

No exemplo a seguir usaremos a variação `ios`:

``` html
 <dwc-preloader modo="ios"></dwc-preloader>
```

* Veja outros atributos:

| ATRIBUTO  | DESCRIÇÃO |
|-----------|-----------|
| `cor`     | Muda a cor do preloader. Use valores __hexadecimais__  ou rgb. O padrão é #000 (preto).                  |
|`tamanho`  | Altera o tamanho. O valor é baseado em `px`. O padrão é 20

### exemplo:

``` html
 <dwc-preloader modo="ios" cor="#039be5" tamanho="30"></dwc-preloader>
```

* Acabamos de criar um preloader estilo ios, definimos a cor para #039be5 (azul) e o tamanho (30px).
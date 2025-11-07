// Djeck Web Components versão 0.01

HTMLElement.prototype.adicionarElemento = function(tag){
      return this.appendChild(document.createElement(tag))
  }

class DjeckWebComponents extends HTMLElement{
    constructor(){
       super()
       
       let eventos = {
                 change: 'mudar',
                 click: 'clique',
                 dblclick: 'cliqueDuplo',
                 focus: 'focar'
       }
       
       Object.entries(eventos).forEach(([evento, dwc])=>{
           this.addEventListener(evento, ()=>{
               this.dispatchEvent( new CustomEvent(dwc, {bubbles: true}))
           })
       })
    }
    // Atalho para obter valores do atributo
    obterAtributo(nome){
      return this.getAttribute(nome)
    }
    //Atalho para mudar o valor do atributo
    mudarAtributo(nome, valor){
      return this.setAttribute(nome, valor)
    }
    //obtem o nome
    get nome (){ 
        return this.obterAtributo('nome')
    }
    
    set nome(valor){
        return this.mudarAtributo('nome', valor)
    }
    
    //Atalho para criar e adicionar elemento
    adicionarElemento(tag){
      return this.appendChild(document.createElement(tag))
    }
    // Cria um atalho para carregar o css externo
    carregarCSS(local){
     return Object.assign( document.createElement('link'),{
         type: 'text/css',
         rel: 'stylesheet',
         href: local
      })
    }
    
}


// ============= Texto ================

class DWC_Texto extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-texto.css')
     this.$root.appendChild(css)
// Cria um elemento span para encapsular o conteúdo
     const span = document.createElement('span')
           span.innerHTML = `<slot></slot>`
           this.$root.appendChild(span)
   }
}

customElements.define('dwc-texto', DWC_Texto)


// ============= Negrito ================

class DWC_Negrito extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-negrito.css')
     this.$root.appendChild(css)
// Cria um elemento span para encapsular o conteúdo
     const span = document.createElement('span')
           span.innerHTML = `<slot></slot>`
           this.$root.appendChild(span)
   }
}

customElements.define('dwc-negrito', DWC_Negrito)
  
// ============= Itálico ================

class DWC_Italico extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-italico.css')
     this.$root.appendChild(css)
// Cria um elemento span para encapsular o conteúdo
     const i = document.createElement('i')
           i.innerHTML = `<slot></slot>`
           this.$root.appendChild(i)
   }
}

customElements.define('dwc-italico', DWC_Italico)
  
// ============= Marcador ================

class DWC_Marcador extends DjeckWebComponents{
  static observedAttributes = ['cor']
  
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-marcador.css')
     this.$root.appendChild(css)
// Cria um elemento span para encapsular o conteúdo
     const mark = document.createElement('mark')
           mark.innerHTML = `<slot></slot>`
           this.$root.appendChild(mark)
   }
   
   attributeChangedCallback( nome, valorAtual, novoValor){
      if( nome === 'cor'){
          this.style.setProperty('--cor', `${novoValor}`)
      }
   }
}

customElements.define('dwc-marcador', DWC_Marcador)


// ============= Titulo ================

class DWC_Titulo extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-titulo.css')
     this.$root.appendChild(css)
// Cria um elemento h1 para encapsular o conteúdo
     const h1 = document.createElement('h1')
           h1.innerHTML = `<slot></slot>`
           this.$root.appendChild(h1)
   }
}

customElements.define('dwc-titulo', DWC_Titulo)


// ============= Subtítulo ================

class DWC_Subtitulo extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-subtitulo.css')
     this.$root.appendChild(css)
// Cria um elemento h2 para encapsular o conteúdo
     const h2 = document.createElement('h2')
           h2.innerHTML = `<slot></slot>`
           this.$root.appendChild(h2)
   }
}

customElements.define('dwc-subtitulo', DWC_Subtitulo)


// ============== Parágrafo ===================

class DWC_Paragrafo extends DjeckWebComponents{
   constructor(){
      super()
      this.$root = this.attachShadow({mode:'open'})
   }
   connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-paragrafo.css')
     this.$root.appendChild(css)
// Cria uma elemento p para armazenar o conteúdo do componente
     let p = document.createElement('p')
        //Insere o onteúdo do componente no elemento p
         p.innerHTML = `<slot></slot>`
         this.$root.appendChild(p)
   }
}


customElements.define('dwc-paragrafo', DWC_Paragrafo)


// ============= Barra de Ferramentas ========

class DWC_Barra_de_ferramentas extends DjeckWebComponents {
      
    constructor() {
      super()
      this.$root = this.attachShadow({ mode: 'open' })
    }
    
    connectedCallback(){
// Carrega o css externo
     const css = this.carregarCSS('assets/css/dwc-barra-de-ferramentas.css')
     this.$root.appendChild(css)
// Cria uma div para armazenar o conteúdo
      const div = document.createElement('div')
            div.innerHTML = `<slot></slot>`
      
      this.div = div
      this.shadowRoot.appendChild(div)
      
      this.selecionarModo()
    }
    
    attributeChangedCallback(nome, valorAntigo, novoValor){
      let t = this
         switch(nome){
           case "cor":
           //  this.style.setProperty('--cor', novoValor)
             break;
             
            case "modo":
                    this.selecionarModo()
            break;
         }
    }
    
    selecionarModo(){
          let modo = this.obterAtributo('modo')
              switch(modo){
                 case "moderna":
                   this.div?.classList.add('moderna')
                   break;
                 case "circular":
                   this.div?.classList.add('circular')
                   break;
              }
    }
    
    static observedAttributes = ["cor", "modo"]
    
}

customElements.define('dwc-barra-de-ferramentas', DWC_Barra_de_ferramentas)


document.querySelector('dwc-barra-de-ferramentas').setAttribute('modo','circular')
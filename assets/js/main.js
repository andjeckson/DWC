// Djeck Web Components
class DjeckWebComponents {
  constructor() {
    this.$raiz = document.documentElement;
  }
}
window.$dwc = new DjeckWebComponents();

class DjeckWebComponentPreloader extends HTMLElement {
  constructor() {
    super();
    this.$root = this.attachShadow({ mode: "closed" });
  }

  connectedCallback() {
    // adiciona css
    this.$root.innerHTML = `<link rel="stylesheet" href="assets/css/preloader.css">`;

    // define cor
    const cor = this.getAttribute("cor") || '#000'
    this.mudarCSS("--cor", this.validarCor(cor) ? cor : "#000");

    // define tamanho
    const tamanho = parseFloat(this.getAttribute("tamanho") || 20);
    this.mudarCSS("--tamanho", `${tamanho}px`);

    // cria preloader
    const preloader = document.createElement("div");
    this.$root.appendChild(preloader);

    // define modo
    const modo = (this.getAttribute("modo") || "padrão").toLowerCase();
    switch (modo) {
      case "ios":
        Array.from({ length: 12 }, (_, i) => {
          const dot = document.createElement("span");
          dot.classList.add("dot");
          dot.style.setProperty("--i", i + 1);
          preloader.appendChild(dot);
          preloader.classList.add('ios-preloader')
        });
        break;
        
      case "miui":
        preloader.classList.add("miui-preloader");
        break;
        
      case "windows":
        Array.from({length: 6}, (_,i)=>{
          const dot = document.createElement("span");
          dot.classList.add("dot");
          dot.style.setProperty("animation-delay", (i + 1) * 0.12 + 's');
          preloader.appendChild(dot);
        })
        
        preloader.classList.add('windows-preloader')
        break;
        
      default:
        const uri = 'http://www.w3.org/2000/svg'
        const svg = document.createElementNS(uri,'svg')
              svg.setAttribute('width', tamanho + 'px')
              svg.setAttribute('height',tamanho + 'px')
              
        preloader.appendChild(svg)
        preloader.classList.add('default-preloader')
        
        const PI = Math.PI
        const R  = tamanho/2
        const C = (2 * PI * R ) - (tamanho * 0.2)
        

        const circulo = document.createElementNS(uri, 'circle')
              circulo.setAttribute("stroke", "var(--cor)")
              circulo.setAttribute('stroke-width', tamanho * 0.1)
              circulo.setAttribute('stroke-dasharray', C)
              circulo.setAttribute( "cx", tamanho/2)
              circulo.setAttribute( "cy",tamanho/2)
              circulo.setAttribute("r",  tamanho / 2.5)
              
              
              svg.appendChild(circulo)
        break;
    }
  }

  // helper para definir variáveis CSS
  mudarCSS(prop, value) {
    this.style.setProperty(prop, value);
  }

  // valida cor rapidamente
  validarCor(value) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(value) || value.startsWith("rgb") || value.startsWith('hsl');
  }
}

window.customElements.define("dwc-preloader", DjeckWebComponentPreloader);
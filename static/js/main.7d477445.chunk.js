(this.webpackJsonplogin=this.webpackJsonplogin||[]).push([[0],{30:function(e,a,t){e.exports=t.p+"static/media/logo.aaae45df.jpeg"},35:function(e,a,t){e.exports=t.p+"static/media/logo02.301f87e3.jpeg"},36:function(e,a,t){e.exports=t(52)},42:function(e,a,t){},43:function(e,a,t){},50:function(e,a,t){},51:function(e,a,t){},52:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(13),o=t.n(l),c=t(15),i=t(5),s=(t(41),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function m(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var u=t(27),d=(t(42),t(16)),E=t(54),h=t(55),f=t(58),p=t(56),g=t(57),v=t(59),b=(t(43),t(30)),w=t.n(b),k=function(){var e=Object(i.f)();return r.a.createElement("div",null,r.a.createElement(g.a,{style:{backgroundColor:"black"}},r.a.createElement(g.a.Brand,{href:"#"}),r.a.createElement("img",{alt:"Carongo",src:w.a,style:{width:"150px",alignItems:"center"}}),r.a.createElement(g.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"mr-sm-2"},r.a.createElement(f.a,{inline:!0},function(){var a=localStorage.getItem("token-carango");return null===a?r.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"mr-sm-2"},r.a.createElement(f.a,{inline:!0},r.a.createElement(v.a.Link,{href:"/login",style:{color:"white"}},"Login"),r.a.createElement(v.a.Link,{href:"/cadastro",style:{color:"white"}},"Cadastro")))):"admin"===Object(d.a)(a).role?r.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"mr-sm-2"},r.a.createElement(f.a,{inline:!0},r.a.createElement(v.a.Link,{href:"/login",style:{color:"white"}},"Home"),r.a.createElement(v.a.Link,{href:"/cadastro",style:{color:"white"}},"Login"),r.a.createElement(v.a.Link,{href:"/sair",onClick:function(a){return function(a){a.preventDefault(),localStorage.removeItem("token-carango"),e.pushState("/")}(a)},style:{color:"white"}},"sair")))):r.a.createElement(g.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"mr-sm-2"},r.a.createElement(f.a,{inline:!0},r.a.createElement(v.a.Link,{href:"/login",style:{color:"white"}},"Home"),r.a.createElement(v.a.Link,{href:"/cadastro",style:{color:"white"}},"Login"))))}())))))},y=(t(50),t(35)),C=t.n(y),L=t(34),j=function(){return r.a.createElement("div",{style:{backgroundColor:"black"}},r.a.createElement("container",{className:"rodape"},r.a.createElement("div",null,r.a.createElement(L.a,{sm:8},r.a.createElement("img",{alt:"Carongo",src:C.a,style:{width:"175px"}}))),r.a.createElement("div",null,r.a.createElement("h1",null,"Integrantes"),r.a.createElement("p",null,"Jo\xe3o Vitor"),r.a.createElement("p",null,"Henrique Leandro"),r.a.createElement("p",null,"Parra"),r.a.createElement("p",null,"Daniel"),r.a.createElement("p",null,"Kaique"),r.a.createElement("p",null,"Murilo"),r.a.createElement("p",null,"Renan"))),r.a.createElement("div",{className:"text-center"},r.a.createElement("h2",null,"Senai de Informatica - 2021")))},N=function(){var e=Object(i.f)(),a=Object(n.useState)(""),t=Object(u.a)(a,2),l=t[0],o=t[1],c=Object(n.useState)(""),s=Object(u.a)(c,2),m=s[0],g=s[1];return r.a.createElement("div",null,r.a.createElement(k,null),r.a.createElement(E.a,{className:"container"},r.a.createElement(h.a,{className:"jumb"},r.a.createElement(f.a,null,r.a.createElement(f.a.Group,{controlId:"formBasicEmail"},r.a.createElement(f.a.Label,null,"Email"),r.a.createElement(f.a.Control,{type:"email",value:l,onChange:function(e){return o(e.target.value)},placeholder:"Digite seu email"})),r.a.createElement(f.a.Group,{controlId:"formBasicPassword"},r.a.createElement(f.a.Label,null,"Senha"),r.a.createElement(f.a.Control,{type:"password",value:m,onChange:function(e){return g(e.target.value)},placeholder:"Digite sua senha"})),r.a.createElement("container",{class:"accont"},r.a.createElement("div",null,r.a.createElement("a",{href:"#esqueciminhasenha"},"Esqueci minha senha")),r.a.createElement("div",null,r.a.createElement("a",{href:"/cadastro"},"Criar conta"))),r.a.createElement(p.a,{style:{marginTop:"18px"},onClick:function(a){return function(a){a.preventDefault(),console.log(l+m),fetch("http://localhost:5000/conta/entrar",{method:"POST",body:JSON.stringify({email:l,senha:m}),headers:{"content-type":"application/json"}}).then((function(e){if(e.ok)return e.json();alert("dados invalidos")})).then((function(a){localStorage.setItem("token-carongo",a.dados);var t=Object(d.a)(a.token);console.log(t),e.push("/....")})).catch((function(e){return console.error(e)}))}(a)},className:"button",variant:"dark",type:"submit"},"Login")))),r.a.createElement(j,null))},S=(t(51),function(){return r.a.createElement("div",null,r.a.createElement(k,null),r.a.createElement(E.a,{className:"container"},r.a.createElement(h.a,{className:"jumb"},r.a.createElement(f.a,null,r.a.createElement(f.a.Group,{controlId:"formBasicEmail"},r.a.createElement(f.a.Label,null,"Nome"),r.a.createElement(f.a.Control,{type:"email",placeholder:"Digite seu nome"})),r.a.createElement(f.a.Group,{controlId:"formBasicEmail"},r.a.createElement(f.a.Label,null,"Email"),r.a.createElement(f.a.Control,{type:"email",placeholder:"Digite seu email"})),r.a.createElement(f.a.Group,{controlId:"formBasicPassword"},r.a.createElement(f.a.Label,null,"Senha"),r.a.createElement(f.a.Control,{type:"password",placeholder:"Digite sua senha"})),r.a.createElement(p.a,{className:"button",variant:"dark",type:"submit"},"Cadastrar")))),r.a.createElement(j,null))}),I=r.a.createElement(c.a,null,r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/login",component:N}),r.a.createElement(i.a,{path:"/cadastro",component:S})));o.a.render(I,document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/Carongo-Web",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("/Carongo-Web","/service-worker.js");s?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):m(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):m(a,e)}))}}()}},[[36,1,2]]]);
//# sourceMappingURL=main.7d477445.chunk.js.map
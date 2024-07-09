"use strict";(self.webpackChunkbefore_storybook=self.webpackChunkbefore_storybook||[]).push([[846],{"./node_modules/.pnpm/@chromatic-com+playwright@0.6.14_@babel+preset-env@7.24.7_@babel+core@7.24.7__@playwright+tes_figaqorzyke5tevr5i3kmlmjbm/node_modules/@chromatic-com/playwright/dist/storybook-config/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{var NodeType;function isElement(n){return n.nodeType===n.ELEMENT_NODE}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>preview_default}),function(NodeType){NodeType[NodeType.Document=0]="Document",NodeType[NodeType.DocumentType=1]="DocumentType",NodeType[NodeType.Element=2]="Element",NodeType[NodeType.Text=3]="Text",NodeType[NodeType.CDATA=4]="CDATA",NodeType[NodeType.Comment=5]="Comment"}(NodeType||(NodeType={}));class Mirror{constructor(){this.idNodeMap=new Map,this.nodeMetaMap=new WeakMap}getId(n){var _a;if(!n)return-1;const id=null===(_a=this.getMeta(n))||void 0===_a?void 0:_a.id;return null!=id?id:-1}getNode(id){return this.idNodeMap.get(id)||null}getIds(){return Array.from(this.idNodeMap.keys())}getMeta(n){return this.nodeMetaMap.get(n)||null}removeNodeFromMap(n){const id=this.getId(n);this.idNodeMap.delete(id),n.childNodes&&n.childNodes.forEach((childNode=>this.removeNodeFromMap(childNode)))}has(id){return this.idNodeMap.has(id)}hasNode(node){return this.nodeMetaMap.has(node)}add(n,meta){const id=meta.id;this.idNodeMap.set(id,n),this.nodeMetaMap.set(n,meta)}replace(id,n){const oldNode=this.getNode(id);if(oldNode){const meta=this.nodeMetaMap.get(oldNode);meta&&this.nodeMetaMap.set(n,meta)}this.idNodeMap.set(id,n)}reset(){this.idNodeMap=new Map,this.nodeMetaMap=new WeakMap}}new WeakMap;const commentre=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;function parse(css,options={}){let lineno=1,column=1;function updatePosition(str){const lines=str.match(/\n/g);lines&&(lineno+=lines.length);const i=str.lastIndexOf("\n");column=-1===i?column+str.length:str.length-i}function position(){const start={line:lineno,column};return node=>(node.position=new Position(start),whitespace(),node)}class Position{constructor(start){this.start=start,this.end={line:lineno,column},this.source=options.source}}Position.prototype.content=css;const errorsList=[];function error(msg){const err=new Error(`${options.source||""}:${lineno}:${column}: ${msg}`);if(err.reason=msg,err.filename=options.source,err.line=lineno,err.column=column,err.source=css,!options.silent)throw err;errorsList.push(err)}function open(){return match(/^{\s*/)}function close(){return match(/^}/)}function rules(){let node;const rules=[];for(whitespace(),comments(rules);css.length&&"}"!==css.charAt(0)&&(node=atrule()||rule());)node&&(rules.push(node),comments(rules));return rules}function match(re){const m=re.exec(css);if(!m)return;const str=m[0];return updatePosition(str),css=css.slice(str.length),m}function whitespace(){match(/^\s*/)}function comments(rules=[]){let c;for(;c=comment();)c&&rules.push(c),c=comment();return rules}function comment(){const pos=position();if("/"!==css.charAt(0)||"*"!==css.charAt(1))return;let i=2;for(;""!==css.charAt(i)&&("*"!==css.charAt(i)||"/"!==css.charAt(i+1));)++i;if(i+=2,""===css.charAt(i-1))return error("End of comment missing");const str=css.slice(2,i-2);return column+=2,updatePosition(str),css=css.slice(i),column+=2,pos({type:"comment",comment:str})}function selector(){for(whitespace();"}"==css[0];)error("extra closing bracket"),css=css.slice(1),whitespace();const m=match(/^(((?<!\\)"(?:\\"|[^"])*"|(?<!\\)'(?:\\'|[^'])*'|[^{])+)/);if(!m)return;const cleanedInput=m[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(m=>m.replace(/,/g,"‌")));return function customSplit(input){const result=[];let currentSegment="",depthParentheses=0,depthBrackets=0,currentStringChar=null;for(const char of input){const hasStringEscape=currentSegment.endsWith("\\");currentStringChar?currentStringChar!==char||hasStringEscape||(currentStringChar=null):"("===char?depthParentheses++:")"===char?depthParentheses--:"["===char?depthBrackets++:"]"===char?depthBrackets--:"'\"".includes(char)&&(currentStringChar=char),","===char&&0===depthParentheses&&0===depthBrackets?(result.push(currentSegment),currentSegment=""):currentSegment+=char}currentSegment&&result.push(currentSegment);return result}(cleanedInput).map((s=>s.replace(/\u200C/g,",").trim()))}function declaration(){const pos=position(),propMatch=match(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(!propMatch)return;const prop=trim(propMatch[0]);if(!match(/^:\s*/))return error("property missing ':'");const val=match(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),ret=pos({type:"declaration",property:prop.replace(commentre,""),value:val?trim(val[0]).replace(commentre,""):""});return match(/^[;\s]*/),ret}function declarations(){const decls=[];if(!open())return error("missing '{'");let decl;for(comments(decls);decl=declaration();)!1!==decl&&(decls.push(decl),comments(decls)),decl=declaration();return close()?decls:error("missing '}'")}function keyframe(){let m;const vals=[],pos=position();for(;m=match(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)vals.push(m[1]),match(/^,\s*/);if(vals.length)return pos({type:"keyframe",values:vals,declarations:declarations()})}const atimport=_compileAtrule("import"),atcharset=_compileAtrule("charset"),atnamespace=_compileAtrule("namespace");function _compileAtrule(name){const re=new RegExp("^@"+name+"\\s*((?:"+['(?<!\\\\)"(?:\\\\"|[^"])*"',"(?<!\\\\)'(?:\\\\'|[^'])*'","[^;]"].join("|")+")+);");return()=>{const pos=position(),m=match(re);if(!m)return;const ret={type:name};return ret[name]=m[1].trim(),pos(ret)}}function atrule(){if("@"===css[0])return function atkeyframes(){const pos=position();let m=match(/^@([-\w]+)?keyframes\s*/);if(!m)return;const vendor=m[1];if(m=match(/^([-\w]+)\s*/),!m)return error("@keyframes missing name");const name=m[1];if(!open())return error("@keyframes missing '{'");let frame,frames=comments();for(;frame=keyframe();)frames.push(frame),frames=frames.concat(comments());return close()?pos({type:"keyframes",name,vendor,keyframes:frames}):error("@keyframes missing '}'")}()||function atmedia(){const pos=position(),m=match(/^@media *([^{]+)/);if(!m)return;const media=trim(m[1]);if(!open())return error("@media missing '{'");const style=comments().concat(rules());return close()?pos({type:"media",media,rules:style}):error("@media missing '}'")}()||function atcustommedia(){const pos=position(),m=match(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(m)return pos({type:"custom-media",name:trim(m[1]),media:trim(m[2])})}()||function atsupports(){const pos=position(),m=match(/^@supports *([^{]+)/);if(!m)return;const supports=trim(m[1]);if(!open())return error("@supports missing '{'");const style=comments().concat(rules());return close()?pos({type:"supports",supports,rules:style}):error("@supports missing '}'")}()||atimport()||atcharset()||atnamespace()||function atdocument(){const pos=position(),m=match(/^@([-\w]+)?document *([^{]+)/);if(!m)return;const vendor=trim(m[1]),doc=trim(m[2]);if(!open())return error("@document missing '{'");const style=comments().concat(rules());return close()?pos({type:"document",document:doc,vendor,rules:style}):error("@document missing '}'")}()||function atpage(){const pos=position();if(!match(/^@page */))return;const sel=selector()||[];if(!open())return error("@page missing '{'");let decl,decls=comments();for(;decl=declaration();)decls.push(decl),decls=decls.concat(comments());return close()?pos({type:"page",selectors:sel,declarations:decls}):error("@page missing '}'")}()||function athost(){const pos=position();if(!match(/^@host\s*/))return;if(!open())return error("@host missing '{'");const style=comments().concat(rules());return close()?pos({type:"host",rules:style}):error("@host missing '}'")}()||function atfontface(){const pos=position();if(!match(/^@font-face\s*/))return;if(!open())return error("@font-face missing '{'");let decl,decls=comments();for(;decl=declaration();)decls.push(decl),decls=decls.concat(comments());return close()?pos({type:"font-face",declarations:decls}):error("@font-face missing '}'")}()}function rule(){const pos=position(),sel=selector();return sel?(comments(),pos({type:"rule",selectors:sel,declarations:declarations()})):error("selector missing")}return addParent(function stylesheet(){const rulesList=rules();return{type:"stylesheet",stylesheet:{source:options.source,rules:rulesList,parsingErrors:errorsList}}}())}function trim(str){return str?str.replace(/^\s+|\s+$/g,""):""}function addParent(obj,parent){const isNode=obj&&"string"==typeof obj.type,childParent=isNode?obj:parent;for(const k of Object.keys(obj)){const value=obj[k];Array.isArray(value)?value.forEach((v=>{addParent(v,childParent)})):value&&"object"==typeof value&&addParent(value,childParent)}return isNode&&Object.defineProperty(obj,"parent",{configurable:!0,writable:!0,enumerable:!1,value:parent||null}),obj}const tagMap={script:"noscript",altglyph:"altGlyph",altglyphdef:"altGlyphDef",altglyphitem:"altGlyphItem",animatecolor:"animateColor",animatemotion:"animateMotion",animatetransform:"animateTransform",clippath:"clipPath",feblend:"feBlend",fecolormatrix:"feColorMatrix",fecomponenttransfer:"feComponentTransfer",fecomposite:"feComposite",feconvolvematrix:"feConvolveMatrix",fediffuselighting:"feDiffuseLighting",fedisplacementmap:"feDisplacementMap",fedistantlight:"feDistantLight",fedropshadow:"feDropShadow",feflood:"feFlood",fefunca:"feFuncA",fefuncb:"feFuncB",fefuncg:"feFuncG",fefuncr:"feFuncR",fegaussianblur:"feGaussianBlur",feimage:"feImage",femerge:"feMerge",femergenode:"feMergeNode",femorphology:"feMorphology",feoffset:"feOffset",fepointlight:"fePointLight",fespecularlighting:"feSpecularLighting",fespotlight:"feSpotLight",fetile:"feTile",feturbulence:"feTurbulence",foreignobject:"foreignObject",glyphref:"glyphRef",lineargradient:"linearGradient",radialgradient:"radialGradient"};function escapeRegExp(str){return str.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}const MEDIA_SELECTOR=/(max|min)-device-(width|height)/,MEDIA_SELECTOR_GLOBAL=new RegExp(MEDIA_SELECTOR.source,"g"),HOVER_SELECTOR=/([^\\]):hover/,HOVER_SELECTOR_GLOBAL=new RegExp(HOVER_SELECTOR.source,"g");function adaptCssForReplay(cssText,cache){const cachedStyle=null==cache?void 0:cache.stylesWithHoverClass.get(cssText);if(cachedStyle)return cachedStyle;const ast=parse(cssText,{silent:!0});if(!ast.stylesheet)return cssText;const selectors=[],medias=[];!function getSelectors(rule){"selectors"in rule&&rule.selectors&&rule.selectors.forEach((selector=>{HOVER_SELECTOR.test(selector)&&selectors.push(selector)})),"media"in rule&&rule.media&&MEDIA_SELECTOR.test(rule.media)&&medias.push(rule.media),"rules"in rule&&rule.rules&&rule.rules.forEach(getSelectors)}(ast.stylesheet);let result=cssText;if(selectors.length>0){const selectorMatcher=new RegExp(selectors.filter(((selector,index)=>selectors.indexOf(selector)===index)).sort(((a,b)=>b.length-a.length)).map((selector=>escapeRegExp(selector))).join("|"),"g");result=result.replace(selectorMatcher,(selector=>{const newSelector=selector.replace(HOVER_SELECTOR_GLOBAL,"$1.\\:hover");return`${selector}, ${newSelector}`}))}if(medias.length>0){const mediaMatcher=new RegExp(medias.filter(((media,index)=>medias.indexOf(media)===index)).sort(((a,b)=>b.length-a.length)).map((media=>escapeRegExp(media))).join("|"),"g");result=result.replace(mediaMatcher,(media=>media.replace(MEDIA_SELECTOR_GLOBAL,"$1-$2")))}return null==cache||cache.stylesWithHoverClass.set(cssText,result),result}function buildNode(n,options){var _a;const{doc,hackCss,cache}=options;switch(n.type){case NodeType.Document:return doc.implementation.createDocument(null,"",null);case NodeType.DocumentType:return doc.implementation.createDocumentType(n.name||"html",n.publicId,n.systemId);case NodeType.Element:{const tagName=function getTagName(n){let tagName=tagMap[n.tagName]?tagMap[n.tagName]:n.tagName;return"link"===tagName&&n.attributes._cssText&&(tagName="style"),tagName}(n);let node;n.isSVG?node=doc.createElementNS("http://www.w3.org/2000/svg",tagName):(n.isCustom&&(null===(_a=doc.defaultView)||void 0===_a?void 0:_a.customElements)&&!doc.defaultView.customElements.get(n.tagName)&&doc.defaultView.customElements.define(n.tagName,class extends doc.defaultView.HTMLElement{}),node=doc.createElement(tagName));const specialAttributes={};for(const name in n.attributes){if(!Object.prototype.hasOwnProperty.call(n.attributes,name))continue;let value=n.attributes[name];if("option"===tagName&&"selected"===name&&!1===value)continue;if(null===value)continue;if(!0===value&&(value=""),name.startsWith("rr_")){specialAttributes[name]=value;continue}const isTextarea="textarea"===tagName&&"value"===name,isRemoteOrDynamicCss="style"===tagName&&"_cssText"===name;if(isRemoteOrDynamicCss&&hackCss&&"string"==typeof value&&(value=adaptCssForReplay(value,cache)),!isTextarea&&!isRemoteOrDynamicCss||"string"!=typeof value)try{if(n.isSVG&&"xlink:href"===name)node.setAttributeNS("http://www.w3.org/1999/xlink",name,value.toString());else if("onload"===name||"onclick"===name||"onmouse"===name.substring(0,7))node.setAttribute("_"+name,value.toString());else{if("meta"===tagName&&"Content-Security-Policy"===n.attributes["http-equiv"]&&"content"===name){node.setAttribute("csp-content",value.toString());continue}("link"!==tagName||"preload"!==n.attributes.rel&&"modulepreload"!==n.attributes.rel||"script"!==n.attributes.as)&&("link"===tagName&&"prefetch"===n.attributes.rel&&"string"==typeof n.attributes.href&&n.attributes.href.endsWith(".js")||("img"===tagName&&n.attributes.srcset&&n.attributes.rr_dataURL?node.setAttribute("rrweb-original-srcset",n.attributes.srcset):node.setAttribute(name,value.toString())))}}catch(error){}else node.appendChild(doc.createTextNode(value)),n.childNodes=[]}for(const name in specialAttributes){const value=specialAttributes[name];if("canvas"===tagName&&"rr_dataURL"===name){const image=document.createElement("img");image.onload=()=>{const ctx=node.getContext("2d");ctx&&ctx.drawImage(image,0,0,image.width,image.height)},image.src=value.toString(),node.RRNodeType&&(node.rr_dataURL=value.toString())}else if("img"===tagName&&"rr_dataURL"===name){const image=node;image.currentSrc.startsWith("data:")||(image.setAttribute("rrweb-original-src",n.attributes.src),image.src=value.toString())}if("rr_width"===name)node.style.width=value.toString();else if("rr_height"===name)node.style.height=value.toString();else if("rr_mediaCurrentTime"===name&&"number"==typeof value)node.currentTime=value;else if("rr_mediaState"===name)switch(value){case"played":node.play().catch((e=>console.warn("media playback error",e)));break;case"paused":node.pause()}else"rr_mediaPlaybackRate"===name&&"number"==typeof value?node.playbackRate=value:"rr_mediaMuted"===name&&"boolean"==typeof value?node.muted=value:"rr_mediaLoop"===name&&"boolean"==typeof value?node.loop=value:"rr_mediaVolume"===name&&"number"==typeof value&&(node.volume=value)}if(n.isShadowHost)if(node.shadowRoot)for(;node.shadowRoot.firstChild;)node.shadowRoot.removeChild(node.shadowRoot.firstChild);else node.attachShadow({mode:"open"});return node}case NodeType.Text:return doc.createTextNode(n.isStyle&&hackCss?adaptCssForReplay(n.textContent,cache):n.textContent);case NodeType.CDATA:return doc.createCDATASection(n.textContent);case NodeType.Comment:return doc.createComment(n.textContent);default:return null}}function buildNodeWithSN(n,options){const{doc,mirror,skipChild=!1,hackCss=!0,afterAppend,cache}=options;if(mirror.has(n.id)){const nodeInMirror=mirror.getNode(n.id);if(function isNodeMetaEqual(a,b){return!(!a||!b||a.type!==b.type)&&(a.type===NodeType.Document?a.compatMode===b.compatMode:a.type===NodeType.DocumentType?a.name===b.name&&a.publicId===b.publicId&&a.systemId===b.systemId:a.type===NodeType.Comment||a.type===NodeType.Text||a.type===NodeType.CDATA?a.textContent===b.textContent:a.type===NodeType.Element&&a.tagName===b.tagName&&JSON.stringify(a.attributes)===JSON.stringify(b.attributes)&&a.isSVG===b.isSVG&&a.needBlock===b.needBlock)}(mirror.getMeta(nodeInMirror),n))return mirror.getNode(n.id)}let node=buildNode(n,{doc,hackCss,cache});if(!node)return null;if(n.rootId&&mirror.getNode(n.rootId)!==doc&&mirror.replace(n.rootId,doc),n.type===NodeType.Document&&(doc.close(),doc.open(),"BackCompat"===n.compatMode&&n.childNodes&&n.childNodes[0].type!==NodeType.DocumentType&&(n.childNodes[0].type===NodeType.Element&&"xmlns"in n.childNodes[0].attributes&&"http://www.w3.org/1999/xhtml"===n.childNodes[0].attributes.xmlns?doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "">'):doc.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "">')),node=doc),mirror.add(node,n),(n.type===NodeType.Document||n.type===NodeType.Element)&&!skipChild)for(const childN of n.childNodes){const childNode=buildNodeWithSN(childN,{doc,mirror,skipChild:!1,hackCss,afterAppend,cache});if(childNode){if(childN.isShadow&&isElement(node)&&node.shadowRoot)node.shadowRoot.appendChild(childNode);else if(n.type===NodeType.Document&&childN.type==NodeType.Element){const htmlElement=childNode;let body=null;htmlElement.childNodes.forEach((child=>{"BODY"===child.nodeName&&(body=child)})),body?(htmlElement.removeChild(body),node.appendChild(childNode),htmlElement.appendChild(body)):node.appendChild(childNode)}else node.appendChild(childNode);afterAppend&&afterAppend(childNode,childN.id)}else console.warn("Failed to rebuild",childN)}return node}function rebuild(n,options){const{doc,onVisit,hackCss=!0,afterAppend,cache,mirror=new Mirror}=options,node=buildNodeWithSN(n,{doc,mirror,skipChild:!1,hackCss,afterAppend,cache});return function visit(mirror,onVisit){for(const id of mirror.getIds())mirror.has(id)&&(node=mirror.getNode(id),onVisit(node));var node}(mirror,(visitedNode=>{onVisit&&onVisit(visitedNode),function handleScroll(node,mirror){const n=mirror.getMeta(node);if((null==n?void 0:n.type)!==NodeType.Element)return;const el=node;for(const name in n.attributes){if(!Object.prototype.hasOwnProperty.call(n.attributes,name)||!name.startsWith("rr_"))continue;const value=n.attributes[name];"rr_scrollLeft"===name&&(el.scrollLeft=value),"rr_scrollTop"===name&&(el.scrollTop=value)}}(visitedNode,mirror)})),node}var __defProp=Object.defineProperty,__name=(target,value)=>__defProp(target,"name",{value,configurable:!0}),pageUrl=new URL(window.location.href);pageUrl.pathname="",pageUrl.search="";var strippedUrl=pageUrl.toString().replace(/\/$/,""),findHtmlNode=__name((node=>node.type===NodeType.Element&&"html"===node.tagName?node:"childNodes"in node?node.childNodes.find((childNode=>findHtmlNode(childNode))):void 0),"findHtmlNode");function snapshotFileName(snapshotId,viewport){return[snapshotId,viewport,"snapshot.json"].join(".")}async function fetchSnapshot(context){const{url,id}=context.storyContext.parameters.server,{viewport}=context.storyContext.globals;let viewportName;viewportName="string"==typeof viewport?viewport:`w${viewport.width}h${viewport.height}`;let response=await fetch(`${url}/${snapshotFileName(id,viewportName)}`);if(!response.ok){const{defaultViewport}=context.storyContext.parameters.viewport;response=await fetch(`${url}/${snapshotFileName(id,defaultViewport)}`)}return response.json()}__name(snapshotFileName,"snapshotFileName"),__name(fetchSnapshot,"fetchSnapshot");var renderToCanvas=__name((async(context,element)=>{const snapshot=await fetchSnapshot(context),htmlNode=findHtmlNode(snapshot),html=await rebuild(htmlNode,{doc:document});return document.replaceChild(html,document.children[0]),document.head.innerHTML+='<script id="storybook-root"><\/script><script id="storybook-docs"><\/script>',context.showMain(),()=>{}}),"renderToCanvas"),preview_default={renderToCanvas,parameters:{server:{url:strippedUrl},layout:"fullscreen"}}},"./node_modules/.pnpm/@storybook+addon-docs@8.1.11_@types+react-dom@18.3.0_prettier@3.3.2/node_modules/@storybook/addon-docs/dist/chunk-GN5PWX3D.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{Object.create,Object.defineProperty,Object.getOwnPropertyDescriptor,Object.getOwnPropertyNames,Object.getPrototypeOf,Object.prototype.hasOwnProperty},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/actions/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{argsEnhancers:()=>argsEnhancers,loaders:()=>loaders});const esm_browser_native={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let getRandomValues;const rnds8=new Uint8Array(16);function rng(){if(!getRandomValues&&(getRandomValues="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!getRandomValues))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return getRandomValues(rnds8)}const byteToHex=[];for(let i=0;i<256;++i)byteToHex.push((i+256).toString(16).slice(1));function unsafeStringify(arr,offset=0){return byteToHex[arr[offset+0]]+byteToHex[arr[offset+1]]+byteToHex[arr[offset+2]]+byteToHex[arr[offset+3]]+"-"+byteToHex[arr[offset+4]]+byteToHex[arr[offset+5]]+"-"+byteToHex[arr[offset+6]]+byteToHex[arr[offset+7]]+"-"+byteToHex[arr[offset+8]]+byteToHex[arr[offset+9]]+"-"+byteToHex[arr[offset+10]]+byteToHex[arr[offset+11]]+byteToHex[arr[offset+12]]+byteToHex[arr[offset+13]]+byteToHex[arr[offset+14]]+byteToHex[arr[offset+15]]}const esm_browser_v4=function v4(options,buf,offset){if(esm_browser_native.randomUUID&&!buf&&!options)return esm_browser_native.randomUUID();const rnds=(options=options||{}).random||(options.rng||rng)();if(rnds[6]=15&rnds[6]|64,rnds[8]=63&rnds[8]|128,buf){offset=offset||0;for(let i=0;i<16;++i)buf[offset+i]=rnds[i];return buf}return unsafeStringify(rnds)};var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_=__webpack_require__("@storybook/core-events/preview-errors"),config={depth:10,clearOnStoryChange:!0,limit:50},findProto=(obj,callback)=>{let proto=Object.getPrototypeOf(obj);return!proto||callback(proto)?proto:findProto(proto,callback)},serializeArg=a=>{if("object"==typeof(e=a)&&e&&findProto(e,(proto=>/^Synthetic(?:Base)?Event$/.test(proto.constructor.name)))&&"function"==typeof e.persist){let e=Object.create(a.constructor.prototype,Object.getOwnPropertyDescriptors(a));e.persist();let viewDescriptor=Object.getOwnPropertyDescriptor(e,"view"),view=viewDescriptor?.value;return"object"==typeof view&&"Window"===view?.constructor.name&&Object.defineProperty(e,"view",{...viewDescriptor,value:Object.create(view.constructor.prototype)}),e}var e;return a};function action(name,options={}){let actionOptions={...config,...options},handler=function(...args){if(options.implicit){let storyRenderer=("__STORYBOOK_PREVIEW__"in external_STORYBOOK_MODULE_GLOBAL_.global?external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_PREVIEW__:void 0)?.storyRenders.find((render=>"playing"===render.phase||"rendering"===render.phase));if(storyRenderer){let deprecated=!window?.FEATURES?.disallowImplicitActionsInRenderV8,error=new external_STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS_.ImplicitActionsDuringRendering({phase:storyRenderer.phase,name,deprecated});if(!deprecated)throw error;console.warn(error)}}let channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),id="object"==typeof crypto&&"function"==typeof crypto.getRandomValues?esm_browser_v4():Date.now().toString(36)+Math.random().toString(36).substring(2),serializedArgs=args.map(serializeArg),normalizedArgs=args.length>1?serializedArgs:serializedArgs[0],actionDisplayToEmit={id,count:0,data:{name,args:normalizedArgs},options:{...actionOptions,maxDepth:5+(actionOptions.depth||3),allowFunction:actionOptions.allowFunction||!1}};channel.emit("storybook/actions/action-event",actionDisplayToEmit)};return handler.isAction=!0,handler.implicit=options.implicit,handler}var isInInitialArgs=(name,initialArgs)=>typeof initialArgs[name]>"u"&&!(name in initialArgs),argsEnhancers=[context=>{let{initialArgs,argTypes,parameters:{actions}}=context;return actions?.disable||!argTypes?{}:Object.entries(argTypes).filter((([name,argType])=>!!argType.action)).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action("string"==typeof argType.action?argType.action:name)),acc)),{})},context=>{let{initialArgs,argTypes,id,parameters:{actions}}=context;if(!actions||actions.disable||!actions.argTypesRegex||!argTypes)return{};let argTypesRegex=new RegExp(actions.argTypesRegex);return Object.entries(argTypes).filter((([name])=>!!argTypesRegex.test(name))).reduce(((acc,[name,argType])=>(isInInitialArgs(name,initialArgs)&&(acc[name]=action(name,{implicit:!0,id})),acc)),{})}],subscribed=!1,loaders=[context=>{let{parameters:{actions}}=context;if(!actions?.disable&&!subscribed&&"__STORYBOOK_TEST_ON_MOCK_CALL__"in external_STORYBOOK_MODULE_GLOBAL_.global&&"function"==typeof external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__){(0,external_STORYBOOK_MODULE_GLOBAL_.global.__STORYBOOK_TEST_ON_MOCK_CALL__)(((mock,args)=>{let name=mock.getMockName();"spy"!==name&&(!/^next\/.*::/.test(name)||["next/router::useRouter()","next/navigation::useRouter()","next/navigation::redirect","next/cache::","next/headers::cookies().set","next/headers::cookies().delete","next/headers::headers().set","next/headers::headers().delete"].some((prefix=>name.startsWith(prefix))))&&action(name)(args)})),subscribed=!0}}]},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,globals:()=>globals,parameters:()=>parameters});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),esm=__webpack_require__("./node_modules/.pnpm/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js"),external_STORYBOOK_MODULE_CLIENT_LOGGER_=__webpack_require__("@storybook/client-logger"),PARAM_KEY="backgrounds",{document:preview_document,window:preview_window}=external_STORYBOOK_MODULE_GLOBAL_.global,clearStyles=selector=>{(Array.isArray(selector)?selector:[selector]).forEach(clearStyle)},clearStyle=selector=>{let element=preview_document.getElementById(selector);element&&element.parentElement?.removeChild(element)},decorators=[(StoryFn,context)=>{let{globals:globals2,parameters:parameters2}=context,gridParameters=parameters2.backgrounds.grid,isActive=!0===globals2.backgrounds?.grid&&!0!==gridParameters.disable,{cellAmount,cellSize,opacity}=gridParameters,isInDocs="docs"===context.viewMode,defaultOffset=void 0===parameters2.layout||"padded"===parameters2.layout?16:0,offsetX=gridParameters.offsetX??(isInDocs?20:defaultOffset),offsetY=gridParameters.offsetY??(isInDocs?20:defaultOffset),gridStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>`\n      ${"docs"===context.viewMode?`#anchor--${context.id} .docs-story`:".sb-show-main"} {\n        background-size: ${[`${cellSize*cellAmount}px ${cellSize*cellAmount}px`,`${cellSize*cellAmount}px ${cellSize*cellAmount}px`,`${cellSize}px ${cellSize}px`,`${cellSize}px ${cellSize}px`].join(", ")} !important;\n        background-position: ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px, ${offsetX}px ${offsetY}px !important;\n        background-blend-mode: difference !important;\n        background-image: linear-gradient(rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ${opacity}) 1px, transparent 1px),\n         linear-gradient(rgba(130, 130, 130, ${opacity/2}) 1px, transparent 1px),\n         linear-gradient(90deg, rgba(130, 130, 130, ${opacity/2}) 1px, transparent 1px) !important;\n      }\n    `),[cellSize]);return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let selectorId="docs"===context.viewMode?`addon-backgrounds-grid-docs-${context.id}`:"addon-backgrounds-grid";isActive?((selector,css)=>{let existingStyle=preview_document.getElementById(selector);if(existingStyle)existingStyle.innerHTML!==css&&(existingStyle.innerHTML=css);else{let style=preview_document.createElement("style");style.setAttribute("id",selector),style.innerHTML=css,preview_document.head.appendChild(style)}})(selectorId,gridStyles):clearStyles(selectorId)}),[isActive,gridStyles,context]),StoryFn()},(StoryFn,context)=>{let{globals:globals2,parameters:parameters2}=context,globalsBackgroundColor=globals2.backgrounds?.value,backgroundsConfig=parameters2.backgrounds,selectedBackgroundColor=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>backgroundsConfig.disable?"transparent":((currentSelectedValue,backgrounds=[],defaultName)=>{if("transparent"===currentSelectedValue)return"transparent";if(backgrounds.find((background=>background.value===currentSelectedValue)))return currentSelectedValue;let defaultBackground=backgrounds.find((background=>background.name===defaultName));if(defaultBackground)return defaultBackground.value;if(defaultName){let availableColors=backgrounds.map((background=>background.name)).join(", ");external_STORYBOOK_MODULE_CLIENT_LOGGER_.logger.warn(esm.T`
        Backgrounds Addon: could not find the default color "${defaultName}".
        These are the available colors for your story based on your configuration:
        ${availableColors}.
      `)}return"transparent"})(globalsBackgroundColor,backgroundsConfig.values,backgroundsConfig.default)),[backgroundsConfig,globalsBackgroundColor]),isActive=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>selectedBackgroundColor&&"transparent"!==selectedBackgroundColor),[selectedBackgroundColor]),selector="docs"===context.viewMode?`#anchor--${context.id} .docs-story`:".sb-show-main",backgroundStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>`\n      ${selector} {\n        background: ${selectedBackgroundColor} !important;\n        ${preview_window.matchMedia("(prefers-reduced-motion: reduce)").matches?"":"transition: background-color 0.3s;"}\n      }\n    `),[selectedBackgroundColor,selector]);return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let selectorId="docs"===context.viewMode?`addon-backgrounds-docs-${context.id}`:"addon-backgrounds-color";isActive?((selector,css,storyId)=>{let existingStyle=preview_document.getElementById(selector);if(existingStyle)existingStyle.innerHTML!==css&&(existingStyle.innerHTML=css);else{let style=preview_document.createElement("style");style.setAttribute("id",selector),style.innerHTML=css;let gridStyleSelector="addon-backgrounds-grid"+(storyId?`-docs-${storyId}`:""),existingGridStyle=preview_document.getElementById(gridStyleSelector);existingGridStyle?existingGridStyle.parentElement?.insertBefore(style,existingGridStyle):preview_document.head.appendChild(style)}})(selectorId,backgroundStyles,"docs"===context.viewMode?context.id:null):clearStyles(selectorId)}),[isActive,backgroundStyles,context]),StoryFn()}],parameters={[PARAM_KEY]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},globals={[PARAM_KEY]:null}},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/docs/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{parameters:()=>parameters});__webpack_require__("./node_modules/.pnpm/@storybook+addon-docs@8.1.11_@types+react-dom@18.3.0_prettier@3.3.2/node_modules/@storybook/addon-docs/dist/chunk-GN5PWX3D.mjs");var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),excludeTags=Object.entries(external_STORYBOOK_MODULE_GLOBAL_.global.TAGS_OPTIONS??{}).reduce(((acc,entry)=>{let[tag,option]=entry;return option.excludeFromDocsStories&&(acc[tag]=!0),acc}),{}),parameters={docs:{renderer:async()=>{let{DocsRenderer}=await Promise.all([__webpack_require__.e(569),__webpack_require__.e(954)]).then(__webpack_require__.bind(__webpack_require__,"./node_modules/.pnpm/@storybook+addon-docs@8.1.11_@types+react-dom@18.3.0_prettier@3.3.2/node_modules/@storybook/addon-docs/dist/DocsRenderer-K4EAMTCU.mjs"));return new DocsRenderer},stories:{filter:story=>0===(story.tags||[]).filter((tag=>excludeTags[tag])).length&&!story.parameters.docs?.disable}}}},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);var external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_CORE_EVENTS_=__webpack_require__("@storybook/core-events"),{document:preview_document}=external_STORYBOOK_MODULE_GLOBAL_.global,channel=external_STORYBOOK_MODULE_PREVIEW_API_.addons.getChannel(),resetHighlight=()=>{let sheetToBeRemoved=preview_document.getElementById("storybookHighlight");sheetToBeRemoved&&sheetToBeRemoved.parentNode?.removeChild(sheetToBeRemoved)};channel.on(external_STORYBOOK_MODULE_CORE_EVENTS_.STORY_CHANGED,resetHighlight),channel.on("storybook/highlight/reset",resetHighlight),channel.on("storybook/highlight/add",(infos=>{resetHighlight();let elements=Array.from(new Set(infos.elements)),sheet=preview_document.createElement("style");sheet.setAttribute("id","storybookHighlight"),sheet.innerHTML=elements.map((target=>`${target}{\n          ${((color="#FF4785",style="dashed")=>`\n  outline: 2px ${style} ${color};\n  outline-offset: 2px;\n  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);\n`)(infos.color,infos.style)}\n         }`)).join(" "),preview_document.head.appendChild(sheet)}))},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/measure/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,globals:()=>globals});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),isProduction=!0,prefix="Invariant failed";function invariant(condition,message){if(!condition){if(isProduction)throw new Error(prefix);var provided="function"==typeof message?message():message,value=provided?"".concat(prefix,": ").concat(provided):prefix;throw new Error(value)}}function getDocumentWidthAndHeight(){let container=external_STORYBOOK_MODULE_GLOBAL_.global.document.documentElement,height=Math.max(container.scrollHeight,container.offsetHeight);return{width:Math.max(container.scrollWidth,container.offsetWidth),height}}function setCanvasWidthAndHeight(canvas,context,{width,height}){canvas.style.width=`${width}px`,canvas.style.height=`${height}px`;let scale=external_STORYBOOK_MODULE_GLOBAL_.global.window.devicePixelRatio;canvas.width=Math.floor(width*scale),canvas.height=Math.floor(height*scale),context.scale(scale,scale)}var state={};function init(){state.canvas||(state=function createCanvas(){let canvas=external_STORYBOOK_MODULE_GLOBAL_.global.document.createElement("canvas");canvas.id="storybook-addon-measure";let context=canvas.getContext("2d");invariant(null!=context);let{width,height}=getDocumentWidthAndHeight();return setCanvasWidthAndHeight(canvas,context,{width,height}),canvas.style.position="absolute",canvas.style.left="0",canvas.style.top="0",canvas.style.zIndex="2147483647",canvas.style.pointerEvents="none",external_STORYBOOK_MODULE_GLOBAL_.global.document.body.appendChild(canvas),{canvas,context,width,height}}())}function clear(){state.context&&state.context.clearRect(0,0,state.width??0,state.height??0)}var colors={margin:"#f6b26b",border:"#ffe599",padding:"#93c47d",content:"#6fa8dc",text:"#232020"},labelPadding=6;function roundedRect(context,{x,y,w,h,r}){x-=w/2,y-=h/2,w<2*r&&(r=w/2),h<2*r&&(r=h/2),context.beginPath(),context.moveTo(x+r,y),context.arcTo(x+w,y,x+w,y+h,r),context.arcTo(x+w,y+h,x,y+h,r),context.arcTo(x,y+h,x,y,r),context.arcTo(x,y,x+w,y,r),context.closePath()}function textWithRect(context,type,{x,y,w,h},text){return roundedRect(context,{x,y,w,h,r:3}),context.fillStyle=`${colors[type]}dd`,context.fill(),context.strokeStyle=colors[type],context.stroke(),context.fillStyle=colors.text,context.fillText(text,x,y),roundedRect(context,{x,y,w,h,r:3}),context.fillStyle=`${colors[type]}dd`,context.fill(),context.strokeStyle=colors[type],context.stroke(),context.fillStyle=colors.text,context.fillText(text,x,y),{x,y,w,h}}function configureText(context,text){context.font="600 12px monospace",context.textBaseline="middle",context.textAlign="center";let metrics=context.measureText(text),actualHeight=metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent;return{w:metrics.width+2*labelPadding,h:actualHeight+2*labelPadding}}function drawLabel(context,measurements,{type,position="center",text},prevRect,external=!1){let{x,y}=function positionCoordinate(position,{padding,border,width,height,top,left}){let contentWidth=width-border.left-border.right-padding.left-padding.right,contentHeight=height-padding.top-padding.bottom-border.top-border.bottom,x=left+border.left+padding.left,y=top+border.top+padding.top;return"top"===position?x+=contentWidth/2:"right"===position?(x+=contentWidth,y+=contentHeight/2):"bottom"===position?(x+=contentWidth/2,y+=contentHeight):"left"===position?y+=contentHeight/2:"center"===position&&(x+=contentWidth/2,y+=contentHeight/2),{x,y}}(position,measurements),{offsetX,offsetY}=function offset(type,position,{margin,border,padding},labelPaddingSize,external){let shift=dir=>0,offsetX=0,offsetY=0,locationMultiplier=external?1:.5,labelPaddingShift=external?2*labelPaddingSize:0;return"padding"===type?shift=dir=>padding[dir]*locationMultiplier+labelPaddingShift:"border"===type?shift=dir=>padding[dir]+border[dir]*locationMultiplier+labelPaddingShift:"margin"===type&&(shift=dir=>padding[dir]+border[dir]+margin[dir]*locationMultiplier+labelPaddingShift),"top"===position?offsetY=-shift("top"):"right"===position?offsetX=shift("right"):"bottom"===position?offsetY=shift("bottom"):"left"===position&&(offsetX=-shift("left")),{offsetX,offsetY}}(type,position,measurements,labelPadding+1,external);x+=offsetX,y+=offsetY;let{w,h}=configureText(context,text);if(prevRect&&function collide(a,b){return Math.abs(a.x-b.x)<Math.abs(a.w+b.w)/2&&Math.abs(a.y-b.y)<Math.abs(a.h+b.h)/2}({x,y,w,h},prevRect)){let adjusted=function overlapAdjustment(position,currentRect,prevRect){return"top"===position?currentRect.y=prevRect.y-prevRect.h-labelPadding:"right"===position?currentRect.x=prevRect.x+prevRect.w/2+labelPadding+currentRect.w/2:"bottom"===position?currentRect.y=prevRect.y+prevRect.h+labelPadding:"left"===position&&(currentRect.x=prevRect.x-prevRect.w/2-labelPadding-currentRect.w/2),{x:currentRect.x,y:currentRect.y}}(position,{x,y,w,h},prevRect);x=adjusted.x,y=adjusted.y}return textWithRect(context,type,{x,y,w,h},text)}function drawFloatingLabel(context,measurements,{type,text}){let{floatingAlignment:floatingAlignment2,extremities}=measurements,x=extremities[floatingAlignment2.x],y=extremities[floatingAlignment2.y],{w,h}=configureText(context,text),{offsetX,offsetY}=function floatingOffset(alignment,{w,h}){let deltaW=.5*w+labelPadding,deltaH=.5*h+labelPadding;return{offsetX:("left"===alignment.x?-1:1)*deltaW,offsetY:("top"===alignment.y?-1:1)*deltaH}}(floatingAlignment2,{w,h});return x+=offsetX,y+=offsetY,textWithRect(context,type,{x,y,w,h},text)}function drawStack(context,measurements,stack,external){let rects=[];stack.forEach(((l,idx)=>{let rect=external&&"center"===l.position?drawFloatingLabel(context,measurements,l):drawLabel(context,measurements,l,rects[idx-1],external);rects[idx]=rect}))}var colors2={margin:"#f6b26ba8",border:"#ffe599a8",padding:"#93c47d8c",content:"#6fa8dca8"},SMALL_NODE_SIZE=30;function pxToNumber(px){return parseInt(px.replace("px",""),10)}function round(value){return Number.isInteger(value)?value:value.toFixed(2)}function filterZeroValues(labels){return labels.filter((l=>0!==l.text&&"0"!==l.text))}function floatingAlignment(extremities){let windowExtremities_top=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,windowExtremities_bottom=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY+external_STORYBOOK_MODULE_GLOBAL_.global.window.innerHeight,windowExtremities_left=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX,windowExtremities_right=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX+external_STORYBOOK_MODULE_GLOBAL_.global.window.innerWidth,distances_top=Math.abs(windowExtremities_top-extremities.top),distances_bottom=Math.abs(windowExtremities_bottom-extremities.bottom);return{x:Math.abs(windowExtremities_left-extremities.left)>Math.abs(windowExtremities_right-extremities.right)?"left":"right",y:distances_top>distances_bottom?"top":"bottom"}}function drawBoxModel(element){return context=>{if(element&&context){let measurements=function measureElement(element){let style=external_STORYBOOK_MODULE_GLOBAL_.global.getComputedStyle(element),{top,left,right,bottom,width,height}=element.getBoundingClientRect(),{marginTop,marginBottom,marginLeft,marginRight,paddingTop,paddingBottom,paddingLeft,paddingRight,borderBottomWidth,borderTopWidth,borderLeftWidth,borderRightWidth}=style;top+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,left+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX,bottom+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollY,right+=external_STORYBOOK_MODULE_GLOBAL_.global.window.scrollX;let margin={top:pxToNumber(marginTop),bottom:pxToNumber(marginBottom),left:pxToNumber(marginLeft),right:pxToNumber(marginRight)},padding={top:pxToNumber(paddingTop),bottom:pxToNumber(paddingBottom),left:pxToNumber(paddingLeft),right:pxToNumber(paddingRight)},border={top:pxToNumber(borderTopWidth),bottom:pxToNumber(borderBottomWidth),left:pxToNumber(borderLeftWidth),right:pxToNumber(borderRightWidth)},extremities={top:top-margin.top,bottom:bottom+margin.bottom,left:left-margin.left,right:right+margin.right};return{margin,padding,border,top,left,bottom,right,width,height,extremities,floatingAlignment:floatingAlignment(extremities)}}(element),marginLabels=function drawMargin(context,{margin,width,height,top,left,bottom,right}){let marginHeight=height+margin.bottom+margin.top;return context.fillStyle=colors2.margin,context.fillRect(left,top-margin.top,width,margin.top),context.fillRect(right,top-margin.top,margin.right,marginHeight),context.fillRect(left,bottom,width,margin.bottom),context.fillRect(left-margin.left,top-margin.top,margin.left,marginHeight),filterZeroValues([{type:"margin",text:round(margin.top),position:"top"},{type:"margin",text:round(margin.right),position:"right"},{type:"margin",text:round(margin.bottom),position:"bottom"},{type:"margin",text:round(margin.left),position:"left"}])}(context,measurements),paddingLabels=function drawPadding(context,{padding,border,width,height,top,left,bottom,right}){let paddingWidth=width-border.left-border.right,paddingHeight=height-padding.top-padding.bottom-border.top-border.bottom;return context.fillStyle=colors2.padding,context.fillRect(left+border.left,top+border.top,paddingWidth,padding.top),context.fillRect(right-padding.right-border.right,top+padding.top+border.top,padding.right,paddingHeight),context.fillRect(left+border.left,bottom-padding.bottom-border.bottom,paddingWidth,padding.bottom),context.fillRect(left+border.left,top+padding.top+border.top,padding.left,paddingHeight),filterZeroValues([{type:"padding",text:padding.top,position:"top"},{type:"padding",text:padding.right,position:"right"},{type:"padding",text:padding.bottom,position:"bottom"},{type:"padding",text:padding.left,position:"left"}])}(context,measurements),borderLabels=function drawBorder(context,{border,width,height,top,left,bottom,right}){let borderHeight=height-border.top-border.bottom;return context.fillStyle=colors2.border,context.fillRect(left,top,width,border.top),context.fillRect(left,bottom-border.bottom,width,border.bottom),context.fillRect(left,top+border.top,border.left,borderHeight),context.fillRect(right-border.right,top+border.top,border.right,borderHeight),filterZeroValues([{type:"border",text:border.top,position:"top"},{type:"border",text:border.right,position:"right"},{type:"border",text:border.bottom,position:"bottom"},{type:"border",text:border.left,position:"left"}])}(context,measurements),contentLabels=function drawContent(context,{padding,border,width,height,top,left}){let contentWidth=width-border.left-border.right-padding.left-padding.right,contentHeight=height-padding.top-padding.bottom-border.top-border.bottom;return context.fillStyle=colors2.content,context.fillRect(left+border.left+padding.left,top+border.top+padding.top,contentWidth,contentHeight),[{type:"content",position:"center",text:`${round(contentWidth)} x ${round(contentHeight)}`}]}(context,measurements);!function labelStacks(context,measurements,labels,externalLabels){let stacks=labels.reduce(((acc,l)=>(Object.prototype.hasOwnProperty.call(acc,l.position)||(acc[l.position]=[]),acc[l.position]?.push(l),acc)),{});stacks.top&&drawStack(context,measurements,stacks.top,externalLabels),stacks.right&&drawStack(context,measurements,stacks.right,externalLabels),stacks.bottom&&drawStack(context,measurements,stacks.bottom,externalLabels),stacks.left&&drawStack(context,measurements,stacks.left,externalLabels),stacks.center&&drawStack(context,measurements,stacks.center,externalLabels)}(context,measurements,[...contentLabels,...paddingLabels,...borderLabels,...marginLabels],measurements.width<=3*SMALL_NODE_SIZE||measurements.height<=SMALL_NODE_SIZE)}}}function drawSelectedElement(element){!function draw(callback){clear(),callback(state.context)}(drawBoxModel(element))}var nodeAtPointerRef,pointer={x:0,y:0};function findAndDrawElement(x,y){nodeAtPointerRef=((x,y)=>{let element=external_STORYBOOK_MODULE_GLOBAL_.global.document.elementFromPoint(x,y),crawlShadows=node=>{if(node&&node.shadowRoot){let nestedElement=node.shadowRoot.elementFromPoint(x,y);return node.isEqualNode(nestedElement)?node:nestedElement.shadowRoot?crawlShadows(nestedElement):nestedElement}return node};return crawlShadows(element)||element})(x,y),drawSelectedElement(nodeAtPointerRef)}var PARAM_KEY="measureEnabled",decorators=[(StoryFn,context)=>{let{measureEnabled}=context.globals;return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let onPointerMove=event=>{window.requestAnimationFrame((()=>{event.stopPropagation(),pointer.x=event.clientX,pointer.y=event.clientY}))};return document.addEventListener("pointermove",onPointerMove),()=>{document.removeEventListener("pointermove",onPointerMove)}}),[]),(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let onResize=()=>{window.requestAnimationFrame((()=>{!function rescale(){invariant(state.canvas,"Canvas should exist in the state."),invariant(state.context,"Context should exist in the state."),setCanvasWidthAndHeight(state.canvas,state.context,{width:0,height:0});let{width,height}=getDocumentWidthAndHeight();setCanvasWidthAndHeight(state.canvas,state.context,{width,height}),state.width=width,state.height=height}()}))};return"story"===context.viewMode&&measureEnabled&&(document.addEventListener("pointerover",(event=>{window.requestAnimationFrame((()=>{event.stopPropagation(),findAndDrawElement(event.clientX,event.clientY)}))})),init(),window.addEventListener("resize",onResize),findAndDrawElement(pointer.x,pointer.y)),()=>{window.removeEventListener("resize",onResize),function destroy(){state.canvas&&(clear(),state.canvas.parentNode?.removeChild(state.canvas),state={})}()}}),[measureEnabled,context.viewMode]),StoryFn()}],globals={[PARAM_KEY]:!1}},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/outline/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,globals:()=>globals});var external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("@storybook/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),esm=__webpack_require__("./node_modules/.pnpm/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js"),clearStyles=selector=>{(Array.isArray(selector)?selector:[selector]).forEach(clearStyle)},clearStyle=input=>{let selector="string"==typeof input?input:input.join(""),element=external_STORYBOOK_MODULE_GLOBAL_.global.document.getElementById(selector);element&&element.parentElement&&element.parentElement.removeChild(element)},PARAM_KEY="outline";var decorators=[(StoryFn,context)=>{let{globals:globals2}=context,isActive=[!0,"true"].includes(globals2.outline),isInDocs="docs"===context.viewMode,outlineStyles=(0,external_STORYBOOK_MODULE_PREVIEW_API_.useMemo)((()=>function outlineCSS(selector){return esm.T`
    ${selector} body {
      outline: 1px solid #2980b9 !important;
    }

    ${selector} article {
      outline: 1px solid #3498db !important;
    }

    ${selector} nav {
      outline: 1px solid #0088c3 !important;
    }

    ${selector} aside {
      outline: 1px solid #33a0ce !important;
    }

    ${selector} section {
      outline: 1px solid #66b8da !important;
    }

    ${selector} header {
      outline: 1px solid #99cfe7 !important;
    }

    ${selector} footer {
      outline: 1px solid #cce7f3 !important;
    }

    ${selector} h1 {
      outline: 1px solid #162544 !important;
    }

    ${selector} h2 {
      outline: 1px solid #314e6e !important;
    }

    ${selector} h3 {
      outline: 1px solid #3e5e85 !important;
    }

    ${selector} h4 {
      outline: 1px solid #449baf !important;
    }

    ${selector} h5 {
      outline: 1px solid #c7d1cb !important;
    }

    ${selector} h6 {
      outline: 1px solid #4371d0 !important;
    }

    ${selector} main {
      outline: 1px solid #2f4f90 !important;
    }

    ${selector} address {
      outline: 1px solid #1a2c51 !important;
    }

    ${selector} div {
      outline: 1px solid #036cdb !important;
    }

    ${selector} p {
      outline: 1px solid #ac050b !important;
    }

    ${selector} hr {
      outline: 1px solid #ff063f !important;
    }

    ${selector} pre {
      outline: 1px solid #850440 !important;
    }

    ${selector} blockquote {
      outline: 1px solid #f1b8e7 !important;
    }

    ${selector} ol {
      outline: 1px solid #ff050c !important;
    }

    ${selector} ul {
      outline: 1px solid #d90416 !important;
    }

    ${selector} li {
      outline: 1px solid #d90416 !important;
    }

    ${selector} dl {
      outline: 1px solid #fd3427 !important;
    }

    ${selector} dt {
      outline: 1px solid #ff0043 !important;
    }

    ${selector} dd {
      outline: 1px solid #e80174 !important;
    }

    ${selector} figure {
      outline: 1px solid #ff00bb !important;
    }

    ${selector} figcaption {
      outline: 1px solid #bf0032 !important;
    }

    ${selector} table {
      outline: 1px solid #00cc99 !important;
    }

    ${selector} caption {
      outline: 1px solid #37ffc4 !important;
    }

    ${selector} thead {
      outline: 1px solid #98daca !important;
    }

    ${selector} tbody {
      outline: 1px solid #64a7a0 !important;
    }

    ${selector} tfoot {
      outline: 1px solid #22746b !important;
    }

    ${selector} tr {
      outline: 1px solid #86c0b2 !important;
    }

    ${selector} th {
      outline: 1px solid #a1e7d6 !important;
    }

    ${selector} td {
      outline: 1px solid #3f5a54 !important;
    }

    ${selector} col {
      outline: 1px solid #6c9a8f !important;
    }

    ${selector} colgroup {
      outline: 1px solid #6c9a9d !important;
    }

    ${selector} button {
      outline: 1px solid #da8301 !important;
    }

    ${selector} datalist {
      outline: 1px solid #c06000 !important;
    }

    ${selector} fieldset {
      outline: 1px solid #d95100 !important;
    }

    ${selector} form {
      outline: 1px solid #d23600 !important;
    }

    ${selector} input {
      outline: 1px solid #fca600 !important;
    }

    ${selector} keygen {
      outline: 1px solid #b31e00 !important;
    }

    ${selector} label {
      outline: 1px solid #ee8900 !important;
    }

    ${selector} legend {
      outline: 1px solid #de6d00 !important;
    }

    ${selector} meter {
      outline: 1px solid #e8630c !important;
    }

    ${selector} optgroup {
      outline: 1px solid #b33600 !important;
    }

    ${selector} option {
      outline: 1px solid #ff8a00 !important;
    }

    ${selector} output {
      outline: 1px solid #ff9619 !important;
    }

    ${selector} progress {
      outline: 1px solid #e57c00 !important;
    }

    ${selector} select {
      outline: 1px solid #e26e0f !important;
    }

    ${selector} textarea {
      outline: 1px solid #cc5400 !important;
    }

    ${selector} details {
      outline: 1px solid #33848f !important;
    }

    ${selector} summary {
      outline: 1px solid #60a1a6 !important;
    }

    ${selector} command {
      outline: 1px solid #438da1 !important;
    }

    ${selector} menu {
      outline: 1px solid #449da6 !important;
    }

    ${selector} del {
      outline: 1px solid #bf0000 !important;
    }

    ${selector} ins {
      outline: 1px solid #400000 !important;
    }

    ${selector} img {
      outline: 1px solid #22746b !important;
    }

    ${selector} iframe {
      outline: 1px solid #64a7a0 !important;
    }

    ${selector} embed {
      outline: 1px solid #98daca !important;
    }

    ${selector} object {
      outline: 1px solid #00cc99 !important;
    }

    ${selector} param {
      outline: 1px solid #37ffc4 !important;
    }

    ${selector} video {
      outline: 1px solid #6ee866 !important;
    }

    ${selector} audio {
      outline: 1px solid #027353 !important;
    }

    ${selector} source {
      outline: 1px solid #012426 !important;
    }

    ${selector} canvas {
      outline: 1px solid #a2f570 !important;
    }

    ${selector} track {
      outline: 1px solid #59a600 !important;
    }

    ${selector} map {
      outline: 1px solid #7be500 !important;
    }

    ${selector} area {
      outline: 1px solid #305900 !important;
    }

    ${selector} a {
      outline: 1px solid #ff62ab !important;
    }

    ${selector} em {
      outline: 1px solid #800b41 !important;
    }

    ${selector} strong {
      outline: 1px solid #ff1583 !important;
    }

    ${selector} i {
      outline: 1px solid #803156 !important;
    }

    ${selector} b {
      outline: 1px solid #cc1169 !important;
    }

    ${selector} u {
      outline: 1px solid #ff0430 !important;
    }

    ${selector} s {
      outline: 1px solid #f805e3 !important;
    }

    ${selector} small {
      outline: 1px solid #d107b2 !important;
    }

    ${selector} abbr {
      outline: 1px solid #4a0263 !important;
    }

    ${selector} q {
      outline: 1px solid #240018 !important;
    }

    ${selector} cite {
      outline: 1px solid #64003c !important;
    }

    ${selector} dfn {
      outline: 1px solid #b4005a !important;
    }

    ${selector} sub {
      outline: 1px solid #dba0c8 !important;
    }

    ${selector} sup {
      outline: 1px solid #cc0256 !important;
    }

    ${selector} time {
      outline: 1px solid #d6606d !important;
    }

    ${selector} code {
      outline: 1px solid #e04251 !important;
    }

    ${selector} kbd {
      outline: 1px solid #5e001f !important;
    }

    ${selector} samp {
      outline: 1px solid #9c0033 !important;
    }

    ${selector} var {
      outline: 1px solid #d90047 !important;
    }

    ${selector} mark {
      outline: 1px solid #ff0053 !important;
    }

    ${selector} bdi {
      outline: 1px solid #bf3668 !important;
    }

    ${selector} bdo {
      outline: 1px solid #6f1400 !important;
    }

    ${selector} ruby {
      outline: 1px solid #ff7b93 !important;
    }

    ${selector} rt {
      outline: 1px solid #ff2f54 !important;
    }

    ${selector} rp {
      outline: 1px solid #803e49 !important;
    }

    ${selector} span {
      outline: 1px solid #cc2643 !important;
    }

    ${selector} br {
      outline: 1px solid #db687d !important;
    }

    ${selector} wbr {
      outline: 1px solid #db175b !important;
    }`}(isInDocs?'[data-story-block="true"]':".sb-show-main")),[context]);return(0,external_STORYBOOK_MODULE_PREVIEW_API_.useEffect)((()=>{let selectorId=isInDocs?`addon-outline-docs-${context.id}`:"addon-outline";return isActive?((selector,css)=>{let existingStyle=external_STORYBOOK_MODULE_GLOBAL_.global.document.getElementById(selector);if(existingStyle)existingStyle.innerHTML!==css&&(existingStyle.innerHTML=css);else{let style=external_STORYBOOK_MODULE_GLOBAL_.global.document.createElement("style");style.setAttribute("id",selector),style.innerHTML=css,external_STORYBOOK_MODULE_GLOBAL_.global.document.head.appendChild(style)}})(selectorId,outlineStyles):clearStyles(selectorId),()=>{clearStyles(selectorId)}}),[isActive,outlineStyles,context]),StoryFn()}],globals={[PARAM_KEY]:!1}},"./node_modules/.pnpm/@storybook+addon-essentials@8.1.11_@types+react-dom@18.3.0_@types+react@18.3.3_prettier@3.3.2_3gcrl44udhkmkldstedtvnzqyy/node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{globals:()=>globals});var globals={viewport:"reset",viewportRotated:!1}},"./node_modules/.pnpm/@storybook+server@8.1.11/node_modules/@storybook/server/dist/entry-preview.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{parameters:()=>parameters,render:()=>render,renderToCanvas:()=>renderToCanvas});var _storybook_global__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("@storybook/global"),ts_dedent__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js"),_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("@storybook/preview-api"),{fetch,Node}=_storybook_global__WEBPACK_IMPORTED_MODULE_0__.global,defaultFetchStoryHtml=async(url,path,params,storyContext)=>{let fetchUrl=new URL(`${url}/${path}`);return fetchUrl.search=new URLSearchParams({...storyContext.globals,...params}).toString(),(await fetch(fetchUrl)).text()},buildStoryArgs=(args,argTypes)=>{let storyArgs={...args};return Object.keys(argTypes).forEach((key=>{let argType=argTypes[key],{control}=argType,controlType=control&&"object"==typeof control&&"type"in control&&control.type?.toLowerCase(),argValue=storyArgs[key];switch(controlType){case"date":storyArgs[key]=new Date(argValue).toISOString();break;case"object":storyArgs[key]=JSON.stringify(argValue)}})),storyArgs},render=args=>{};async function renderToCanvas({id,title,name,showMain,showError,forceRemount,storyFn,storyContext,storyContext:{parameters:parameters2,args,argTypes}},canvasElement){storyFn();let storyArgs=buildStoryArgs(args,argTypes),{server:{url,id:storyId,fetchStoryHtml=defaultFetchStoryHtml,params}}=parameters2,fetchId=storyId||id,storyParams={...params,...storyArgs},element=await fetchStoryHtml(url,fetchId,storyParams,storyContext);if(showMain(),"string"==typeof element)canvasElement.innerHTML=element,(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.simulatePageLoad)(canvasElement);else if(element instanceof Node){if(canvasElement.firstChild===element&&!1===forceRemount)return;canvasElement.innerHTML="",canvasElement.appendChild(element),(0,_storybook_preview_api__WEBPACK_IMPORTED_MODULE_1__.simulateDOMContentLoaded)()}else showError({title:`Expecting an HTML snippet or DOM node from the story: "${name}" of "${title}".`,description:ts_dedent__WEBPACK_IMPORTED_MODULE_2__.T`
        Did you forget to return the HTML snippet from the story?
        Use "() => <your snippet or node>" or when defining the story.
      `})}var parameters={renderer:"server"}},"./node_modules/.pnpm/ts-dedent@2.2.0/node_modules/ts-dedent/esm/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{function dedent(templ){for(var values=[],_i=1;_i<arguments.length;_i++)values[_i-1]=arguments[_i];var strings=Array.from("string"==typeof templ?[templ]:templ);strings[strings.length-1]=strings[strings.length-1].replace(/\r?\n([\t ]*)$/,"");var indentLengths=strings.reduce((function(arr,str){var matches=str.match(/\n([\t ]+|(?!\s).)/g);return matches?arr.concat(matches.map((function(match){var _a,_b;return null!==(_b=null===(_a=match.match(/[\t ]/g))||void 0===_a?void 0:_a.length)&&void 0!==_b?_b:0}))):arr}),[]);if(indentLengths.length){var pattern_1=new RegExp("\n[\t ]{"+Math.min.apply(Math,indentLengths)+"}","g");strings=strings.map((function(str){return str.replace(pattern_1,"\n")}))}strings[0]=strings[0].replace(/^\r?\n/,"");var string=strings[0];return values.forEach((function(value,i){var endentations=string.match(/(?:^|\n)( *)$/),endentation=endentations?endentations[1]:"",indentedValue=value;"string"==typeof value&&value.includes("\n")&&(indentedValue=String(value).split("\n").map((function(str,i){return 0===i?str:""+endentation+str})).join("\n")),string+=indentedValue+strings[i+1]})),string}__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__,T:()=>dedent});const __WEBPACK_DEFAULT_EXPORT__=dedent}}]);
//# sourceMappingURL=846.a3983fa0.iframe.bundle.js.map
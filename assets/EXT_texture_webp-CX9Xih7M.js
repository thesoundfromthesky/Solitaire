import{G as a,A as n}from"./glTFLoader-DSuQ6fCb.js";import{u as p,r as _}from"./index-Be5AFUID.js";import"./objectModelMapping-D1NIBR4P.js";const r="EXT_texture_webp";class c{constructor(e){this.name=r,this._loader=e,this.enabled=e.isExtensionUsed(r)}dispose(){this._loader=null}_loadTextureAsync(e,s,o){return a.LoadExtensionAsync(e,s,this.name,(i,l)=>{const m=s.sampler==null?a.DefaultSampler:n.Get(`${e}/sampler`,this._loader.gltf.samplers,s.sampler),d=n.Get(`${i}/source`,this._loader.gltf.images,l.source);return this._loader._createTextureAsync(e,m,d,u=>{o(u)},void 0,!s._textureInfo.nonColorData)})}}p(r);_(r,!0,t=>new c(t));export{c as EXT_texture_webp};

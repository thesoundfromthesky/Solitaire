import{G as i,A as u}from"./glTFLoader-DSuQ6fCb.js";import{p as m,u as h,r as p}from"./index-Be5AFUID.js";import"./objectModelMapping-D1NIBR4P.js";const r="EXT_meshopt_compression";class d{constructor(t){this.name=r,this.enabled=t.isExtensionUsed(r),this._loader=t}dispose(){this._loader=null}loadBufferViewAsync(t,a){return i.LoadExtensionAsync(t,a,this.name,(c,e)=>{const s=a;if(s._meshOptData)return s._meshOptData;const f=u.Get(`${t}/buffer`,this._loader.gltf.buffers,e.buffer);return s._meshOptData=this._loader.loadBufferAsync(`/buffers/${f.index}`,f,e.byteOffset||0,e.byteLength).then(n=>m.Default.decodeGltfBufferAsync(n,e.count,e.byteStride,e.mode,e.filter)),s._meshOptData})}}h(r);p(r,!0,o=>new d(o));export{d as EXT_meshopt_compression};

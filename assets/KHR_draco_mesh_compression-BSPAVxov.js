import{D as h,c as o,u as A,r as D}from"./index-Be5AFUID.js";import{G as E,A as f,L as I}from"./glTFLoader-DSuQ6fCb.js";import"./objectModelMapping-D1NIBR4P.js";const l="KHR_draco_mesh_compression";class G{constructor(n){this.name=l,this.useNormalizedFlagFromAccessor=!0,this._loader=n,this.enabled=h.DefaultAvailable&&this._loader.isExtensionUsed(l)}dispose(){delete this.dracoDecoder,this._loader=null}_loadVertexDataAsync(n,r,s){return E.LoadExtensionAsync(n,r,this.name,(T,_)=>{if(r.mode!=null&&r.mode!==4&&r.mode!==5)throw new Error(`${n}: Unsupported mode ${r.mode}`);const m={},O={},e=(i,t)=>{const d=_.attributes[i];if(d!=null&&(s._delayInfo=s._delayInfo||[],s._delayInfo.indexOf(t)===-1&&s._delayInfo.push(t),m[t]=d,this.useNormalizedFlagFromAccessor)){const c=f.TryGet(this._loader.gltf.accessors,r.attributes[i]);c&&(O[t]=c.normalized||!1)}};e("POSITION",o.PositionKind),e("NORMAL",o.NormalKind),e("TANGENT",o.TangentKind),e("TEXCOORD_0",o.UVKind),e("TEXCOORD_1",o.UV2Kind),e("TEXCOORD_2",o.UV3Kind),e("TEXCOORD_3",o.UV4Kind),e("TEXCOORD_4",o.UV5Kind),e("TEXCOORD_5",o.UV6Kind),e("JOINTS_0",o.MatricesIndicesKind),e("WEIGHTS_0",o.MatricesWeightsKind),e("COLOR_0",o.ColorKind);const a=f.Get(T,this._loader.gltf.bufferViews,_.bufferView);return a._dracoBabylonGeometry||(a._dracoBabylonGeometry=this._loader.loadBufferViewAsync(`/bufferViews/${a.index}`,a).then(i=>{const t=this.dracoDecoder||h.Default,d=f.TryGet(this._loader.gltf.accessors,r.attributes.POSITION),c=!this._loader.parent.alwaysComputeBoundingBox&&!s.skeleton&&d?I(d):null;return t._decodeMeshToGeometryForGltfAsync(s.name,this._loader.babylonScene,i,m,O,c).catch(y=>{throw new Error(`${n}: ${y.message}`)})})),a._dracoBabylonGeometry})}}A(l);D(l,!0,u=>new G(u));export{G as KHR_draco_mesh_compression};

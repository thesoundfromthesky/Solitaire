import{I as a,u as c,r as h}from"./index-Be5AFUID.js";import{G as d}from"./glTFLoader-DSuQ6fCb.js";import"./objectModelMapping-D1NIBR4P.js";const i="KHR_materials_volume";class f{constructor(t){this.name=i,this.order=173,this._loader=t,this.enabled=this._loader.isExtensionUsed(i),this.enabled&&this._loader._disableInstancedMesh++}dispose(){this.enabled&&this._loader._disableInstancedMesh--,this._loader=null}loadMaterialPropertiesAsync(t,u,e){return d.LoadExtensionAsync(t,u,this.name,(s,o)=>{const r=new Array;return r.push(this._loader.loadMaterialPropertiesAsync(t,u,e)),r.push(this._loadVolumePropertiesAsync(s,u,e,o)),Promise.all(r).then(()=>{})})}_loadVolumePropertiesAsync(t,u,e,s){if(!(e instanceof a))throw new Error(`${t}: Material type not supported`);if(!e.subSurface.isRefractionEnabled&&!e.subSurface.isTranslucencyEnabled||!s.thicknessFactor)return Promise.resolve();e.subSurface.volumeIndexOfRefraction=e.indexOfRefraction;const o=s.attenuationDistance!==void 0?s.attenuationDistance:Number.MAX_VALUE;return e.subSurface.tintColorAtDistance=o,s.attenuationColor!==void 0&&s.attenuationColor.length==3&&e.subSurface.tintColor.copyFromFloats(s.attenuationColor[0],s.attenuationColor[1],s.attenuationColor[2]),e.subSurface.minimumThickness=0,e.subSurface.maximumThickness=s.thicknessFactor,e.subSurface.useThicknessAsDepth=!0,s.thicknessTexture?(s.thicknessTexture.nonColorData=!0,this._loader.loadTextureInfoAsync(`${t}/thicknessTexture`,s.thicknessTexture).then(r=>{r.name=`${e.name} (Thickness)`,e.subSurface.thicknessTexture=r,e.subSurface.useGltfStyleTextures=!0})):Promise.resolve()}}c(i);h(i,!0,n=>new f(n));export{f as KHR_materials_volume};

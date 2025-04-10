import{u as _,r as h}from"./index-Be5AFUID.js";import{b as x}from"./declarationMapper-CeGCuw0w.js";import{A as y}from"./objectModelMapping-D1NIBR4P.js";const s="KHR_node_selectability";x("event/onSelect",s,{blocks:["FlowGraphMeshPickEventBlock","FlowGraphGetVariableBlock","FlowGraphIndexOfBlock","KHR_interactivity/FlowGraphGLTFDataProvider"],configuration:{stopPropagation:{name:"stopPropagation"},nodeIndex:{name:"variable",toBlock:"FlowGraphGetVariableBlock",dataTransformer(e){return["pickedMesh_"+e[0]]}}},outputs:{values:{selectedNodeIndex:{name:"index",toBlock:"FlowGraphIndexOfBlock"},controllerIndex:{name:"pointerId"},selectionPoint:{name:"pickedPoint"},selectionRayOrigin:{name:"pickOrigin"}},flows:{out:{name:"done"}}},interBlockConnectors:[{input:"asset",output:"value",inputBlockIndex:0,outputBlockIndex:1,isVariable:!0},{input:"array",output:"nodes",inputBlockIndex:2,outputBlockIndex:3,isVariable:!0},{input:"object",output:"pickedMesh",inputBlockIndex:2,outputBlockIndex:0,isVariable:!0}],extraProcessor(e,n,t,a,i,c,o){var u,p,f,b,k,m;const d=i[i.length-1];d.config=d.config||{},d.config.glTF=o;const r=(p=(u=e.configuration)==null?void 0:u.nodeIndex)==null?void 0:p.value[0];if(r===void 0||typeof r!="number")throw new Error("nodeIndex not found in configuration");const l="pickedMesh_"+r;return i[1].config.variable=l,c._userVariables[l]={className:"Mesh",id:(b=(f=o==null?void 0:o.nodes)==null?void 0:f[r]._babylonTransformNode)==null?void 0:b.id,uniqueId:(m=(k=o==null?void 0:o.nodes)==null?void 0:k[r]._babylonTransformNode)==null?void 0:m.uniqueId},i}});y("/nodes/{}/extensions/KHR_node_selectability/selectable",{get:e=>{const n=e._babylonTransformNode;return n&&n.isPickable!==void 0?n.isPickable:!0},set:(e,n)=>{var t;(t=n._primitiveBabylonMeshes)==null||t.forEach(a=>{a.isPickable=e})},getTarget:e=>e._babylonTransformNode,getPropertyName:[()=>"isPickable"],type:"boolean"});class I{constructor(n){this.name=s,this._loader=n,this.enabled=n.isExtensionUsed(s)}async onReady(){var n;(n=this._loader.gltf.nodes)==null||n.forEach(t=>{var a,i,c;(a=t.extensions)!=null&&a.KHR_node_selectability&&((i=t.extensions)==null?void 0:i.KHR_node_selectability.selectable)===!1&&((c=t._babylonTransformNode)==null||c.getChildMeshes().forEach(o=>{o.isPickable=!1}))})}dispose(){this._loader=null}}_(s);h(s,!0,e=>new I(e));export{I as KHR_node_selectability};

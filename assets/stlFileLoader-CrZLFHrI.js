import{i as g,M as x,e as N,A as I,c as m,R as b}from"./index-Be5AFUID.js";class f{constructor(){this.solidPattern=/solid (\S*)([\S\s]*?)endsolid[ ]*(\S*)/g,this.facetsPattern=/facet([\s\S]*?)endfacet/g,this.normalPattern=/normal[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g,this.vertexPattern=/vertex[\s]+([-+]?[0-9]+\.?[0-9]*([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+[\s]+([-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?)+/g,this.name=g.name,this.extensions=g.extensions}importMesh(n,o,t,i,c){let s;if(typeof t!="string"){if(this._isBinary(t)){const e=new x("stlmesh",o);return this._parseBinary(e,t),c&&c.push(e),!0}t=new TextDecoder().decode(new Uint8Array(t))}for(;s=this.solidPattern.exec(t);){let e=s[1];const u=s[3];if(u&&e!=u)return N.Error("Error in STL, solid name != endsolid name"),!1;if(n&&e){if(n instanceof Array){if(!n.indexOf(e))continue}else if(e!==n)continue}e=e||"stlmesh";const a=new x(e,o);this._parseASCII(a,s[2]),c&&c.push(a)}return!0}load(n,o,t){return this.importMesh(null,n,o,t,null)}loadAssetContainer(n,o,t){const i=new I(n);return n._blockEntityCollection=!0,this.importMesh(null,n,o,t,i.meshes),n._blockEntityCollection=!1,i}_isBinary(n){const o=new DataView(n);if(o.byteLength<=80)return!1;const t=32/8*3+32/8*3*3+16/8,i=o.getUint32(80,!0);if(80+32/8+i*t===o.byteLength)return!0;const c=[115,111,108,105,100];for(let s=0;s<5;s++)if(o.getUint8(s)!==c[s])return!0;return!1}_parseBinary(n,o){const t=new DataView(o),i=t.getUint32(80,!0),c=84,s=12*4+2;let e=0;const u=new Float32Array(i*3*3),a=new Float32Array(i*3*3),l=new Uint32Array(i*3);let r=0;for(let E=0;E<i;E++){const d=c+E*s,A=t.getFloat32(d,!0),p=t.getFloat32(d+4,!0),O=t.getFloat32(d+8,!0);for(let _=1;_<=3;_++){const h=d+_*12;u[e]=t.getFloat32(h,!0),a[e]=A,f.DO_NOT_ALTER_FILE_COORDINATES?(u[e+1]=t.getFloat32(h+4,!0),u[e+2]=t.getFloat32(h+8,!0),a[e+1]=p,a[e+2]=O):(u[e+2]=t.getFloat32(h+4,!0),u[e+1]=t.getFloat32(h+8,!0),a[e+2]=p,a[e+1]=O),e+=3}f.DO_NOT_ALTER_FILE_COORDINATES?(l[r]=r,l[r+1]=r+2,l[r+2]=r+1,r+=3):(l[r]=r++,l[r]=r++,l[r]=r++)}n.setVerticesData(m.PositionKind,u),n.setVerticesData(m.NormalKind,a),n.setIndices(l),n.computeWorldMatrix(!0)}_parseASCII(n,o){const t=[],i=[],c=[];let s=0,e;for(;e=this.facetsPattern.exec(o);){const u=e[1],a=this.normalPattern.exec(u);if(this.normalPattern.lastIndex=0,!a)continue;const l=[Number(a[1]),Number(a[5]),Number(a[3])];let r;for(;r=this.vertexPattern.exec(u);)f.DO_NOT_ALTER_FILE_COORDINATES?(t.push(Number(r[1]),Number(r[3]),Number(r[5])),i.push(l[0],l[2],l[1])):(t.push(Number(r[1]),Number(r[5]),Number(r[3])),i.push(l[0],l[1],l[2]));f.DO_NOT_ALTER_FILE_COORDINATES?(c.push(s,s+2,s+1),s+=3):c.push(s++,s++,s++),this.vertexPattern.lastIndex=0}this.facetsPattern.lastIndex=0,n.setVerticesData(m.PositionKind,t),n.setVerticesData(m.NormalKind,i),n.setIndices(c),n.computeWorldMatrix(!0)}}f.DO_NOT_ALTER_FILE_COORDINATES=!1;b(new f);export{f as STLFileLoader};

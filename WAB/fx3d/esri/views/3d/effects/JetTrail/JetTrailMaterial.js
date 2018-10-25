/**
 * Copyright @ 2018 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/text!./JetTrailMaterial.xml","esri/core/declare","esri/views/3d/webgl-engine/lib/GLSLShader","../../webgl-engine-extensions/GLSLProgramExt","../../support/fx3dUtils"],function(e,t,i,s,r){var n=t(null,{declaredClass:"esri.views.3d.effects.JetTrail.JetTrailMaterial",constructor:function(e){this._gl=e.gl,this._shaderSnippets=e.shaderSnippets,this._program=null,this._pulseProgram=null,this._pushState=e.pushState,this._restoreState=e.restoreState,this._srcAlpha=770,this._dstAlpha=771,this._viewingMode=e.viewingMode,"local"==e.viewingMode&&(this._srcAlpha=770,this._dstAlpha=771)},destroy:function(){this._program&&(this._program.dispose(),delete this._program,this._program=null),this._pulseProgram&&(this._pulseProgram.dispose(),delete this._pulseProgram,this._pulseProgram=null)},_addDefines:function(e,t){var i="";if(null!=t)if(Array.isArray(t))for(var s=0,r=t.length;s<r;s++){var n=t[s];i+="#define "+n+"\n"}else for(var n in t)i+="#define "+n+"\n";return this._shaderSnippets.defines+"\n"+i+e},loadShaders:function(t){if(this._shaderSnippets){null!=this._shaderSnippets.jetTrailVS&&null!=this._shaderSnippets.jetTrailFS||this._shaderSnippets._parse(e);var r=[];"global"==this._viewingMode?r.push("GLOBAL"):r.push("LOCAL");var n=this._addDefines(this._shaderSnippets.jetTrailVS,r),a=new i(35633,n,this._gl),l=new i(35632,this._shaderSnippets.jetTrailFS,this._gl);this._program=new s([a,l],this._gl),null!=this._shaderSnippets.jetTrailPulseVS&&null!=this._shaderSnippets.jetTrailPulseFS||this._shaderSnippets._parse(e),n=this._addDefines(this._shaderSnippets.jetTrailPulseVS,r),a=new i(35633,n,this._gl),l=new i(35632,this._shaderSnippets.jetTrailPulseFS,this._gl),this._pulseProgram=new s([a,l],this._gl)}return this._initResources()},getProgram:function(){return this._program},_initResources:function(){return!0},bind:function(e,t){this._program.use(),this._program.uniformMatrix4fv("lp",e.proj),this._program.uniformMatrix4fv("lm",e.view),this._program.uniform3fv("oe",e.camPos),this._program.uniform3fv("es",e.lightingData.direction),this._program.uniform4fv("ms",e.lightingData.ambient),this._program.uniform4fv("os",e.lightingData.diffuse),this._program.uniform4fv("is",e.lightingData.specular),this._oldTex=this._gl.getParameter(32873);var i=t._activeTextureUnit;i>t.parameters.maxVertexTextureImageUnits-1-4&&(console.warn("Many textures are binded now, 3DFx lib may be work abnormally."),i=0),e.ss.bind(i+1),this._program.uniform1i("ss",i+1),this._program.uniform2fv("ll",e.ll),this._program.uniform2fv("ps",[e.ps,e.so]),e.eo.bind(i+2),this._program.uniform1i("eo",i+2),this._program.uniform2fv("si",e.si),this._gl.activeTexture(33984+i+3),this._gl.bindTexture(3553,e.se),this._program.uniform1i("se",i+3),this._gl.activeTexture(33984+i+4),this._gl.bindTexture(3553,e.im),this._program.uniform1i("im",i+4),this._program.uniform1f("em",e.em),this._program.uniform1f("ls",e.ls),this._program.uniform1f("po",e.po),this._program.uniform1f("sl",e.time),0!=t._depthWriteEnabled&&(this._pushState(["setDepthWriteEnabled",t._depthWriteEnabled]),t.setDepthWriteEnabled(!1)),1!=t._polygonCullingEnabled&&(this._pushState(["setFaceCullingEnabled",t._polygonCullingEnabled]),t.setFaceCullingEnabled(!0)),1!=t._depthTestEnabled&&(this._pushState(["setDepthTestEnabled",t._depthTestEnabled]),t.setDepthTestEnabled(!0)),1!=t._blendEnabled&&(this._pushState(["setBlendingEnabled",t._blendEnabled]),t.setBlendingEnabled(!0))},bindPulse:function(e,t){this._pulseProgram.use(),this._pulseProgram.uniformMatrix4fv("lp",e.proj),this._pulseProgram.uniformMatrix4fv("lm",e.view),this._pulseProgram.uniform3fv("oe",e.camPos),this._pulseProgram.uniform3fv("es",e.lightingData.direction),this._pulseProgram.uniform4fv("ms",e.lightingData.ambient),this._pulseProgram.uniform4fv("os",e.lightingData.diffuse),this._pulseProgram.uniform4fv("is",e.lightingData.specular);var i=t._activeTextureUnit;i>t.parameters.maxVertexTextureImageUnits-1-2&&(console.warn("Many textures are binded now, 3DFx lib may be work abnormally."),i=0),e.ss.bind(i+1),this._pulseProgram.uniform1i("ss",i+1),this._pulseProgram.uniform2fv("ll",e.ll),this._pulseProgram.uniform2fv("ps",[e.ps,e.so]),this._gl.activeTexture(33984+i+2),this._gl.bindTexture(3553,e.im),this._pulseProgram.uniform1i("im",i+2),this._pulseProgram.uniform1f("em",e.em),this._pulseProgram.uniform2fv("me",e.me),this._pulseProgram.uniform1f("po",e.po),this._pulseProgram.uniform1f("sl",e.time),519!=t._depthFunction&&(this._pushState(["setDepthFunction",t._depthFunction]),t.setDepthFunction(519)),1!=t._blendEnabled&&(this._pushState(["setBlendingEnabled",t._blendEnabled]),t.setBlendingEnabled(!0))},blend:function(e,t){e?e&&(this._pushState(["setBlendFunctionSeparate",[t._blendFunctionState.srcRGB,t._blendFunctionState.dstRGB,t._blendFunctionState.srcAlpha,t._blendFunctionState.dstAlpha]]),t.setBlendFunction(770,771)):(this._pushState(["setBlendFunctionSeparate",[t._blendFunctionState.srcRGB,t._blendFunctionState.dstRGB,t._blendFunctionState.srcAlpha,t._blendFunctionState.dstAlpha]]),t.setBlendFunction(this._srcAlpha,this._dstAlpha))},release:function(e){this._gl.activeTexture(33984+e._activeTextureUnit+1),this._gl.bindTexture(3553,this._oldTex),this._restoreState(e),this._gl.useProgram(null)}});return n});
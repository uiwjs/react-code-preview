(this["webpackJsonp@uiw/react-code-preview"]=this["webpackJsonp@uiw/react-code-preview"]||[]).push([[531],{1213:function(t,e,n){!function(t){"use strict";t.defineMode("turtle",(function(t){var e,n=t.indentUnit;function o(t){return new RegExp("^(?:"+t.join("|")+")$","i")}o([]);var r=o(["@prefix","@base","a"]),i=/[*+\-<>=&|]/;function c(t,n){var o,a=t.next();if(e=null,"<"!=a||t.match(/^[\s\u00a0=]/,!1)){if('"'==a||"'"==a)return n.tokenize=(o=a,function(t,e){for(var n,r=!1;null!=(n=t.next());){if(n==o&&!r){e.tokenize=c;break}r=!r&&"\\"==n}return"string"}),n.tokenize(t,n);if(/[{}\(\),\.;\[\]]/.test(a))return e=a,null;if("#"==a)return t.skipToEnd(),"comment";if(i.test(a))return t.eatWhile(i),null;if(":"==a)return"operator";if(t.eatWhile(/[_\w\d]/),":"==t.peek())return"variable-3";var u=t.current();return r.test(u)?"meta":a>="A"&&a<="Z"?"comment":"keyword"}return t.match(/^[^\s\u00a0>]*>?/),"atom"}function a(t,e,n){t.context={prev:t.context,indent:t.indent,col:n,type:e}}function u(t){t.indent=t.context.indent,t.context=t.context.prev}return{startState:function(){return{tokenize:c,context:null,indent:0,col:0}},token:function(t,n){if(t.sol()&&(n.context&&null==n.context.align&&(n.context.align=!1),n.indent=t.indentation()),t.eatSpace())return null;var o=n.tokenize(t,n);if("comment"!=o&&n.context&&null==n.context.align&&"pattern"!=n.context.type&&(n.context.align=!0),"("==e)a(n,")",t.column());else if("["==e)a(n,"]",t.column());else if("{"==e)a(n,"}",t.column());else if(/[\]\}\)]/.test(e)){for(;n.context&&"pattern"==n.context.type;)u(n);n.context&&e==n.context.type&&u(n)}else"."==e&&n.context&&"pattern"==n.context.type?u(n):/atom|string|variable/.test(o)&&n.context&&(/[\}\]]/.test(n.context.type)?a(n,"pattern",t.column()):"pattern"!=n.context.type||n.context.align||(n.context.align=!0,n.context.col=t.column()));return o},indent:function(t,e){var o=e&&e.charAt(0),r=t.context;if(/[\]\}]/.test(o))for(;r&&"pattern"==r.type;)r=r.prev;var i=r&&o==r.type;return r?"pattern"==r.type?r.col:r.align?r.col+(i?0:1):r.indent+(i?0:n):0},lineComment:"#"}})),t.defineMIME("text/turtle","turtle")}(n(54))}}]);
//# sourceMappingURL=531.31dad921.chunk.js.map
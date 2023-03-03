"use strict";(self.webpackChunkconnect_lodhran_frontend=self.webpackChunkconnect_lodhran_frontend||[]).push([[607],{6491:function(e,t,a){var n=a(6934),i=a(3967),l=a(8870),r=a(493),d=a(5484),o=a(653),s=a(3044),c=a(9900),h=a(890),u=a(6999),g=a(3328),v=a(5429),x=a(184);const m=(0,n.ZP)(u.Z)((e=>{let{theme:t}=e;return{overflow:"hidden",position:"relative","&:after":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(210.04deg, ${t.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,borderRadius:"50%",top:-30,right:-180},"&:before":{content:'""',position:"absolute",width:210,height:210,background:`linear-gradient(140.9deg, ${t.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,borderRadius:"50%",top:-160,right:-130}}}));t.Z=e=>{let{isLoading:t,total:a}=e;const n=(0,i.Z)();return(0,x.jsx)(x.Fragment,{children:t?(0,x.jsx)(g.Z,{}):(0,x.jsx)(m,{border:!1,content:!1,children:(0,x.jsx)(l.Z,{sx:{p:2},children:(0,x.jsx)(r.Z,{sx:{py:0},children:(0,x.jsxs)(d.ZP,{alignItems:"center",disableGutters:!0,sx:{py:0},children:[(0,x.jsx)(o.Z,{children:(0,x.jsx)(s.Z,{variant:"rounded",sx:{...n.typography.commonAvatar,...n.typography.largeAvatar,backgroundColor:n.palette.warning.light,color:n.palette.warning.dark},children:(0,x.jsx)(v.Z,{fontSize:"inherit"})})}),(0,x.jsx)(c.Z,{sx:{py:0,mt:.45,mb:.45},primary:(0,x.jsxs)(h.Z,{variant:"h4",children:["Rs. ",a]}),secondary:(0,x.jsx)(h.Z,{variant:"subtitle2",sx:{color:n.palette.grey[500],mt:.5},children:"Total Income"})})]})})})})})}},9607:function(e,t,a){a.r(t),a.d(t,{default:function(){return Y}});var n=a(5527),i=a(9836),l=a(3382),r=a(3994),d=a(9281),o=a(6890),s=a(6812),c=a(5855),h=a(1889),u=a(8096),g=a(4925),v=a(8029),x=a(9321),m=a(290),p=a(9658),j=a(6176),Z=a(2791),f=a(3116),b=a(2426),y=a.n(b),D=a(224),S=(a(6491),a(2790)),P=a(184);const M=[{id:"sr",label:"Sr.",minWidth:170},{id:"isp",label:"Isp",minWidth:170},{id:"userId",label:"\xa0User Id",minWidth:100},{id:"packageName",label:"Package",minWidth:170,align:"left",format:e=>e.toLocaleString("en-US")},{id:"paymentMethod",label:"Payment Method\xa0",minWidth:170,align:"left",format:e=>e.toLocaleString("en-US")},{id:"tid",label:"TID",minWidth:170,align:"left",format:e=>e.toFixed(2)},{id:"saleRate",label:"Sale Rate",minWidth:170,align:"left",format:e=>e.toFixed(2)},{id:"purchaseRate",label:"Purchase Rate",minWidth:170,align:"left",format:e=>e.toFixed(2)},{id:"expiryDate",label:"Expiry Date",minWidth:170,align:"right",format:e=>e.toFixed(2)}];function Y(){const[e,t]=(0,Z.useState)(0),[a,b]=(0,Z.useState)(10),[Y,k]=(0,Z.useState)([]),[w,W]=(0,Z.useState)([]),[I,R]=(0,Z.useState)(""),[z,L]=(0,Z.useState)(y()(new Date).format("YYYY-MM-DD")),[C,H]=(0,Z.useState)(y()(new Date).format("YYYY-MM-DD")),[F,E]=(0,Z.useState)(0),[T,A]=(0,Z.useState)(j.qw),[V,_]=(0,Z.useState)(!1),[U,N]=(0,Z.useState)(!1),[$,q]=(0,Z.useState)("");(0,Z.useEffect)((()=>{O()}),[]),(0,Z.useEffect)((()=>{console.log("startDate"),console.log(z),console.log("endDate"),console.log(C),""!==I&&G()}),[z,C,I]);const G=()=>{_(!0),f.Z.getAllCompletedEntries({isp:I,startDate:z,endDate:z!==C?C:""}).then((e=>{var t,a,n,i,l,r;let d=[];null===e||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.entries)||void 0===a||a.map(((e,t)=>{var a,n,i,l,r,o,s,c,h,u,g,v;return d.push((l=t+1,r=null===e||void 0===e||null===(a=e.isp)||void 0===a?void 0:a.name,o=null===e||void 0===e?void 0:e.userId,s=null===e||void 0===e||null===(n=e.package)||void 0===n?void 0:n.name,c=(0,D.M)(null===e||void 0===e?void 0:e.paymentMethod),h=null===e||void 0===e?void 0:e.tid,u=null===e||void 0===e?void 0:e.saleRate,g=null===e||void 0===e||null===(i=e.package)||void 0===i?void 0:i.purchaseRate,v=y()(null===e||void 0===e?void 0:e.expiryDate).format("DD/MM/YYYY"),{sr:l,isp:r,userId:o,packageName:s,paymentMethod:c,tid:h,saleRate:u,purchaseRate:g,expiryDate:v}))})),k(d),E(null===e||void 0===e||null===(n=e.data)||void 0===n?void 0:n.total),A(null===e||void 0===e||null===(i=e.data)||void 0===i||null===(l=i.entries[0])||void 0===l||null===(r=l.isp)||void 0===r?void 0:r.color),_(!1),N(!1)})).catch((e=>{var t,a;q(null===e||void 0===e||null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.message),N(!0),_(!1)}))},O=()=>{f.Z.getAllIsps().then((e=>{W(null===e||void 0===e?void 0:e.data),_(!1),N(!1)})).catch((e=>{var t,a;q(null===e||void 0===e||null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.message),N(!0),_(!1)}))};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)("form",{style:{marginTop:"15px"},children:(0,P.jsxs)(h.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(h.ZP,{item:!0,xs:3,children:(0,P.jsxs)(u.Z,{fullWidth:!0,children:[(0,P.jsx)(g.Z,{children:" Start Date "}),(0,P.jsx)(v.Z,{id:"startDate",name:"startDate",type:"date",value:y()(z).format("YYYY-MM-DD"),onChange:e=>L(e.target.value),label:"Start Date"})]})}),(0,P.jsx)(h.ZP,{item:!0,xs:3,children:(0,P.jsxs)(u.Z,{fullWidth:!0,children:[(0,P.jsx)(g.Z,{children:" End Date "}),(0,P.jsx)(v.Z,{id:"endDate",name:"endDate",type:"date",value:y()(C).format("YYYY-MM-DD"),onChange:e=>H(e.target.value),label:"End Date"})]})}),(0,P.jsx)(h.ZP,{item:!0,xs:6,children:(0,P.jsxs)(u.Z,{fullWidth:!0,children:[(0,P.jsx)(g.Z,{children:" Select ISP "}),(0,P.jsx)(x.Z,{id:"isp",name:"isp",type:"text",value:I,onChange:e=>R(e.target.value),label:"Select ISP",children:w.map(((e,t)=>(0,P.jsx)(m.Z,{value:e.id,children:e.name},t)))})]})})]})}),(0,P.jsx)(h.ZP,{container:!0,spacing:2,sx:{mt:1},children:(0,P.jsx)(h.ZP,{item:!0,xs:3,children:(0,P.jsx)(S.Z,{isLoading:!1,total:F})})}),(0,P.jsxs)(n.Z,{sx:{width:"100%",overflow:"hidden",mt:5},children:[V&&(0,P.jsx)("h3",{children:"Loading...!"}),U?(0,P.jsx)(p.Z,{severity:"error",children:$}):""===I?(0,P.jsx)(p.Z,{severity:"error",children:"Please Select an ISP"}):!V&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(d.Z,{sx:{maxHeight:440},children:(0,P.jsxs)(i.Z,{stickyHeader:!0,"aria-label":"sticky table",children:[(0,P.jsx)(o.Z,{children:(0,P.jsx)(c.Z,{children:M.map((e=>(0,P.jsx)(r.Z,{align:e.align,style:{minWidth:e.minWidth,backgroundColor:T,color:"white"},children:e.label},e.id)))})}),(0,P.jsx)(l.Z,{children:Y.slice(e*a,e*a+a).map((e=>(0,P.jsx)(c.Z,{hover:!0,role:"checkbox",tabIndex:-1,children:M.map((t=>{const a=e[t.id];return(0,P.jsx)(r.Z,{align:t.align,children:t.format&&"number"===typeof a?t.format(a):a},t.id)}))},e.code)))})]})}),(0,P.jsx)(s.Z,{rowsPerPageOptions:[10,25,100],component:"div",count:Y.length,rowsPerPage:a,page:e,onPageChange:(e,a)=>{t(a)},onRowsPerPageChange:e=>{b(+e.target.value),t(0)}})]})]})]})}},5429:function(e,t,a){var n=a(4836);t.Z=void 0;var i=n(a(5649)),l=a(184),r=(0,i.default)([(0,l.jsx)("path",{d:"M6.44 9.86 7.02 5H5.05L4.04 9.36c-.1.42-.01.84.25 1.17.14.18.44.47.94.47.61 0 1.13-.49 1.21-1.14zM9.71 11c.74 0 1.29-.59 1.29-1.31V5H9.04l-.55 4.52c-.05.39.07.78.33 1.07.23.26.55.41.89.41zm4.51 0c.41 0 .72-.15.96-.41.25-.29.37-.68.33-1.07L14.96 5H13v4.69c0 .72.55 1.31 1.22 1.31zm4.69-6.01L16.98 5l.58 4.86c.08.65.6 1.14 1.21 1.14.49 0 .8-.29.93-.47.26-.33.35-.76.25-1.17l-1.04-4.37z",opacity:".3"},"0"),(0,l.jsx)("path",{d:"m21.9 8.89-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM13 5h1.96l.54 4.52c.05.39-.07.78-.33 1.07-.22.26-.54.41-.95.41-.67 0-1.22-.59-1.22-1.31V5zM8.49 9.52 9.04 5H11v4.69c0 .72-.55 1.31-1.29 1.31-.34 0-.65-.15-.89-.41-.25-.29-.37-.68-.33-1.07zm-4.2 1.01c-.26-.33-.35-.76-.25-1.17L5.05 5h1.97l-.58 4.86c-.08.65-.6 1.14-1.21 1.14-.5 0-.8-.29-.94-.47zM19 19H5v-6.03c.08.01.15.03.23.03.87 0 1.66-.36 2.24-.95.6.6 1.4.95 2.31.95.87 0 1.65-.36 2.23-.93.59.57 1.39.93 2.29.93.84 0 1.64-.35 2.24-.95.58.59 1.37.95 2.24.95.08 0 .15-.02.23-.03V19zm.71-8.47c-.14.18-.44.47-.94.47-.61 0-1.14-.49-1.21-1.14L16.98 5l1.93-.01 1.05 4.37c.1.42.01.85-.25 1.17z"},"1")],"StorefrontTwoTone");t.Z=r}}]);
//# sourceMappingURL=607.d81c138e.chunk.js.map
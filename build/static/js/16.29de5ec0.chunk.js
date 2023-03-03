"use strict";(self.webpackChunkconnect_lodhran_frontend=self.webpackChunkconnect_lodhran_frontend||[]).push([[16],{6016:function(e,a,r){r.r(a);var t=r(9658),n=r(8096),i=r(4925),l=r(8029),s=r(7071),d=r(1889),h=r(9321),o=r(290),c=r(3967),u=r(9276),p=r(8491),x=r(3116),y=r(2791),m=r(6871),j=r(7305),Z=r(9018),P=r(184);a.default=function(){const e=(0,c.Z)(),a=(0,m.s0)(),[r,g]=(0,y.useState)(!1),[v,b]=(0,y.useState)(!1),[R,w]=(0,y.useState)(""),{ispId:B,color:f}=(0,m.TH)().state,D={isp:B,name:"",bandwidth:"",rateType:"",ratePerDay:0,purchaseRate:"",saleRate:"",validity:""};return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)("h3",{children:"Add Package Details"}),v&&(0,P.jsx)(t.Z,{severity:"error",children:R}),(0,P.jsx)(p.J9,{initialValues:D,validationSchema:Z.hh,onSubmit:e=>{g(!0),x.Z.createPackage(e).then((e=>{g(!1),alert("Package Added"),a(-1)})).catch((e=>{var a,r;w(null===e||void 0===e||null===(a=e.response)||void 0===a||null===(r=a.data)||void 0===r?void 0:r.message),b(!0),g(!1)}))},children:a=>{let{values:t,errors:c,isValid:p,touched:x,handleChange:y,handleBlur:m,handleSubmit:Z,setFieldValue:g}=a;return(0,P.jsxs)("form",{onSubmit:Z,children:[(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.name&&c.name),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Package Name "}),(0,P.jsx)(l.Z,{id:"name",name:"name",type:"text",value:t.name,onBlur:m,onChange:y,label:"ISP Name",inputProps:{}}),x.name&&c.name&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-name",children:c.name})]}),(0,P.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.bandwidth&&c.bandwidth),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Bandwidth (In MBs)"}),(0,P.jsx)(l.Z,{id:"bandwidth",name:"bandwidth",type:"number",value:t.bandwidth,onBlur:m,onChange:y,label:"Bandwidth (In MBs)",inputProps:{min:0}}),x.bandwidth&&c.bandwidth&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-bandwidth",children:c.bandwidth})]})}),(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.rateType&&c.rateType),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Rate Type "}),(0,P.jsxs)(h.Z,{variant:"outlined",id:"rateType",name:"rateType",value:t.rateType,onChange:y,label:"Rate Type",sx:{paddingTop:"15px"},children:[(0,P.jsx)(o.Z,{value:"day",children:"Per Day"}),(0,P.jsx)(o.Z,{value:"month",children:"Per Month"})]}),x.rateType&&c.rateType&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-rate-type",children:c.rateType})]})})]}),(0,P.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.ratePerDay&&c.ratePerDay),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Rate Per Day "}),(0,P.jsx)(l.Z,{id:"ratePerDay",name:"ratePerDay",type:"number",value:"day"===t.rateType?t.ratePerDay:0,onBlur:m,onChange:e=>((e,a)=>{const{value:r}=e.target;a("ratePerDay",r),a("purchaseRate",(31*r).toFixed(2))})(e,g),label:"Rate Per Day",inputProps:{min:0},disabled:"day"!==t.rateType}),x.ratePerDay&&c.ratePerDay&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-rate-per-day",children:c.ratePerDay})]})}),(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.purchaseRate&&c.purchaseRate),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Purchase Rate "}),(0,P.jsx)(l.Z,{id:"purchaseRate",name:"purchaseRate",type:"number",value:t.purchaseRate,onBlur:m,onChange:y,label:"Purchase Rate",inputProps:{min:0}}),x.purchaseRate&&c.purchaseRate&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-purchase-rate",children:c.purchaseRate})]})})]}),(0,P.jsxs)(d.ZP,{container:!0,spacing:2,children:[(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.saleRate&&c.saleRate),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Sale Rate "}),(0,P.jsx)(l.Z,{id:"saleRate",name:"saleRate",type:"number",value:t.saleRate,onBlur:m,onChange:y,label:"Sale Rate",inputProps:{min:0}}),x.saleRate&&c.saleRate&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-sale-rate",children:c.saleRate})]})}),(0,P.jsx)(d.ZP,{item:!0,xs:6,children:(0,P.jsxs)(n.Z,{fullWidth:!0,error:Boolean(x.validity&&c.validity),sx:{...e.typography.customInput},children:[(0,P.jsx)(i.Z,{children:" Validity (In days) "}),(0,P.jsx)(l.Z,{id:"validity",name:"validity",type:"number",value:t.validity,onBlur:m,onChange:y,label:"Validity (In Days)",inputProps:{min:0}}),x.validity&&c.validity&&(0,P.jsx)(s.Z,{error:!0,id:"standard-weight-helper-text-validity",children:c.validity})]})})]}),(0,P.jsx)(u.Z,{sx:{mt:2},children:(0,P.jsx)(d.ZP,{sx:{width:"100%"},children:(0,P.jsx)(j.Z,{isValid:!p||r,title:"Add Package",color:f})})})]})}})]})}}}]);
//# sourceMappingURL=16.29de5ec0.chunk.js.map
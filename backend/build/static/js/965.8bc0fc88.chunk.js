"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[965],{30965:function(e,s,r){r.r(s),r.d(s,{default:function(){return oe}});var n=r(70885),l=r(91580),t=r(45879),a=r(39430),i=r(66168),c=r(34143),o=r(69414),d=r(94852),u=r(72791),h=r(91231),x=r(16953),j=r(56263),m=r(49332),f=r(59982),p=r(61102),g=r(1413),Z=r(57094),v=r(73304),b=r(6892),C=r(37993),w=r(98296),y=r(60929),U=r(11158),k=r(36934),S=r(28755),_=r(77426),P=r(80184);function z(){var e=(0,_.c)({initialValues:{user:{email:"",fullname:"",role:"student"},student:{rollno:null,examseatno:"",curr_sem:"3",prn:"",curryear:"2"},parent:{email:"",phone:""}},validate:{}});return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("form",{onSubmit:e.onSubmit((function(s,r){console.log(e.values),d.Z.post("/users/studentRegister",e.values).then((function(e){"success"===e.data.status?(0,S.c0)({title:"Success",message:"User added successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}):(0,S.c0)({title:"Fail",message:e.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:3500,radius:"xl"})})).catch((function(e){(0,S.c0)({title:"Fail",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:3500,radius:"xl"})}))})),children:(0,P.jsxs)(l.W,{children:[(0,P.jsx)(x.T,{h:"xs"}),(0,P.jsxs)(Z.M,{cols:2,breakpoints:[{maxWidth:980,cols:1,spacing:"md"}],children:[(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"Your name",label:"Name",withAsterisk:!0},e.getInputProps("user.fullname")))}),(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"dev@mmcoe.edu.in",label:"Email"},e.getInputProps("user.email")))}),(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"parent@email.com",label:"Parent's Email"},e.getInputProps("parent.email")))}),(0,P.jsx)("div",{children:(0,P.jsx)(b.Y,(0,g.Z)({placeholder:"0000000000",label:"Parent's Phone number",hideControls:!0},e.getInputProps("parent.phone")))}),(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"7xxxxxxxxx",label:"Exam Seat number"},e.getInputProps("student.examseatno")))}),(0,P.jsx)("div",{children:(0,P.jsx)(b.Y,(0,g.Z)({placeholder:"1",label:"Roll number",hideControls:!0},e.getInputProps("student.rollno")))}),(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"xxxxxxxx",label:"PRN number"},e.getInputProps("student.prn")))}),(0,P.jsx)("div",{children:(0,P.jsx)(C.p,(0,g.Z)({placeholder:"3",label:"Current semester",data:["3","4","5","6","7","8"]},e.getInputProps("student.curr_sem")))}),(0,P.jsx)("div",{children:(0,P.jsx)(C.p,(0,g.Z)({placeholder:"3",label:"Current academic year",data:["2","3","4"]},e.getInputProps("student.curr  year")))})]}),(0,P.jsx)(x.T,{h:"md"}),(0,P.jsx)(l.W,{size:500,px:0,children:(0,P.jsx)(w.z,{fullWidth:!0,type:"submit",leftIcon:(0,P.jsx)(k.Z,{}),children:"Add User"})})]})})})}var A=r(6363),I=r(18846);function R(){var e=(0,_.c)({initialValues:{user:{email:"",fullname:"",role:"faculty"}},validate:{user:{email:(0,A.J)("Invalid email"),fullname:(0,I.U)("Enter the name")}}});return(0,P.jsx)(P.Fragment,{children:(0,P.jsx)("form",{onSubmit:e.onSubmit((function(s,r){console.log(e.values),d.Z.post("/users/facultyRegister",e.values).then((function(e){"success"===e.data.status?(0,S.c0)({title:"Success",message:"User added successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}):(0,S.c0)({title:"Fail",message:e.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:2e3,radius:"xl"})})).catch((function(e){console.log(e)}))})),children:(0,P.jsxs)(l.W,{children:[(0,P.jsx)(x.T,{h:"xs"}),(0,P.jsxs)(Z.M,{cols:2,breakpoints:[{maxWidth:980,cols:1,spacing:"md"}],children:[(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"Your name",label:"Name",withAsterisk:!0},e.getInputProps("user.fullname")))}),(0,P.jsx)("div",{children:(0,P.jsx)(v.o,(0,g.Z)({placeholder:"dev@mmcoe.edu.in",label:"Email",withAsterisk:!0},e.getInputProps("user.email")))})]}),(0,P.jsx)(x.T,{h:"md"}),(0,P.jsx)(l.W,{size:500,px:0,children:(0,P.jsx)(w.z,{fullWidth:!0,type:"submit",leftIcon:(0,P.jsx)(k.Z,{}),children:"Add User"})})]})})})}var E=r(66854),F=r(3708),D=r(74815),T=r(23095),q=r(77378),M=r(28559),N=r(23875),W=r(45342);function H(){var e=(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{children:"Email"}),(0,P.jsx)("th",{children:"Full name"}),(0,P.jsx)("th",{children:"Role"}),(0,P.jsx)("th",{children:"Error encountered"})]});return(0,P.jsx)(P.Fragment,{children:(0,P.jsxs)(l.W,{children:[(0,P.jsx)(D.D,{order:1,align:"center",children:"Create Users by uploading Excel sheet"}),(0,P.jsxs)(a.M,{children:[(0,P.jsx)(N.Z,{size:20,stroke:1.5}),(0,P.jsx)(t.e,{target:"_self",href:"http://localhost:5000/users/download",children:"Click here to download template file."})]}),(0,P.jsx)(x.T,{h:"sm"}),(0,P.jsx)(T.Z,{uploadLink:"/users/upload",accept:q.Vn,onResponse:function(s){console.log(s);var r=s.data;if("success"===r.status)(0,S.c0)({title:"Success!",message:r.objects.msg,color:"teal",icon:(0,P.jsx)(y.Z,{}),autoClose:2e3,radius:"xl"});else{var n=r.objects.map((function(e){return(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{children:e.email}),(0,P.jsx)("td",{children:e.fullname}),(0,P.jsx)("td",{children:e.role}),(0,P.jsx)("td",{children:(0,P.jsx)(E.C,{color:"red",children:e.errmsg})})]},Math.random())}));(0,S.c0)({title:"Failed!",message:r.err,color:"red",icon:(0,P.jsx)(U.Z,{}),disallowClose:!1}),(0,W.h7)({title:"The following errors were encountered",children:(0,P.jsxs)(F.i,{striped:!0,highlightOnHover:!0,children:[(0,P.jsx)("thead",{children:e}),(0,P.jsx)("tbody",{children:n})]}),size:"auto"})}},onError:console.log,icon:(0,P.jsx)(M.Z,{size:50,stroke:1.5})})]})})}function V(){var e=(0,u.useState)("faculty"),s=(0,n.Z)(e,2),r=s[0],l=s[1];return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(h.K,{align:"center",children:[(0,P.jsx)(x.T,{h:"xs"}),(0,P.jsx)(j.s,{color:"blue",value:r,size:"md",radius:20,onChange:l,data:[{value:"faculty",label:"Faculty"},{value:"ftudent",label:"Student"}]})]}),(0,P.jsx)("div",{className:"addUserForm",children:"faculty"===r?(0,P.jsx)(R,{}):(0,P.jsx)(z,{})})]})}function O(){var e=(0,u.useState)(!1),s=(0,n.Z)(e,2),r=s[0],t=s[1];return(0,P.jsx)(l.W,{children:(0,P.jsxs)(m.X,{shadow:"md",p:"md",withBorder:!0,children:[(0,P.jsx)(f.x,{align:"center",fz:"xl",fw:700,children:"Add User"}),(0,P.jsxs)(h.K,{align:"center",children:[(0,P.jsx)(x.T,{h:"xs"}),(0,P.jsx)(p.r,{checked:r,onChange:function(e){return t(e.currentTarget.checked)},size:"md",label:"Upload files"})]}),r?(0,P.jsx)(H,{}):(0,P.jsx)(V,{})]})})}var Y=r(74165),B=r(15861),X=r(60494),L=r(5330),K=r(35539),Q=r(66808),G=r(18589),J=r(55191),$=r(50160),ee=r(71161);function se(e){var s=e.data,r=e.onClose,l=e.opened,t=e.reqRefresh,a=(0,u.useState)({fullname:s.fullname,email:s.email,role:s.role}),i=(0,n.Z)(a,2),c=i[0],o=i[1];return(0,P.jsx)(ee.u,{opened:l,onClose:function(){return r(void 0)},title:"Edit Faculty Account",children:(0,P.jsxs)("form",{action:"",onSubmit:function(e){e.preventDefault(),d.Z.put("/users/".concat(s.id),{user:c}).then((function(e){(0,S.c0)({title:"Success",message:"Information Updated Successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}),t(),r(void 0)})).catch((function(e){console.log(e.response.data.err),(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:!1,radius:"xl"})}))},children:[(0,P.jsx)(v.o,{label:"Fullname",required:!0,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{fullname:e.target.value}))},value:c.fullname}),(0,P.jsx)(v.o,{label:"email",required:!0,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{email:e.target.value}))},value:c.email}),(0,P.jsx)(C.p,{label:"Role",required:!0,data:["admin","faculty"],value:c.role,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{role:e.target.value}))}}),(0,P.jsx)(w.z,{type:"submit",radius:"md",mt:12,children:"Update"})]})})}function re(e){var s=e.data,r=e.reqRefresh;console.log(s);var l=(0,X.rZ)(),a=(0,u.useState)(),i=(0,n.Z)(a,2),c=i[0],o=i[1],h=s.map((function(e){return(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{children:(0,P.jsx)(L.Z,{spacing:"sm",children:(0,P.jsx)(f.x,{size:"sm",weight:500,children:e.fullname})})}),(0,P.jsx)("td",{children:(0,P.jsx)(E.C,{variant:"dark"===l.colorScheme?"light":"outline",color:"admin"===e.role?"pink":"cyan",children:e.role})}),(0,P.jsx)("td",{children:(0,P.jsx)(t.e,{size:"sm",href:"#",onClick:function(e){return e.preventDefault()},underline:!1,children:e.email})}),(0,P.jsx)("td",{children:(0,P.jsxs)(L.Z,{children:[(0,P.jsx)(K.u,{label:"Edit user",color:"dark",withArrow:!0,children:(0,P.jsx)(Q.A,{onClick:(0,B.Z)((0,Y.Z)().mark((function s(){return(0,Y.Z)().wrap((function(s){for(;;)switch(s.prev=s.next){case 0:o(e),console.log(c);case 2:case"end":return s.stop()}}),s)}))),children:(0,P.jsx)(J.Z,{size:16,stroke:1.5})})}),(0,P.jsx)(K.u,{label:"Delete user",color:"dark",withArrow:!0,children:(0,P.jsx)(Q.A,{color:"red",onClick:function(){x(e.fullname,e.id)},children:(0,P.jsx)($.Z,{size:16,stroke:1.5})})})]})})]},e.id)})),x=function(e,s){return(0,W._5)({title:"Delete ".concat(e,"  profile"),centered:!0,children:(0,P.jsxs)(f.x,{children:["Are you sure you want to delete"," ",(0,P.jsxs)(f.x,{span:!0,fw:700,children:[" ",e,"'s"," "]})," ","profile? This action is destructive."]}),labels:{confirm:"Delete account",cancel:"cancel"},confirmProps:{color:"red"},onCancel:function(){return W.pT},onConfirm:function(){return function(e){d.Z.delete("/users/".concat(e)).then((function(e){(0,S.c0)({title:"Success",message:"User Deleted successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}),r("faculty")})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:3500,radius:"xl"})}))}(s)}})};return(0,P.jsx)(m.X,{shadow:"md",p:"md",children:(0,P.jsxs)(G.x,{children:[c&&(0,P.jsx)(se,{opened:void 0!==c,data:c,onClose:o,reqRefresh:function(){r("faculty")}}),(0,P.jsxs)(F.i,{sx:{minWidth:800},verticalSpacing:"sm",highlightOnHover:!0,children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{children:"Faculty"}),(0,P.jsx)("th",{children:"Role"}),(0,P.jsx)("th",{children:"Email"}),(0,P.jsx)("th",{children:"Actions"})]})}),(0,P.jsx)("tbody",{children:h})]})]})})}function ne(e){var s=e.data;console.log(s);var r=(0,X.rZ)(),n=s.map((function(e){return(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{children:(0,P.jsx)(L.Z,{spacing:"sm",children:(0,P.jsx)(f.x,{size:"sm",weight:500,children:e.fullname})})}),(0,P.jsx)("td",{children:(0,P.jsx)(E.C,{variant:"dark"===r.colorScheme?"light":"outline",color:"faculty"===e.role?"cyan":"yellow",children:e.role})}),(0,P.jsx)("td",{children:(0,P.jsx)(t.e,{size:"sm",href:"#",onClick:function(e){return e.preventDefault()},underline:!1,children:e.email})}),(0,P.jsx)("td",{}),(0,P.jsx)("td",{children:(0,P.jsxs)(L.Z,{children:[(0,P.jsx)(Q.A,{children:(0,P.jsx)(J.Z,{size:16,stroke:1.5})}),(0,P.jsx)(Q.A,{color:"red",onClick:function(){var s;s=e.userId,d.Z.delete("/users/".concat(s),{data:{hardDelete:!0}}).then((function(e){(0,S.c0)({title:"Success",message:"User Deleted successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"})})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:3500,radius:"xl"})}))},children:(0,P.jsx)($.Z,{size:16,stroke:1.5})})]})})]},e.id)}));return(0,P.jsx)(G.x,{children:(0,P.jsxs)(F.i,{sx:{minWidth:800},verticalSpacing:"sm",highlightOnHover:!0,children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{children:"Name"}),(0,P.jsx)("th",{children:"Role"}),(0,P.jsx)("th",{children:"Email"}),(0,P.jsx)("th",{}),(0,P.jsx)("th",{children:"Actions"})]})}),(0,P.jsx)("tbody",{children:n})]})})}function le(e){var s=e.data,r=e.onClose,l=e.opened,t=e.reqRefresh,a=(0,u.useState)({User:{fullname:s.User.fullname,email:s.User.email,role:"student"},student:{curr_sem:s.curr_sem,curryear:s.curryear,examseatno:s.examseatno,prn:s.prn,rollno:s.rollno},parent:{email:s.Parent.email,phone:s.Parent.phone}}),i=(0,n.Z)(a,2),c=i[0],o=i[1],h=(0,u.useState)(c.student.curryear),x=(0,n.Z)(h,2),j=x[0],m=x[1];return(0,P.jsx)(ee.u,{opened:l,onClose:function(){return r(void 0)},title:"Edit Student Account",children:(0,P.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log(c),d.Z.put("/users/".concat(s.userId),{user:c.User}).then((function(e){d.Z.put("/student/".concat(s.userId),{student:c.student}).then((function(e){d.Z.put("/parents/".concat(s.userId),(0,g.Z)({},c.parent)).then((function(e){(0,S.c0)({title:"Success",message:"Information Updated Successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}),t("students"),r(void 0)})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:!1,radius:"xl"})}))})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:!1,radius:"xl"})}))})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:!1,radius:"xl"})}))},children:[(0,P.jsx)(v.o,{label:"Name",withAsterisk:!0,required:!0,value:c.User.fullname,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{User:(0,g.Z)((0,g.Z)({},c.User),{},{fullname:e.target.value})}))}}),(0,P.jsx)(v.o,{label:"Email",withAsterisk:!0,required:!0,type:"email",value:c.User.email,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{User:(0,g.Z)((0,g.Z)({},c.User),{},{email:e.target.value})}))}}),(0,P.jsx)(v.o,{label:"Roll Number",withAsterisk:!0,required:!0,type:"number",value:c.student.rollno,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{student:(0,g.Z)((0,g.Z)({},c.student),{},{rollno:e.target.value})}))}}),(0,P.jsx)(v.o,{label:"Exam seat Number",value:c.student.examseatno,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{student:(0,g.Z)((0,g.Z)({},c.student),{},{examseatno:e.target.value})}))}}),(0,P.jsx)(v.o,{label:"Permanent Registration Number",value:c.student.prn,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{student:(0,g.Z)((0,g.Z)({},c.student),{},{prn:e.target.value})}))}}),(0,P.jsx)(C.p,{data:["3","4","5","6","7","8"],label:"Semester",value:c.student.curr_sem,onChange:function(e){var s;o((0,g.Z)((0,g.Z)({},c),{},{student:(0,g.Z)((0,g.Z)({},c.student),{},{curr_sem:e.target.value,curryear:(s=e.target.value,"3"===s||"4"===s?(m("2"),"2"):"5"===s||"6"===s?(m("3"),"3"):"7"===s||"8"===s?(m("4"),"4"):void 0)})}))}}),(0,P.jsx)(v.o,{label:"Year",value:j,disabled:!0}),(0,P.jsx)(v.o,{label:"Parent Mobile Number",value:c.parent.phone,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{parent:(0,g.Z)((0,g.Z)({},c.parent),{},{phone:e.target.value})}))}}),(0,P.jsx)(v.o,{label:"Parent Email",value:c.parent.email,onChange:function(e){o((0,g.Z)((0,g.Z)({},c),{},{parent:(0,g.Z)((0,g.Z)({},c.parent),{},{email:e.target.value})}))}}),(0,P.jsx)(w.z,{type:"submit",radius:"md",mt:12,leftIcon:(0,P.jsx)(y.Z,{}),children:"Submit"})]})})}function te(e){var s=e.data,r=e.reqRefresh,l=(0,X.rZ)();console.log(s);var a=(0,u.useState)(void 0),i=(0,n.Z)(a,2),c=i[0],o=i[1],h=s.map((function(e){return(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{children:(0,P.jsx)(L.Z,{spacing:"sm",children:(0,P.jsx)(f.x,{size:"sm",weight:500,children:e.User.fullname})})}),(0,P.jsx)("td",{children:(0,P.jsx)(E.C,{variant:"dark"===l.colorScheme?"light":"outline",color:"yellow",children:"Student"})}),(0,P.jsx)("td",{children:(0,P.jsx)(t.e,{size:"sm",href:"#",onClick:function(e){return e.preventDefault()},underline:!1,children:e.User.email})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.rollno})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.examseatno})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.prn})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.curr_sem})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.curryear})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.Parent.phone})}),(0,P.jsx)("td",{children:(0,P.jsx)(f.x,{size:"sm",children:e.Parent.email})}),(0,P.jsx)("td",{children:(0,P.jsxs)(L.Z,{children:[(0,P.jsx)(K.u,{label:"Edit user",color:"dark",withArrow:!0,children:(0,P.jsx)(Q.A,{onClick:function(){o(e)},children:(0,P.jsx)(J.Z,{size:16,stroke:1.5})})}),(0,P.jsx)(K.u,{label:"Delete user",color:"dark",withArrow:!0,children:(0,P.jsx)(Q.A,{color:"red",onClick:function(){x(e.User.fullname,e.userId)},children:(0,P.jsx)($.Z,{size:16,stroke:1.5})})})]})})]},e.userId)})),x=function(e,s){return(0,W._5)({title:"Delete ".concat(e,"  profile"),centered:!0,children:(0,P.jsxs)(f.x,{children:["Are you sure you want to delete"," ",(0,P.jsxs)(f.x,{span:!0,fw:700,children:[" ",e,"'s"," "]})," ","profile? This action is destructive."]}),labels:{confirm:"Delete account",cancel:"cancel"},confirmProps:{color:"red"},onCancel:function(){return W.pT},onConfirm:function(){return function(e){d.Z.delete("/users/".concat(e)).then((function(e){(0,S.c0)({title:"Success",message:"User Deleted successfully",icon:(0,P.jsx)(y.Z,{}),color:"teal",autoClose:2e3,radius:"xl"}),r("students")})).catch((function(e){(0,S.c0)({title:"Failed",message:e.response.data.err,icon:(0,P.jsx)(U.Z,{}),color:"red",autoClose:3500,radius:"xl"})}))}(s)}})};return(0,P.jsx)(m.X,{shadow:"md",p:"md",children:(0,P.jsxs)(G.x,{h:700,children:[c&&(0,P.jsx)(le,{opened:void 0!=c,onClose:o,data:c,reqRefresh:r}),(0,P.jsxs)(F.i,{sx:{minWidth:800},verticalSpacing:"sm",highlightOnHover:!0,withColumnBorders:!0,children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{children:"Student"}),(0,P.jsx)("th",{children:"Role"}),(0,P.jsx)("th",{children:"Email"}),(0,P.jsx)("th",{children:"Roll no."}),(0,P.jsx)("th",{children:"Exam seat no."}),(0,P.jsx)("th",{children:"PRN"}),(0,P.jsx)("th",{children:"Semester"}),(0,P.jsx)("th",{children:"Year"}),(0,P.jsx)("th",{children:"Parent's Mobile Number"}),(0,P.jsx)("th",{children:"Parent's Email"}),(0,P.jsx)("th",{children:"Actions"})]})}),(0,P.jsx)("tbody",{children:h})]})]})})}var ae=r(57689),ie=r(86312);var ce=function(){return(0,P.jsxs)(ie.U,{defaultValue:"customization",children:[(0,P.jsxs)(ie.U.Item,{value:"Create Users",children:[(0,P.jsx)(ie.U.Control,{children:"Create Users"}),(0,P.jsx)(ie.U.Panel,{children:(0,P.jsx)("iframe",{src:"https://scribehow.com/embed/How_to_Add_a_User_with_Name_and_Email__oo9I87-cQhep0jDSkyFrcA?as=scrollable",width:"100%",height:"640",allowfullscreen:!0,frameborder:"0"})}),(0,P.jsx)(ie.U.Panel,{children:(0,P.jsx)("iframe",{src:"https://scribehow.com/embed/Uploading_a_File_on_User_Management_1__bNz3eU8lRUu32poLsXe12w?as=scrollable",width:"100%",height:"640",allowfullscreen:!0,frameborder:"0"})})]}),(0,P.jsxs)(ie.U.Item,{value:"manage-faculty",children:[(0,P.jsx)(ie.U.Control,{children:"Manage Faculty"}),(0,P.jsx)(ie.U.Panel,{children:(0,P.jsx)("iframe",{src:"https://scribehow.com/embed/Updating_a_Users_Email_Address__HxzMrCxDTu29VOqfBlVNBw",width:"100%",height:"640",allowfullscreen:!0,frameborder:"0"})})]}),(0,P.jsxs)(ie.U.Item,{value:"manage-students",children:[(0,P.jsx)(ie.U.Control,{children:"Manage Students"}),(0,P.jsx)(ie.U.Panel,{children:(0,P.jsx)("iframe",{src:"https://scribehow.com/embed/How_to_Edit_and_Delete_User_Account_Information__saclmdD_TP6xQ77wZkzDGg",width:"100%",height:"640",allowfullscreen:!0,frameborder:"0"})})]}),(0,P.jsxs)(ie.U.Item,{value:"restore accounts",children:[(0,P.jsx)(ie.U.Control,{children:"Restore Deleted Accounts"}),(0,P.jsx)(ie.U.Panel,{})]})]})};function oe(){var e=(0,ae.s0)(),s=(0,ae.UO)().tabValue,r=(0,u.useState)([]),h=(0,n.Z)(r,2),x=h[0],j=h[1],m=(0,u.useState)([]),f=(0,n.Z)(m,2),p=f[0],g=f[1],Z=(0,u.useState)([]),v=(0,n.Z)(Z,2),b=v[0],C=v[1],w=(0,u.useState)("first-render"),y=(0,n.Z)(w,2),U=y[0],k=y[1],S=function(){d.Z.get("/faculty/all").then((function(e){j(e.data.objects)}))},_=function(){d.Z.get("/student/search").then((function(e){g(e.data.objects)}))},z=function(){d.Z.get("/users/trash").then((function(e){C(e.data.objects)}))};return(0,u.useEffect)((function(){"first-render"===U?(S(),_(),z()):"faculty"===U?(S(),k(void 0)):"students"===U?(_(),k(void 0)):"trash"===U&&(z(),k(void 0))}),[U]),(0,P.jsxs)(l.W,{size:"xl",children:[(0,P.jsx)(t.e,{href:"/dashboard",color:"gray",mt:24,children:(0,P.jsxs)(a.M,{inline:!0,children:[(0,P.jsx)(o.Z,{size:24,stroke:1.5}),(0,P.jsx)(i.x,{ml:5,children:"Back to Dashboard"})]})}),(0,P.jsxs)(c.m,{variant:"pills",radius:"lg",defaultValue:"1",value:s,onTabChange:function(s){e("/user-mgmt/".concat(s))},children:[(0,P.jsxs)(c.m.List,{children:[(0,P.jsx)(c.m.Tab,{value:"1",children:"Create Users"}),(0,P.jsx)(c.m.Tab,{value:"2",children:"Manage Faculty"}),(0,P.jsx)(c.m.Tab,{value:"3",children:"Manage Students"}),(0,P.jsx)(c.m.Tab,{value:"5",children:"How to use"})]}),(0,P.jsxs)(c.m.Panel,{value:"1",pt:"xs",children:["Create new users",(0,P.jsx)(O,{})]}),(0,P.jsxs)(c.m.Panel,{value:"2",pt:"xs",children:["Manage all faculty accounts",(0,P.jsx)(re,{data:x,reqRefresh:k})]}),(0,P.jsxs)(c.m.Panel,{value:"3",pt:"xs",children:["Manage all student accounts",(0,P.jsx)(te,{data:p,reqRefresh:k})]}),(0,P.jsxs)(c.m.Panel,{value:"4",pt:"xs",children:["Restore or Permanently Delete, previously deleted, accounts.",(0,P.jsx)(ne,{data:b,reqRefresh:k})]}),(0,P.jsx)(c.m.Panel,{value:"5",pt:"xs",children:(0,P.jsx)(ce,{})})]})]})}}}]);
//# sourceMappingURL=965.8bc0fc88.chunk.js.map
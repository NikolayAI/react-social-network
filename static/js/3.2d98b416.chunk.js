(this.webpackJsonpreact_social_network=this.webpackJsonpreact_social_network||[]).push([[3],{291:function(e,t,a){e.exports={divContentImg:"ProfileInfo_divContentImg__3ruaB",descriptionBlock:"ProfileInfo_descriptionBlock__3cd8Y",mainPhoto:"ProfileInfo_mainPhoto__1Fgjo",contact:"ProfileInfo_contact__1N3gp"}},292:function(e,t,a){e.exports={postsBlock:"MyPosts_postsBlock__2ifKf",posts:"MyPosts_posts__3tZ1c"}},293:function(e,t,a){e.exports={item:"Post_item__ihtu9"}},294:function(e,t,a){"use strict";a.r(t),a.d(t,"ProfileContainer",(function(){return z}));var n=a(35),o=a(36),r=a(40),l=a(39),s=a(0),i=a.n(s),c=a(96),u=a(291),m=a.n(u),f=a(38),p=function(e){var t=Object(s.useState)(!1),a=Object(c.a)(t,2),n=a[0],o=a[1],r=Object(s.useState)(e.status),l=Object(c.a)(r,2),u=l[0],m=l[1];return Object(s.useEffect)((function(){m(e.status)}),[e.status]),i.a.createElement(i.a.Fragment,null,i.a.createElement("b",null,"Status: "),n?i.a.createElement("input",{autoFocus:!0,onChange:function(e){return m(e.currentTarget.value)},onBlur:function(){o(!1),e.updateUserStatus(u)},value:u}):i.a.createElement("span",{onDoubleClick:function(){return o(!0)}},e.status||"-------"))},d=a(65),b=a.n(d),v=a(25),E=a(129),h=a(49),g=a.n(h),k=Object(E.a)({form:"editProfile"})((function(e){var t=e.profile,a=e.handleSubmit,n=e.offEditMode,o=e.error;return i.a.createElement("form",{onSubmit:a},i.a.createElement("button",null,"save"),i.a.createElement("button",{onClick:n},"cancel"),o&&i.a.createElement("div",{className:g.a.formSummaryError},o),i.a.createElement("div",null,i.a.createElement("b",null,"Full name"),":",Object(v.c)("Full name","fullName",[],v.a)),i.a.createElement("div",null,i.a.createElement("b",null,"Looking for a job"),":",Object(v.c)("Looking for a job","lookingForAJob",[],v.a,{type:"checkbox"})),i.a.createElement("div",null,i.a.createElement("b",null,"My professional skills"),":",Object(v.c)("My professional skills","lookingForAJobDescription",[],v.b)),i.a.createElement("div",null,i.a.createElement("b",null,"About me"),":",Object(v.c)("About me","aboutMe",[],v.b)),i.a.createElement("div",null,i.a.createElement("b",null,"Contacts"),": ",Object.keys(null!==t&&t.contacts).map((function(e){return i.a.createElement("div",{key:e,className:m.a.contact},i.a.createElement("b",null,e,":"),Object(v.c)(e,"contacts."+e.toLocaleLowerCase(),[],v.a))}))))})),P=function(e){var t=e.profile,a=e.isOwner,n=e.onEditMode;return i.a.createElement(i.a.Fragment,null,a&&i.a.createElement("button",{onClick:n},"edit"),i.a.createElement("div",null,i.a.createElement("b",null,"Full name"),": ",null===t||void 0===t?void 0:t.fullName),i.a.createElement("div",null,i.a.createElement("b",null,"Looking for a job"),": ",(null===t||void 0===t?void 0:t.lookingForAJob)?"yes":"no"),(null===t||void 0===t?void 0:t.lookingForAJob)&&i.a.createElement("div",null,i.a.createElement("b",null,"My professional skills"),": ",null===t||void 0===t?void 0:t.lookingForAJobDescription),i.a.createElement("div",null,i.a.createElement("b",null,"About me"),": ",null===t||void 0===t?void 0:t.aboutMe),i.a.createElement("div",null,i.a.createElement("b",null,"Contacts"),": ",Object.keys(null!==t&&t.contacts).map((function(e){return i.a.createElement(O,{key:e,contactTitle:e,contactValue:null===t||void 0===t?void 0:t.contacts[e]})}))))},O=function(e){var t=e.contactTitle,a=e.contactValue;return i.a.createElement("div",{className:m.a.contact},i.a.createElement("b",null,t),": ",a)},j=function(e){var t=e.profile,a=e.status,n=e.updateUserStatus,o=e.isOwner,r=e.onSavePhoto,l=e.saveProfile,u=Object(s.useState)(!1),d=Object(c.a)(u,2),v=d[0],E=d[1],h=function(){return E(!1)};return i.a.createElement("div",null,i.a.createElement("div",{className:m.a.divContentImg},i.a.createElement("img",{className:"contentImg",src:"",alt:""})),i.a.createElement("div",{className:m.a.descriptionBlock},t?i.a.createElement("img",{src:t.photos.large||b.a,alt:"profile photo",className:m.a.mainPhoto}):i.a.createElement(f.a,null),o&&i.a.createElement("input",{type:"file",onChange:function(e){var t;(null===(t=e.target.files)||void 0===t?void 0:t.length)&&r(e.target.files[0])}}),i.a.createElement("div",null,i.a.createElement(p,{status:a,updateUserStatus:n})),v?i.a.createElement(k,{profile:t,onSubmit:function(e){l(e).then((function(){return h()}))},offEditMode:h}):i.a.createElement(P,{profile:t,isOwner:o,onEditMode:function(){return E(!0)}})))},_=a(97),y=a(292),S=a.n(y),I=a(293),C=a.n(I),M=function(e){return i.a.createElement("div",{className:C.a.item},i.a.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/ru/d/da/%D0%90%D0%B2%D0%B0%D1%82%D0%B0%D1%80_3.jpg",alt:""}),e.message,i.a.createElement("div",null,i.a.createElement("span",null,"like")," ",e.likesCount))},U=a(66),w=Object(U.a)(10),F=Object(E.a)({form:"profileMyPostsForm"})((function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,Object(v.c)("Enter your message","profileMyPostsMessage",[U.b,w],v.b)),i.a.createElement("div",null,i.a.createElement("button",null,"Add post"))))})),N=function(e){var t=e.posts.map((function(e){return i.a.createElement(M,{key:e.id,message:e.message,likesCount:e.likesCount,id:e.id})})).reverse();return i.a.createElement("div",{className:S.a.postsBlock},i.a.createElement("h3",null,"my posts"),i.a.createElement(F,{onSubmit:function(t){e.addPostHandler(t.profileMyPostsMessage)}}),i.a.createElement("div",{className:S.a.posts},t))},A=a(14),D={addPostHandler:_.c.addPostAC},B=Object(A.b)((function(e){return{posts:e.profilePage.posts}}),D)(N),J=function(e){return i.a.createElement("div",null,i.a.createElement(j,{isOwner:e.isOwner,profile:e.profile,status:e.status,updateUserStatus:e.updateUserStatus,onSavePhoto:e.onSavePhoto,saveProfile:e.saveProfile}),i.a.createElement(B,null))},x=a(10),L=a(9),z=function(e){Object(r.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var o=arguments.length,r=new Array(o),l=0;l<o;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).refreshProfile=function(){var t=Number(e.props.match.params.userId)||null;if(t||(t=e.props.authorizedUserId)||e.props.history.push("/login/"),!t)throw new Error('ID should exists in URI params or in state("authorizedUserId")');e.props.getUserProfile(t),e.props.getUserStatus(t)},e}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t){this.props.match.params.userId!==e.match.params.userId&&this.refreshProfile()}},{key:"render",value:function(){return i.a.createElement(J,{isOwner:!this.props.match.params.userId,profile:this.props.profile,status:this.props.status,updateUserStatus:this.props.updateUserStatus,onSavePhoto:this.props.savePhoto,saveProfile:this.props.saveProfile})}}]),a}(i.a.Component),T={getUserProfile:_.a,getUserStatus:_.b,updateUserStatus:_.g,savePhoto:_.e,saveProfile:_.f};t.default=Object(L.d)(Object(A.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth}}),T),x.g)(z)}}]);
//# sourceMappingURL=3.2d98b416.chunk.js.map
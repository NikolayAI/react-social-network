(this.webpackJsonpreact_social_network=this.webpackJsonpreact_social_network||[]).push([[3],{291:function(e,t,a){e.exports={divContentImg:"ProfileInfo_divContentImg__3ruaB",descriptionBlock:"ProfileInfo_descriptionBlock__3cd8Y"}},292:function(e,t,a){e.exports={postsBlock:"MyPosts_postsBlock__2ifKf",posts:"MyPosts_posts__3tZ1c"}},293:function(e,t,a){e.exports={item:"Post_item__ihtu9"}},294:function(e,t,a){"use strict";a.r(t),a.d(t,"ProfileContainer",(function(){return w}));var n=a(33),r=a(34),s=a(36),o=a(35),u=a(0),l=a.n(u),i=a(291),c=a.n(i),p=a(38),m=a(129);var d=function(e){var t=Object(u.useState)(!1),a=Object(m.a)(t,2),n=a[0],r=a[1],s=Object(u.useState)(e.status),o=Object(m.a)(s,2),i=o[0],c=o[1];return Object(u.useEffect)((function(){c(e.status)}),[e.status]),l.a.createElement(l.a.Fragment,null,n?l.a.createElement("div",null,l.a.createElement("input",{autoFocus:!0,onChange:function(e){return c(e.currentTarget.value)},onBlur:function(){r(!1),e.updateUserStatus(i)},value:i})):l.a.createElement("div",null,l.a.createElement("span",{onDoubleClick:function(){return r(!0)}},e.status||"-------")))},f=function(e){var t=e.profile,a=e.status,n=e.updateUserStatus;return l.a.createElement("div",null,l.a.createElement("div",{className:c.a.divContentImg},l.a.createElement("img",{className:"contentImg",src:"",alt:""})),l.a.createElement("div",{className:c.a.descriptionBlock},t?l.a.createElement("img",{src:t.photos.large,alt:""}):l.a.createElement(p.a,null),"ava + desription",l.a.createElement(d,{status:a,updateUserStatus:n})))},v=a(96),E=a(292),h=a.n(E),b=a(293),g=a.n(b);var k=function(e){return l.a.createElement("div",{className:g.a.item},l.a.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/ru/d/da/%D0%90%D0%B2%D0%B0%D1%82%D0%B0%D1%80_3.jpg",alt:""}),e.message,l.a.createElement("div",null,l.a.createElement("span",null,"like")," ",e.likesCount))},_=a(128),j=a(89),O=a(86),P=a(48);var S=Object(_.a)({form:"profileMyPostsForm"})((function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",{onSubmit:e.handleSubmit},l.a.createElement("div",null,l.a.createElement(j.a,{component:y,name:"profileMyPostsMessage",placeholder:"Enter your message",validate:[O.b,U]})),l.a.createElement("div",null,l.a.createElement("button",null,"Add post"))))})),U=Object(O.a)(10),y=Object(P.a)("textarea");var B=function(e){var t=e.posts.map((function(e){return l.a.createElement(k,{key:e.id,message:e.message,likesCount:e.likesCount,id:e.id})})).reverse();return l.a.createElement("div",{className:h.a.postsBlock},l.a.createElement("h3",null,"my posts"),l.a.createElement(S,{onSubmit:function(t){e.addPostHandler(t.profileMyPostsMessage)}}),l.a.createElement("div",{className:h.a.posts},t))},C=a(12),I=Object(C.b)((function(e){return{posts:e.profilePage.posts}}),(function(e){return{addPostHandler:function(t){return e(Object(v.a)(t))}}}))(B);var D=function(e){return l.a.createElement("div",null,l.a.createElement(f,{profile:e.profile,status:e.status,updateUserStatus:e.updateUserStatus}),l.a.createElement(I,null))},M=a(10),N=a(8),w=function(e){Object(s.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=Number(this.props.match.params.userId)||null;e||(e=this.props.authorizedUserId)||this.props.history.push("/login/"),this.props.getUserProfile(e),this.props.getUserStatus(e)}},{key:"render",value:function(){return l.a.createElement(D,{profile:this.props.profile,status:this.props.status,updateUserStatus:this.props.updateUserStatus})}}]),a}(l.a.Component),x={getUserProfile:v.b,getUserStatus:v.c,updateUserStatus:v.e};t.default=Object(N.d)(Object(C.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth}}),x),M.f)(w)}}]);
//# sourceMappingURL=3.f6f3c4fe.chunk.js.map
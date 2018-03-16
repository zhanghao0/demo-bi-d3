!function(){var t={version:"0.1.0",classname:"bichart"};t.canvas=function(e,n){var a=n||{top:0,right:0,bottom:0,left:0},r="string"==typeof e?d3.select(e):e,s=r.node().clientWidth || r.node().width,i=r.node().clientHeight,l=r.append("svg").attr("width",s).attr("height",i).style("overflow","visible"),o=l.append("g").attr("class",t.classname+"-g-root").attr("transform","translate("+a.left+","+a.top+")");return{outer:{object:l,width:s,height:i,left:0,top:0},inner:{object:o,width:s-a.left-a.right,height:i-a.top-a.bottom,left:a.left,top:a.top}}},t.googleMapCanvas=function(t,e,n){var a=d3.select(t),r=600,s=a.node().clientHeight,i=new google.maps.Map(a.node(),{zoom:n||11,center:new google.maps.LatLng(e?e[0]:0,e?e[1]:0),mapTypeId:google.maps.MapTypeId.TERRAIN}),l=new google.maps.OverlayView;return l.setMap(i),{outer:{object:a,width:r,height:s,left:0,top:0},inner:{object:l,width:r,height:s,left:0,top:0}}},t.helper={rgbToHex:function(t,e,n){return"#"+("0"+t.toString(16)).slice(-2)+("0"+e.toString(16)).slice(-2)+("0"+n.toString(16)).slice(-2)},hexToRgb:function(t){var e=parseInt(t.slice(1),16),n=e>>16&255,a=e>>8&255,r=255&e;return[n,a,r]},hslToRgb:function(t,e,n){function a(t,e,n){return 0>n&&(n+=1),n>1&&(n-=1),1/6>n?t+6*(e-t)*n:.5>n?e:2/3>n?t+(e-t)*(2/3-n)*6:t}var r,s,i;if(0==e)r=s=i=n;else{var l=.5>n?n*(1+e):n+e-n*e,o=2*n-l;r=a(o,l,t+1/3),s=a(o,l,t),i=a(o,l,t-1/3)}var c=Math.round(255*r),u=Math.round(255*s),f=Math.round(255*i);return this.rgbToHex(c,u,f)},colors:function(e,n,a,r,s){if(!arguments||1>e)return function(){return"#000"};for(var i,l=[],o=n||0;e>o;o+=a||1){var c=t.helper.hslToRgb(o/e*2/3,r||1,s||.6);l.push(c)}return i=function(t){return l[t]},function(t){return i(t)}},colorSeries:function(t,e,n){var a=.8/e/4,r=.5/e/4;return this.colors(t*e,n,e,.8-n*a,.5-n*r)},brigherColor:function(t){var e=this.hexToRgb(t),n=e.map(function(t){return Math.min(30>=t?60:t/.5,255)});return this.rgbToHex(n[0],n[1],n[2])},escapeName:function(t){return t.replace(/ /g,"").replace(/_/g,"").replace(/&/g,"").replace(/@/g,"")},getCenter:function(t){return[t.clientWidth/2+t.clientLeft,t.clientHeight/2+t.clientTop]},getBounds:function(t){for(var e=t;!e.clientWidth||!e.clientHeight;)e=e.parentElement;return new Rectangle(e.clientLeft,e.clientTop,e.clientWidth,e.clientHeight)},getRandomInt:function(t,e){return Math.floor(Math.random()*(e-t+1))+t},unique0:function(t){return t.reverse().filter(function(t,e,n){return-1===n.indexOf(t,e+1)}).reverse()},unique:function(t,e){var n=t.map(function(t){return t[e]});return n.reverse().filter(function(t,e,n){return-1===n.indexOf(t,e+1)}).reverse()}};t.googleMap=function(e){function n(t,e,n){var a=new google.maps.LatLng(n,e);return a=t.fromLatLngToDivPixel(a)}var a={classname:t.classname+"-googlemap"};a.nodeGClassname=a.classname+"-g-node";var r,s,i={},l=e.inner.object;return l.onAdd=function(){var o=d3.select(this.getPanes().overlayMouseTarget).append("div").attr("class","topology").style("width","600px").style("height",e.outer.height + "px" ).style("overflow","visible"),c=t.canvas(o),u=c.inner.object;l.draw=function(){if(s){var l=s.chartType,o=s.data,c=(s.category,s.series),f=this.getProjection(),h=Object.keys(o),d={};h.forEach(function(t){d[t]=n(f,o[t].location.Latitude,o[t].location.Longitude)});var m=u.selectAll("g."+a.nodeGClassname).data(h,function(t,e){return e});m.exit().remove(),m.enter().append("g").attr("class",a.nodeGClassname),m.attr("transform",function(t){return"translate("+d[t].x+","+d[t].y+")"}).each(function(n,a){var s=d3.select(this);if("pie"==l){var f=i[n];if(!f){var h=e.outer.width,d=e.outer.height,m={outer:{object:u,width:h,height:d,left:0,top:0},inner:{object:s,width:h,height:d,left:0,top:0}};f=t.pie(m),f.baseRadius(0).width(15).ringGap(5).arcGap(.01).negativeRatio(1.2).animationMode(0),i[n]=f}var v={};c.forEach(function(t){v[t.alias]={x:0,y:0}}),f.draw(r,o[n],"topLeft")}})}}},a.draw=function(t,e){r=t,s=e,l.draw()},a},t.line=function(e){function n(t,e,n,a){var r=n;if(!r){var s=t.selectAll("g."+o.xAxisClassname).data([]);return void s.exit().remove()}var i=n.auto?[n.display]:Object.keys(r.values());console.log("xFieldKeys",i);var l;l||(l=d3.scale.ordinal().domain(i).rangePoints([0,e.width]));var c=d3.svg.axis().scale(l).orient("bottom").tickValues(i),s=t.selectAll("g."+o.xAxisClassname).data([0],function(t,e){return t});return s.exit().remove(),s.enter().append("g").attr("class",o.axisClassname+" "+o.xAxisClassname).attr("transform","translate(0,"+e.height+")").append("text").attr("class","xtitle"),s.call(c),s.selectAll("text").attr("x",-9).attr("y",0).attr("dy",".35em").attr("transform","rotate(-90)").style("text-anchor","end"),s.selectAll("text.xtitle").attr("class","xtitle").attr("x",e.width).attr("y",-20).attr("dy",".71em").attr("transform","rotate(0)").text(function(t){return r.display}),l}function a(t,e,n,a){var s=a[0];if(!s){var i=t.selectAll("g."+o.yAxisClassname).data([]);return void i.exit().remove()}var l=[];a.forEach(function(t){l.push(t.alias)});var c=r(n,l,!0);c[0]>0&&(c[0]=0);var u=d3.scale.linear().domain(c).range([e.height,0]),f=d3.svg.axis().scale(u).orient("left").tickFormat(d3.format(".0f"));c[1]<10&&f.ticks(c[1]);var i=t.selectAll("g."+o.yAxisClassname).data([0]);return i.exit().remove(),i.enter().append("g").attr("class",o.axisClassname+" "+o.yAxisClassname).append("text").attr("class","ytitle"),i.call(f).selectAll("text.ytitle").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text(function(t){return s.display}),u}function r(t,e,n){function a(n,r){var s=[];t.forEach(function(t,a){e.forEach(function(e){0==a?(s[e]=[t[e],t[e]],0==r&&(n[e]=[t[e],t[e]])):t[e]<s[e][0]?s[e][0]=t[e]:t[e]>s[e][1]&&(s[e][1]=t[e])})}),e.forEach(function(t){s[t][0]<n[t][0]&&(n[t][0]=s[t][0]),s[t][1]>n[t][1]&&(n[t][1]=s[t][1])}),t.forEach(function(t){t.children&&a(r+1)})}var r={};a(r,0);var s,i=Object.keys(r);return i.length?i.forEach(function(t,e){0==e?s=[r[t][0],r[t][1]]:(s[0]>r[t][0]&&(s[0]=r[t][0]),s[1]<r[t][1]&&(s[1]=r[t][1]))}):s=[0,100],s}function s(t,e,n,a,r){if(0==e.length||0==n.length)return[];var s={};t.forEach(function(t){n.forEach(function(n){var i={};i.cname1=e[0].name,i.cvalue1=t[e[0].alias]||e[0].display,i.cauto1=e[0].auto,e[1]&&(i.cname2=e[1].name,i.cvalue2=t[e[1].alias]||"[All]"),i.sname=n.display,i.svalue=t[n.alias],i.x=a(i.cvalue1),i.y=r(i.svalue),e[1]?(s[n.name+" "+i.cvalue2]||(s[n.name+" "+i.cvalue2]=[])).push(i):(s[n.name]||(s[n.name]=[])).push(i)})});var i=Object.keys(s),l=[];return i.forEach(function(t){l.push(s[t])}),l}function i(e,n,a,r,i,f){var h=l(f),d=s(r,i,f,n,a),v=d3.svg.line().x(function(t){return console.log("x2",t.x,t),t.x}).y(function(t){return console.log("y2",t.y,t),t.y});if(i[1]){var g=Object.keys(i[1].values()),p=i[1].values();p["[All]"]=g.length}else var g=[0];var y=t.helper.colorSeries(g.length+1,1,0),_=e.selectAll("g."+o.lineGClassname).data(d,function(t,e){return e});_.exit().remove(),_.enter().append("g").attr("class",o.lineGClassname).append("path").attr("class",o.lineClassname),_.each(function(t){var e=d3.select(this);e.select("path."+o.lineClassname).style("stroke",function(t){var e=y(t[0].cvalue2?p[t[0].cvalue2]:0);return t.forEach(function(t){t.__color__=e}),e}).style("stroke-width",c).attr("stroke-dasharray",function(t){return h[t[0].sname]}).on("mouseover",function(t){d3.select(this).style("stroke-width",2*u)}).on("mouseout",function(t){d3.select(this).style("stroke-width",c)}).transition().duration(500).attrTween("d",function(t){var e=this;e.__lastPosition__||(e.__lastPosition__=[],t.forEach(function(t){e.__lastPosition__.push({x:t.x,y:t.y})}));var n=d3.interpolate(e.__lastPosition__,t);return e.__lastPosition__=n(0),function(e){var a=n(e);return v(a.filter(function(e,n){return n<t.length}))}});var n=e.selectAll("circle."+o.pointClassname).data(t,function(t){return t.x+" "+t.y});n.exit().remove(),n.enter().append("circle").attr("class",o.pointClassname).on("mouseover",function(t){return d3.select(this).attr("r",2*u),m.show.call(this,t)}).on("mouseout",function(t){return d3.select(this).attr("r",u),m.hide.call(this,t)}),n.attr("r",u).attr("cx",function(t){return t.x}).attr("cy",function(t){return t.y}).style("fill",function(t){return t.__color__})})}function l(t){var e={};return t.forEach(function(t,n){var a="";if(n>0){for(var r="",s=0;n>s;s++)a=a+r+h+","+h,r=",";a=a+","+h}else a="0";e[t.display]=f+","+a}),e}var o={classname:t.classname+"-line"};o.axisClassname=o.classname+"-axis",o.xAxisClassname=o.classname+"-x",o.yAxisClassname=o.classname+"-y",o.lineGClassname=o.classname+"-g-line",o.lineClassname=o.classname+"-line",o.pointClassname=o.classname+"-point",o.tipClassnames=t.classname+"-tip "+o.classname+"-tip";var c=2;o.lineWidth=function(t){return arguments.length?(c=t,o):c};var u=3;o.pointRadius=function(t){return arguments.length?(u=t,o):u};var f=20;o.dashFilled=function(t){return arguments.length?(f=t,o):f};var h=3;o.dashUnfilled=function(t){return arguments.length?(h=t,o):h};var d,m=d3.tip().attr("class",o.tipClassnames).offset([-10,0]).html(function(t){var e=t.cauto1?"":t.cname1+": "+t.cvalue1;return t.cname2&&(""!=e&&(e+="<br/>"),e+=t.cname2+": "+t.cvalue2),""!=e&&(e+="<br/>"),e+=t.sname+": "+t.svalue});return o.draw=function(t,r){if(r.series){d=r;var s=r.data,l=r.category,o=r.series,c=e.inner.object,u={width:e.inner.width,height:e.inner.height};c.call(m);var f=n(c,u,l[0],t),h=a(c,u,s,o);i(c,f,h,s,l,o)}},o},t.pie=function(e){function n(t,e,a,r){var s=1,i=[];r.forEach(function(t){i[t]=0}),t.forEach(function(t,e){r.forEach(function(e){var n=parseInt(t[e])||s;i[e]+=Math.abs(n)})}),i.forEach(function(t){0==t&&(t=1)});var m=c+e*u+(e-1)*f,v=m+u*d,g=m+u;t.forEach(function(c,u){c.__level__=e;var f={};r.forEach(function(n){var r=a[n],d=parseFloat(c[n])||s;c[o+n]=[m,0>d?v:g];var p=Math.abs(d)/i[n]*(r[1]-r[0]),y=0==u?r[0]:t[u-1][l+n][1],_=u==t.length-1?r[1]:y+p;t.length>1&&(y+=h/Math.pow(2,e)),c[l+n]=[y,_],f[n]=[c[l+n][0],c[l+n][1]]}),c.children&&n(c.children,e+1,f,r)})}function a(t,e,n,a){var r=t.selectAll("g."+i.valueClassname).data(n,function(t,e){return e});return r.exit().remove(),r.transition().duration(500).attr("transform",function(t){return"translate("+e[t].x+","+e[t].y+")"}),r.enter().append("g").style({width:"100%",height:"100%"}).attr("class",i.valueClassname).attr("transform",function(t){return"translate("+e[t].x+","+e[t].y+")"}),r.each(function(t,e){var n=d3.select(this),r=n.selectAll("g."+i.valueClassname+" > g."+i.colorClassname).data(a,function(t,e){return e});r.exit().remove(),r.enter().append("g").attr("class",i.colorClassname).attr("transform",function(t){return"translate(0,0)"})}),r}function r(e,n,a,l,o){var c,u,f;e.each(function(t,e){e!=a||c||(c=d3.select(this),u=t.alias,f=t.name)});var h=Object.keys(o[a]).length,d=t.helper.colorSeries(h,o.length,a),m=c.selectAll("path").data(n,function(t,e){return t.__ids__||1});m.exit().remove(),m.enter().append("path").attr("class",function(e){return t.helper.escapeName(i.pathClassname+"-"+f+"-"+e[u])}).on("mouseover",function(e){return d3.select(this).style("fill",t.helper.brigherColor(this.__color__)),y.show.call(this,e)}).on("mouseout",function(t){return d3.select(this).style("fill",this.__color__),y.hide.call(this,t)}),m.style("fill",function(t){var e=d(o[a][t[u]]||0);return this.__series__=l,this.__color__=e,e}).transition().duration(500).attrTween("d",function(t){return s(this,t,l)});var v=[];n.forEach(function(t,e){t.children&&t.children.forEach(function(t){v.push(t)})}),v.length>0&&r(e,v,a+1,l,o)}function s(t,e,n){var a=e[l+n],r=e[o+n];t.__current__||(t.__current__={startAngle:1==m?0:a[0],endAngle:1==m?a[1]:a[0],innerRadius:r[0],outerRadius:1==m?r[0]+u:r[1]});var s={startAngle:a[0],endAngle:a[1],innerRadius:r[0],outerRadius:r[1]},i=d3.interpolate(t.__current__,s);t.__current__=i(0);var c=d3.svg.arc();return function(t){var e=i(t);return c(e)}}var i={classname:t.classname+"-pie"};i.valueClassname=i.classname+"-value",i.colorClassname=i.classname+"-color",i.pathClassname=i.classname+"-path",i.tipClassnames=t.classname+"-tip "+i.classname+"-tip";var l="angle_",o="radius_",c=0;i.baseRadius=function(t){return arguments.length?(c=t,i):c};var u=30;i.width=function(t){return arguments.length?(u=t,i):u};var f=10;i.ringGap=function(t){return arguments.length?(f=t,i):f};var h=.01;i.arcGap=function(t){return arguments.length?(t>0&&t<Math.PI&&(h=t),i):f};var d=1;i.negativeRatio=function(t){return arguments.length?(t>0&&2>t&&(d=t),i):d};var m=1;i.animationMode=function(t){return arguments.length?(m=t,i):m};var v=0,g=[];g[v]={},i.level=function(){return v++,g[v]={},i},i.color=function(t){return"function"==typeof t?(g[v].color=t,i):g[v][color](t)};var p,y=d3.tip().attr("class",i.tipClassnames).offset([-10,0]).html(function(t){var e,n=this.__series__,a=p.category.reduce(function(e,n){var a="undefined"==typeof t[n.alias]?"":n.display+": "+t[n.alias];return e?e+"<br/>"+a:a},"");return p.series.forEach(function(t){t.alias==n&&(e=t)}),e?a+"<br/>"+e.display+": "+t[n]:a}),_=bilayout.circle();return i.draw=function(t,s,i){p=s;var l=e.inner.object;l.call(y);var o=[],h=[];s.series.forEach(function(t){o.push(t.alias),h[t.alias]=[0,2*Math.PI]});var d=s.data;n(d,0,h,o);var m=[],v=[];s.category.forEach(function(t){m.push(t.alias),v.push(t.values())});var g=c+v.length*u+(v.length-1)*f;g=0>g?0:g;var x=1.6*g,b="topLeft"==i?-e.outer.left:e.inner.width/2,w="topLeft"==i?-e.outer.top:e.inner.height/2,C=_.radius(x).cx(b).cy(w).drawingObjectRadius(g).calculate(o.length),A={};o.forEach(function(t,e){A[t]=C[e]});var E=a(l,A,o,s.category);E.each(function(t,e){var n=d3.select(this);r(n.selectAll("g > g"),d,0,t,v)})},i},t.table=function(e,n){var a={classname:t.classname+"-table"},r=d3.select(e),s=d3.keys(n[0]);r.append("tr").attr("class",a.classname+"-header").selectAll("th").data(s).enter().append("th").attr("class",function(t,e){return a.classname+"-column "+a.classname+"-column-"+e}).html(function(t){return t});var i=r.selectAll("tr."+a.classname+"-row").data(n).enter().append("tr").attr("class",a.classname+"-row");return i.selectAll("td."+a.classname+"-column").data(function(t){return d3.entries(t)}).enter().append("td").attr("class",function(t,e){return a.classname+"-column "+a.classname+"-column-"+e}).html(function(t){return t.value}),a},"function"==typeof define&&define.amd?(this.bichart=t,define(t)):"object"==typeof module&&module.exports?module.exports=t:this.bichart=t}();

/**
 * Created by wangkun on 2017/3/11.
 * title:强对流监控
 */
define([],function(){
	return {
		Init:function(){
			this.prototype = new PageBase();
    			this.prototype.active();
    			GDYB.Page.curPage=this.prototype;
    			$("#Panel_Tools").remove();
			var t = this;
			t.jkFlag = true;
			t.syFlag = true;
			t.warning = false;
			t.myDateSelecter = new DateSelecter(1,0,"yyyy-mm-dd hh:ii:ss",0);
			$("#menu").css("width","300");
			$("#menu").css("padding","20");
			//<div id="dateTime" style="border-bottom:1px solid white;line-height:30px;padding:10px;"><span class="glyphicon glyphicon-chevron-left" id="hourSub"></span><input  type="text" id="datetimepicker" data-date-format="yyyy-mm-dd hh:ii"><span class="glyphicon glyphicon-chevron-right" id="hourAdd"></span></div>
			$("#menu").html(`
			<div id="datetime" class="datetime">
				<div id="dateTime" style="border-bottom:1px solid white;line-height:30px;padding:10px;color:white"></div>
					</div>
					<div class="space"></div>
					<div id="live">
						<div class="title"><img src="imgs/live.png"><span>实况 &nbsp;<a style="text-decoration:lightcyan;cursor: pointer;color:white;font-size: 13.5px" onclick='window.open("dlwd.html","_blank");'>（历史详情点此<img style="margin-top:-5px;width:20px;height:20px" src="imgs/hisIconw1.png" />）</a></span></div>
						<div class="con" id="rain"><p>降水：</p><span id="24" flag="PRE_12h">12h</span><span id="6" flag="PRE_6h">6h</span><span id="3" flag="PRE_3h">3h</span></div>
						<div class="space5"></div>
						<div class="con" id="wind"><p>大风：</p><span id="17-25" flag="WIN_S_Inst_Max_24h">24h</span><span id="17-25" flag="WIN_S_Inst_Max_12h">12h</span><span id="30" flag="WIN_S_Inst_Max_6h">6h</span></div>
						<div class="con"><span id="bb">冰雹</span><span id="flash">闪电</span><span id="leib">雷暴</span><span id="vis">能见度</span><span id="regimen">水情</span></div>
						<div class="con"><span id="temp">气温</span><span id="maxtemp">最高</span><span id="mintemp">最低</span><span></span><span></span></div>
					</div>
					<div id="radar">
						<div class="title"><img src="imgs/radar.png"><span>雷达</span></div>
						<div class="con"><span id="cr">组合反射率</span><span id="top">回波顶高</span></div>
						<div class="con"><span id="vil">垂直液态水含量</span><span id="fbzz">雷达外推</span></div> 
					</div>
					<div id="satellite">
						<div class="title"><img src="imgs/satellite.png"><span>卫星</span></div>
						<div class="con"><span id="infrared">红外</span><span id="vlight">可见光</span></div>
					</div>
					<div id="monitorsignal">
						<div class="title"><img src="imgs/monitorsignal.png"><span>预警信号</span></div>
						<div class="con"><span id="by">暴雨</span><span  id="tf">台风</span><span  id="gw">高温</span><span  id="hc">寒潮</span><span  id="dw">大雾</span></div>
						<div class="con"><span  id="df">大风</span><span  id="ld">雷电</span><span  id="bb">冰雹</span><span  id="lbdf" style="flex:2">雷暴大风</span></div>
					</div> 
					<div id="warningHistory">
						
					</div> 
					<div id="alarm">
						<div class="half" style="justify-content: flex-end;">
							<span>报警</span>
							<div id="bj" class="switch">
								<div class="open1 parent">
									<div class="open2 child"></div>
								</div>
							</div>
						</div>
						<div class="half">
							<span>声音</span>
							<div id="voice" class="switch">
								<div class="open1 parent">
									<div class="open2 child"></div>
								</div>
							</div>
						</div>
					</div>
			`);
			$("#map_div").append(`
				<div id="MonitorSignalPanel" class="delete panel panel-default" style="display:none;">
					<div class="panel-heading">
						<span>预警信号</span><span class="close">&times;</span>
					</div>
					<div class="panel-body">
						<ul>
							<li>1.济南市发布暴雨蓝色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>2.青岛市发布暴雨蓝色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>3.东营市发布暴雨黄色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>4.德州市发布暴雨蓝色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>5.青岛市发布大风黄色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>6.青岛市发布大风蓝色预警<span class="pull-right">2017/3/11 16:12</span></li>
							<li>7.济南市发布暴雨蓝色预警<span class="pull-right">2017/3/11 16:12</span></li>
						</ul>
					</div>
				</div>
			`);
			$("#map_div").append(`
				<div id="ldinfo" class="delete" style="display:none;">
					<table class="table table-bordered">
						<thead><tr><th>时间</th><th>雷达站</th><th>当前位置</th><th>编号</th><th>中气旋</th><th>TVS</th><th>冰雹</th><th>冰雹尺寸</th><th>冰雹概率</th><th>龙巻</th><th>移速</th><th>移向</th><th>VIL</th><th>VIL垂直密度</th><th>最大反射率</th><th>回波顶高</th><th>底高</th><th>散度</th><th>一小时变压</th></tr></thread>
						<tbody>
							<tr><td>14:36</td><td>济南</td><td>泰安市</td><td>CS</td><td>否</td><td></td><td>是</td><td>2.5</td><td>90</td><td>否</td><td>10</td><td>249</td><td>41</td><td>6.4</td><td>59</td><td>6.4</td><td>3.4</td><td>-4.7</td><td>0.3</td></tr>
							<tr><td>14:36</td><td>青岛</td><td>日照市</td><td>Y4</td><td>否</td><td></td><td>是</td><td>1.3</td><td>70</td><td>否</td><td>8</td><td>224</td><td>30</td><td>4.9</td><td>55</td><td>6.2</td><td>3.3</td><td>3.0</td><td>1.8</td></tr>
							<tr><td>14:36</td><td>德州</td><td>德州市</td><td>QS</td><td>否</td><td></td><td>是</td><td>1.7</td><td>75</td><td>否</td><td>11</td><td>242</td><td>29</td><td>4.5</td><td>57</td><td>6.2</td><td>3.4</td><td>-4.9</td><td>-1.9</td></tr>
						</tbody>
					</table>
					<span class="close">&times;</span>
				</div>
			`);
			$("#map_div").append(`
				<div id="wxinfo" class="delete" style="display:none;">
					<div class="title">卫星特征量<span class="close">&times;</span></div>
					<div class="con">
						<div><span>卫星</span><span class="wxparam">FY-2E</span><span>长轴(km)</span><span class="wxparam">128</span></div>
						<div><span>面积(km2)</span><span class="wxparam">8894</span><span>偏心率</span><span class="wxparam">0.3</span></div>
						<div><span>估测降水</span><span class="wxparam">35</span><span>TBB极值</span><span class="wxparam">-52</span></div>
						<div><span>追踪</span><span class="wxparam"></span><span>TBB变化</span><span class="wxparam">-4</span></div>
					</div>
				</div>
			`);
			require(['Common'],function(com){
				//com.InitDateTime('datetimepicker');
				//t.myDateSelecter = new DateSelecter(1,1,"yyyy-mm-dd hh:ii:ss",0);
				$("#dateTime").append(t.myDateSelecter.div);
				//$($("#dateTime").find("input[type='text']")).css("color","white").click(function(){
				$($("#dateTime").find("input[type='text']")).css("color","white").bind({
					//click :function(){getWarning($(this).val(),"0")},
					change :function(){getWarning($(this).val(),"0")}
				});
				$($("#dateTime").find("img")[0]).before('<span class="glyphicon glyphicon-chevron-left" id="hourSub" style="cursor: pointer"></span>');
				$($("#dateTime").find("img")[1]).after('<span class="glyphicon glyphicon-chevron-right" id="hourAdd" style="cursor: pointer"></span>');
				$($("#dateTime").find("img")).remove();
				$("#hourSub").click(function(){
					t.myDateSelecter.changeHours(-1*60);
					if($("#marker_popup_close").length > 0){
						$("#marker_popup_close").click();
					}
					getWarning($($("#dateTime").find("input[type='text']")).val(),"0");
				});
				$("#hourAdd").click(function(){
					t.myDateSelecter.changeHours(1*60);
					if($("#marker_popup_close").length > 0){
						$("#marker_popup_close").click();
					}
					getWarning($($("#dateTime").find("input[type='text']")).val(),"0");
				});
			});
			InitAlarmArea();//警戒区域
			RegisterEvent();//注册页面事件
			//require(['Controls/MulLegend']);
			/**
			 * @author:wangkun
			 * @date:2017-03-12
			 * @param:
			 * @return:
			 * @description:
			 */
			function InitAlarmArea(){
				require(['DLIndex','Common'],function(index,com){
					var departCode=37;//先这样
					var bound=com.GetBound(departCode);
					com.DrawAlarmLine(bound);
				});
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-13
			 * @param:
			 * @return:
			 * @description:注册页面事件
			 */
			function RegisterEvent(){
				$(".close").bind("click",Close);
				//$(".switch").bind("click",SwitchButton);
				require(['QDLJKPage'],function(self){
					//$("#live span").bind("click",self.QueryLive);
					$("#radar span").bind("click",self.QueryRadar);
					$("#satellite span").bind("click",self.QuerySatellite);
					$("#monitorsignal span").bind("click",self.QueryMonitorSignal);
				});
			}
			function  Close(){
				var parent=$(this).parent();
				if(parent[0].id!=""){
					parent.css("display","none");
				}
				else{
					parent.parent().css("display","none");
				}
			}
			/**
			 * @author:wangkun
			 * @date:2017-03-15
			 * @param:
			 * @return:
			 * @description:开关
			 */
			function SwitchButton(){
				if($(this.children[0]).hasClass("open1")){
					$(this.children[0]).removeClass("open1");
					$(this.children[0]).addClass("close1");
					$(this.children[0].children[0]).removeClass("open2");
					$(this.children[0].children[0]).addClass("close2");
				}
				else{
					$(this.children[0]).removeClass("close1");
					$(this.children[0]).addClass("open1");
					$(this.children[0].children[0]).removeClass("close2");
					$(this.children[0].children[0]).addClass("open2");
				}
			}

			//报警&声音开关样式切换
			$("#alarm #bj,#alarm #voice").click(function(){
				if($(this.children[0]).hasClass("open1")){
					$(this.children[0]).removeClass("open1");
					$(this.children[0]).addClass("close1");
					$(this.children[0].children[0]).removeClass("open2");
					$(this.children[0].children[0]).addClass("close2");
					if($(this).attr("id") == "bj"){
						t.jkFlag = false;
						animatorStop();
						$('#alertAudio')[0].pause();
					}else{
						t.syFlag = false;
						$('#alertAudio')[0].pause();
					}
				}else{
					$(this.children[0]).removeClass("close1");
					$(this.children[0]).addClass("open1");
					$(this.children[0].children[0]).removeClass("close2");
					$(this.children[0].children[0]).addClass("open2");
					if($(this).attr("id") == "bj"){
						t.jkFlag = true;
						QDLJK();
					}else{
						t.syFlag = true;
						if(t.warning){
							$('#alertAudio')[0].play();
						}
					}
				}
			});
			//实况报警要素选择
			$("#live").find("span").click(function(){
				if ($(this).hasClass("active")) {
					$(this).removeClass("active");
					return;
				}else{
					$("#live span.active").removeClass("active");
					var types = "";
					$(this).addClass("active");
					$("#live span.active").each(function(i,e){
						types += $(e).attr("flag");
					});
					var para = {};
					para.areaCode = ($.cookie("departCode") == null || typeof($.cookie("departCode")) == "undefined")?"37":$.cookie("departCode");
					para.curTime = $($("#dateTime").find("input[type='text']")).val();
					para.types = types;
					para = JSON.stringify(para); //对象转换为json
					var url = gridServiceUrl+"services/ForecastfineService/getWRBytimeRange";
					var	params = {"para": para};
					var asyncFlag = true;
					var error ="暂无数据";
					dmt.getDataRecall(function(wdata){
						if(dmt.isArray(wdata) && wdata.length >= 1) {
							if (!$('#layerDiv').length > 0) {
								fnLay.createLayDom('');
							}
							fnSurvey.showGrid(wdata, "SKDetail", "强对流报警详情");
						}else{
							layer.closeAll();
							alertFuc("暂无此类超警信息！");
						}
					},url,params,asyncFlag,error);
					/*var element = $(this).attr("id").split("|")[1];
					layer.closeAll();
					animatorStop();
					fnCimiss.getWarningData(element,t.MyTime.getCurrentTime(false),['011','012','013','014'],null);*/
				}
			});
			//实时降水-大风监控
			QDLJK();
			function QDLJK(){
				t.myDateSelecter.setCurrentTime(t.myDateSelecter.getNowTime(false,0));
				getWarning();
				setTimeout(function(){
					if(t.jkFlag){
						QDLJK()
					}
				},10*60*1000);
			};
			function displayWarning(wdata){
				if(!dmt.isArray(wdata) || wdata.length < 1){
					layer.closeAll();
					$('#alertAudio')[0].pause();
					animatorStop();
					return;
				}
				animatorStop();
				dmt.warningFlashInit();
				var me = GDYB.Page.curPage;
				var markersLayer = me.map.getLayersByName("markersLayer")[0];
				var animatorLayer = me.map.getLayersByName("animatorLayer")[0];

				//报警点样式
				var style = {
					/*stroke: false,*/
					 pointRadius: 8
				};
				//重构报警对象
				function  restore(wdata){
					function clone(obj){
						var result ={};
						for(var key in obj){
							result[key]=obj[key];
						}
						return result;
					}
					function createObj(flagType,curObj){
						var eleType,colorType,eleName,sufix,colorStr = "";
						eleType = flagType.split("_")[0];
						colorType = flagType.split("_")[1];
						switch(eleType){
							case "rain":{
								eleName = "短时强降水";
								sufix = "(mm)";
							}
								break;
							case "win":{
								eleName = "大风";
								sufix = "(m/s)";
							}
								break;
						}
						switch(colorType){
							case "blue":{
								colorStr = "蓝色";
							}
								break;
							case "yellow":{
								colorStr = "黄色";
							}
								break;
							case "orange":{
								colorStr = "橙色";
							}
								break;
							case "red":{
								colorStr = "红色";;
							}
								break;
						}
						var tempObj = clone(curObj);
						tempObj.img = flagType;
						tempObj.color = colorType;
						tempObj.colorStr = colorStr;
						tempObj.type = eleName+" <font style='color:"+tempObj.color+"'>" + tempObj.colorStr + "</font> 警报";
						tempObj.value = curObj.wValue+sufix;
						return tempObj;
					}
					var newWarings = [];
					for(var index in wdata){
						var dataType = wdata[index].wType;
						var flagType = dataType;
						if(dataType.split("_")-1 > 1){
							flagType = dataType.substring(0,dataType.lastIndexOf("_"));
						}
						newWarings.push(createObj(flagType,wdata[index]));
					}
					return newWarings;
				}
				//报警闪烁点
				var pointFeatures = [];
				var warnings = restore(wdata);
				//var ststisData = StrongWeatherStatis(warnings);
				if(warnings.length > 0){
					//fnSurvey.showStatic(ststisData,warnings,"QDLSK_Statis","QDLSK_Warning","强对流报警统计");
					/*
					if(!$('#layerDiv').length > 0){
						fnLay.createLayDom('');
					}
					fnSurvey.showGrid(warnings,"QDLSK_Warning","强对流报警概况");
					//showPanel(wData,wData[0].Datetime,wData[wData.length-1].Datetime);
					*/
					//displayTab("warningHistory",warnings);
					//渲染报警点和报警标志
					warnings.forEach(function(attr, index) {
						var size = new WeatherMap.Size(20, 20);
						var offset = null;
						var pr = 6;
						//报警标志
						var ICON_URL = '/SDWIS/imgs/monitor/';
						var icon = "";
						if(attr.isDeal != "已处理"){
							if(t.syFlag){
								$('#alertAudio')[0].play();
							};
							t.warning = true;
							icon = ICON_URL + attr.img + '.png';
						}else{
							icon = ICON_URL + attr.img + '_d.png';
						}
						if(attr.wName.indexOf("市级") >-1){
							size = new WeatherMap.Size(32, 32);
							offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
							animatorLayer.renderer.pointStyle.pointRadius = 12;
						}
						if(attr.wName.indexOf("省级") >-1){
							size = new WeatherMap.Size(52, 52);
							offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
							animatorLayer.renderer.pointStyle.pointRadius = 23;
						}
						var marker = new WeatherMap.Marker(
							new WeatherMap.LonLat(attr.Lon, attr.Lat),
							new WeatherMap.Icon(icon, size, offset)
						);
						marker.attributes = attr;
						marker.events.on({
							click: function() {
								//popup(this.attributes, 'click');
								popup(marker, 'click');
							},
							scope: marker
						});
						markersLayer.addMarker(marker);
						if(attr.isDeal != "已处理"){
							//报警点
							var point = new WeatherMap.Geometry.Point(attr.Lon, attr.Lat);
							var pointStyle = {
								fillColor: attr.color,
							}
							var pointFeature = new WeatherMap.Feature.Vector(point, {
								TIME: 1,
								FEATUREID: index,
								DATA:attr
							}, pointStyle);
							pointFeatures.push(pointFeature);
						}
					});
					animatorLayer.addFeatures(pointFeatures);
					// 延迟开始动画,等待地图准备
					setTimeout(function() {
						animatorLayer.animator.start();
					}, 900);
				}else{
					layer.closeAll();
					$('#alertAudio')[0].pause();
					animatorStop();
				}
			}
			function animatorStop(){
				var curmap = GDYB.Page.curPage.map;
				var animatorLayer = curmap.getLayersByName("animatorLayer")[0];
				if (!animatorLayer) return;
				var animator = animatorLayer.animator;
				if (!animator) return;
				animator.stop();
				//$("#Panel_YSTJ").css("display","none");
				curmap.removeLayer(curmap.getLayersByName("markersLayer")[0]);
				curmap.removeLayer(animatorLayer);
			}
			function getWarning(timeStr,dtype){
				//我对你的爱如涛涛江水连绵不绝，又如黄河泛滥，一发而不可收，怎会放弃深情，空生套路？
				var para = {};
				if(typeof(timeStr) != "undefined" && timeStr != ""){
					var selectDate = new Date(timeStr);
					var date = new Date();
					if(selectDate > date){
						layer.alert('请选择有效时间！', {
							icon: 2
							, time: 3000 //2秒关闭（如果不配置，默认是3秒）
						});
						return;
					}
					para.timeStr = timeStr;
				}
				if(typeof(dtype) != "undefined" && dtype != ""){
					para.dtype = dtype;
				}
				para.areaCode = ($.cookie("departCode") == null || typeof($.cookie("departCode")) == "undefined")?"37":$.cookie("departCode");
				para = JSON.stringify(para); //对象转换为json
				var url = gridServiceUrl+"services/ForecastfineService/getWaringByADCode";
				var	params = {"para": para};
				var asyncFlag = true;
				var error ="暂无数据";
				dmt.getDataRecall(function(wdata){
					displayWarning(wdata);
				},url,params,asyncFlag,error);
			}
			function displayTab(tid,tdata){
				var tabTitle = "<table>"
					+"<tr><th colspan='6'>报警点概况</th></tr>"
					+"<tr><th>报警点名称</th><th>所在市</th><th>报警类型</th><th>报警时间</th><th>处理状态</th><th>决策人</th></tr>";
				var tabStr = "";
				for(var i=0;i<tdata.length;i++){
					tabStr += "<tr><td>"+tdata[i].Station_Name+"</td><td>"+tdata[i].City+"</td><td>"+tdata[i].wName+"</td><td>"+tdata[i].addtime+"</td><td>"+tdata[i].isDeal+"</td><td>"+tdata[i].decisioner+"</td></tr>";
				}
				var realTab = tabTitle + tabStr + "</table>";
				$($("#"+tid).html(realTab)).css({"display":"block"});
			}
			function cancleProduce(){
				if($("#yjzdOperateDiv").length > 0){
					$("#yjzdOperateDiv").remove();
				}
			}
			//点击报警标志点击事件
			function popup(obj) {
				function formatTime(timeStr){
					var timeTem = "";
					if(!(typeof(timeStr)== 'undefined' || timeStr == "" ||  timeStr == "undefined" || timeStr == null)){
						timeTem = dmt.getMyTime(timeStr,true,0,"");
					}else{
						timeTem = dmt.getMyTime(dmt.getMyCurTime(false,0,""),true,0,"");
					}
					return timeTem.split("日")[1];
				}
				var me = GDYB.Page.curPage;
				var markersLayer = me.map.getLayersByName("markersLayer")[0];
				var animatorLayer = me.map.getLayersByName("animatorLayer")[0];
				var attr = obj.attributes;
				var html = ''
					+'<div class="" style="background-color: rgba(255,255,255,0.5);height:100%;width:100%;padding:3px;">'
					//+'<div class="title" style="text-align:center;margin:5px 0px 0px 0px">'+ attr.Station_Name + ' ' + attr.type + '</div>'
					+'<div class="title" style="font-size:20px;text-align:center;margin:3px 0px 0px 0px">'+ attr.Station_Name + ' ' + attr.wName + '</div>'
					+'<div style="text-align:center;margin-top:5px;"> 时间:'+formatTime(attr.addtime)+'&nbsp;&nbsp;<img width="20" height="20" style="margin-top:-3px" src="imgs/monitor/'+attr.img+(attr.isDeal != "未处理"?"_d":"") + '.png"> &nbsp;'+ attr.value + '</div>'
					+'<div id="wdeal" style="text-align:center;margin:8px 0px 0px 5px">'
					//+'<button class="wb" style="margin:1px 2px 0px 3px" id="yjzz">预警信号制作</button>'
					//+'<button class="wb" style="margin:1px 2px 0px 2px" id="qtqzz">强天气预警制作</button>'
					//+'<button class="wb" style="margin:1px 2px 0px 2px" '+(attr.isDeal != "未处理"?"disabled='true'":"")+' id="toDeal">标记已处理</button>'
					+'<button class="wb" style="margin:1px 2px 0px 3px;'+(attr.isDeal != "未处理"?"display:none":"")+'" id="yjzz">预警信号制作</button>'
					+'<button class="wb" style="margin:1px 2px 0px 3px;'+(attr.isDeal != "未处理"?"display:none":"")+'" id="yjzd">预警指导制作</button>'
					+'<button class="wb" style="margin:1px 2px 0px 2px;'+(attr.isDeal != "未处理"?"display:none":"")+'" id="wHisory">历史报警详询</button>'
					+'<button class="wb" style="margin:1px 2px 0px 2px;'+(attr.isDeal != "未处理"?"display:none":"")+'" id="toDeal">标记已处理</button>'
					+(attr.isDeal != "未处理"?"<span style='font-size:15px;color:green'>已处理 ✔ </span>":"")
					+'</div>'
					+'</div>';
				var mypopup = new WeatherMap.Popup.FramedCloud(
					'marker_popup',
					new WeatherMap.LonLat(attr.Lon, attr.Lat),
					null,
					html,
					null,
					true
				);
				mypopup.setOpacity(0.0);
				me.map.removeAllPopup();
				me.map.addPopup(mypopup);
				$("#wdeal").find("button").click(function(){
					var btype = $(this).attr("id");
					if(btype == "toDeal"){
						if($(this).attr("disabled") == "disabled"){
							return;
						}
						warningDeal(obj,mypopup);
					}
					if(btype == "wHisory"){
						//window.open("dlwd.html?dTime="+$($("#dateTime").find("input[type='text']")).val()+"","_blank");
						window.open("dlwd.html?dTime="+$($("#dateTime").find("input[type='text']")).val().split(" ")[0]+"","_blank");
					}
					if(btype == "yjzz"){
						t.Produce = new AlertSignalProduce({
							user:{
								userName: $.cookie("showName"),
								province: '山东',
								areaCode: $.cookie("departCode"),
								areaName: $.cookie("departName"),
								stationId: 54823,
								stationName: '济南',
								lat: 36.6,
								lon: 117
							}
						});
						window.open("product.html","_blank");
						//t.Produce.prepare().done(function(){ t.Produce.open() });

					}
					if(btype == "yjzd"){
						if($("#yjzdOperateDiv").length < 1){
							console.log(attr);
							var typeStr = "降水量达到";
							if(attr.wType.indexOf("win_") > -1){
								typeStr = "阵风风速达到 ";
							}
							var textStr = "前一时次，"+attr.City+ "市 ["+attr.Station_Name + "](站)出现 "+attr.type +",其中最大"
								 		+ typeStr + attr.value;
							textStr = dmt.stripHTML(textStr);
							$("#map_div").append(`
							<div id="yjzdOperateDiv" class="delete" onmousedown="dragPanel(this,event)">
								<div class="upContentDiv">
									<div class="title" style="background-color:#2591F1">
										<span class="pull-left">`+attr.wName.substring(0,4)+` 预警指导制作</span>
										<span id="zdcbutton" class="pull-right" style="cursor: pointer" title="关闭" >❌</span>
									</div>
									<div class="changeDiv" style="margin: 4px 8px">
										<p style="display:none"><span>预警指导名称：</span><span id="selectName" style="color: #FF0000">`+attr.Station_Name+attr.wName.substring(2,attr.wName.length)+`</span></p>
										<p><span> 预报员：</span><span id="selectYuBaoYuan" style="color: #FF0000">`+$.cookie("departName")+`</span></p>
										<p><span>时&nbsp;&nbsp;&nbsp; 间：</span><span id="selectDate" style="color: #FF0000">`+attr.addtime+`</span></p>
										<p><span>类&nbsp;&nbsp;&nbsp; 型：</span>
											<font id="selectType">`+attr.wName.substring(2,4)+`</font>
										</p>
										<p><span>级&nbsp;&nbsp;&nbsp; 别：</span>
											<font style="color:`+attr.color+`" id="selectLevel">`+attr.colorStr+`</font>
										</p>
										<div id="stationMsg" style="overflow: hidden">
											<!--<div>
												<p>前1时次大雾天湖水库，红安白须公礁，麻城双墩岛和白牛岭，北海斜阳岛等站出现大于17ms/s极大风。</p>
												<p>大雾，红安有强对流回波，向东南方向移动。</p>
												<p>预计未来6小时，大雾、红安、麻城等地，有短时间强雷雨大风天气，局地有冰雹，阵风8-10级。</p>
											</div>-->
											<textarea id="selectDetail" style="width:100%;height:100%;font-size: 12px">
												`+textStr+`
											</textarea>
										</div>
										<div id="operateBtn" style="text-align:center;"><!--<a>调入临近预报</a><a>绘制预警区落</a>--><a id="makeproduct">生成预警指导</a></div>
									</div>
								</div>
								<hr style="border: 1px 0 #999999 solid; width: 90%; margin: 10px auto">
								<div id="downContentDiv">
									<div style="margin: 3px auto">
										<span>历史预警指导：</span><a id="traceManage">留痕管理…</a>
									</div>
									<div id="yjzdMessageHis">
										<ul>
											<li id="pro_1">暴雨蓝色预警指导1<span>2017-03-02&nbsp;&nbsp;07:51:00</span><div class="chatTips"></div></li>
											<li id="pro_2">暴雨蓝色预警指导2<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
											<!--
											<li id="pro_3">暴雨蓝色预警指导3<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
											<li id="pro_4">暴雨蓝色预警指导4<span>2017-03-02&nbsp;&nbsp;07:51:00</span><div class="chatTips"></div></li>
											<li id="pro_5">暴雨蓝色预警指导5<span>2017-03-02&nbsp;&nbsp;07:51:00</span></li>
											-->
										</ul>
									</div>
									<hr style="border: 1px 0 #999999 solid; width: 100%; margin: 10px auto">
									<div id="yjzdMessageTip">山东省气象台</div>
								</div>
							</div>
							`);
							$("#zdcbutton").click(function(){
								cancleProduce();
							});
							$("#makeproduct").click(function(){
								layer.confirm('确定生成？', {
									title:"询问",//标题
									btn: ['确定','返回'] //按钮
								}, function(){
									var para = {};
									para.name = TrimAll($("#yjzdOperateDiv #selectName").html(),"g");
									para.yby = TrimAll($("#yjzdOperateDiv #selectYuBaoYuan").html(),"g");
									//时间格式不去所有空格
									//para.date = $("#yjzdOperateDiv #selectDate").html();
									//para.type = TrimAll($("#yjzdOperateDiv #selectType").html(),"g");
									//para.level = TrimAll($("#yjzdOperateDiv #selectLevel").html(),"g");
									para.detail = TrimAll($("#yjzdOperateDiv #selectDetail").val(),"g");
									para.addtime = dmt.getMyCurTime(false,0,"");
									debugger;
									para = JSON.stringify(para); //对象转换为json
									var url = gridServiceUrl+"services/ForecastfineService/createYjzd";
									var	params = {"para": para};
									var asyncFlag = true;
									var error ="暂无数据";
									dmt.getDataRecall(function(result){
										if(result){
											layer.msg('生成成功！', {icon: 1,time:1314});
											setTimeout(function(){
												layer.closeAll();
												$("#yjzd").text("已制作");
												$("#yjzd").attr("disabled","disabled");
												$("#zdcbutton").click();
											},1500);
										}else{
											layer.msg('生成失败！', {icon: 2,time:1314});
										}
									},url,params,asyncFlag,error);
								}, function(){

								});
							});
						}
					}
				});
			}
			function warningDeal(warningObj,popuObj){
				var me = GDYB.Page.curPage;
				var markersLayer = me.map.getLayersByName("markersLayer")[0];
				var animatorLayer = me.map.getLayersByName("animatorLayer")[0];
				var size = new WeatherMap.Size(32, 32);
				var offset = new WeatherMap.Pixel(-size.w / 2, -size.h / 2);
				var attr = warningObj.attributes;
				var para = attr;
				para.dealTime = dmt.getMyCurTime(false,0,"");
				para.decisioner = (typeof($.cookie("departName")) == "undefined" || $.cookie("departName") == null)?"":$.cookie("departName");
				para = JSON.stringify(para); //对象转换为json
				var url = gridServiceUrl+"services/ForecastfineService/WarningDeal";
				var	params = {"para": para};
				var asyncFlag = true;
				var error ="暂无数据";
				//内存指向机制
				attr.isDeal = "已处理";
				var newUrl = warningObj.icon.url.split(".")[0]+"_d."+warningObj.icon.url.split(".")[1];
				var newMarker = new WeatherMap.Marker(
					new WeatherMap.LonLat(attr.Lon, attr.Lat),
					new WeatherMap.Icon(newUrl, warningObj.icon.size, warningObj.icon.offset)
				);
				newMarker.attributes = attr;
				newMarker.events.on({
					click: function() {
						popup(newMarker, 'click');
					},
					scope: newMarker
				});
				markersLayer.addMarker(newMarker);
				markersLayer.removeMarker(warningObj);
				markersLayer.redraw();
				dmt.getDataRecall(function(result){
					if(result){
						me.map.removePopup(popuObj);
						//markersLayer.removeMarker(obj);
						animatorLayer.removeFeatures(animatorLayer.getFeaturesByAttribute("DATA",attr));
						if(animatorLayer.features < 1){
							$('#alertAudio')[0].pause();
							t.warning = false;
						}
					}
				},url,params,asyncFlag,error);
			}
			function TrimAll(str,is_global){
				var result;
				result = str.replace(/(^\s+)|(\s+$)/g,"");
				if(is_global.toLowerCase()=="g"){
					result = result.replace(/\s/g,"");
				}
				return result;
			}
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-13
		 * @param:
		 * @return:
		 * @description:查询实况
		 */
		QueryLive:function(){
			var id=this.id;
			if(id==undefined||id=="")
				return;
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				return;
			}else{
				$(this).addClass("active");
			}
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-13
		 * @param:
		 * @return:
		 * @description:查询雷达
		 */
		QueryRadar:function(){
			var id=this.id;
			if(id==undefined||id=="")
				return;
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				return;
			}
			else{
				$(this).addClass("active");
			}
			$("#ldinfo").css("display","block");
		},
		/**
		 * @author:wangkun
		 * @date:2017-03-13
		 * @param:
		 * @return:
		 * @description:查询卫星
		 */
		QuerySatellite:function(){
			var id=this.id;
			if(id==undefined||id=="")
				return;
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				return;
			}
			else{
				$(this).addClass("active");
			}
			$("#wxinfo").css("display","block");
		},
		QueryMonitorSignal:function(){
			var id=this.id;
			if(id==undefined||id=="")
				return;
			if($(this).hasClass("active")){
				$(this).removeClass("active");
				return;
			}
			else{
				$(this).addClass("active");
			}
			$("#MonitorSignalPanel").css("display","block");
		}
	}
});
